import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/jsontree.scss';

function camelCase(str) {
  const s = str[0].toUpperCase();
  return s.concat(str.slice(1));
}
/*
 *  default rules for rendering basic types
 */
var rules = [
  /* null */
  (name, value) => value === null ? <EditorNull name={name} /> : null,

  /* function */
  (name, value) => typeof value === "function" ? <EditorFunc name={name} value={value} /> : null,
  
  /* iso date-time */
  (name, value) => typeof value === "string" &&
    !isNaN(Date.parse(value)) && value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/gi) ? <EditorDate name={name} value={value} /> : null,  //

  /* number */
  (name, value) => (typeof value === "number" || (typeof value === 'string' && value.match(/%$/gi))) ? <EditorNumeric name={name} value={value} /> : null,

  /* boolean */
  (name, value) => typeof value === "boolean" ? <EditorBoolean name={name} value={value} /> : null,

  /* url video */
  (name, value) => typeof value === "string" && 
    (value.indexOf("www.youtube") > 0 || value.match(/^(video-type)/gi) !== null) ? <EditorVideo name={name} value={value} /> : null,
  /* images */
  (name, value) => typeof value === "string" && 
    (value.match(/^(image-type)/gi) !== null || value.match(/\.(png|jpg|jpeg)$/gi) !== null) ? <EditorImage name={name} value={value} /> : null,

  /* url */
  (name, value) => typeof value === "string" && (value.indexOf("http://") === 0 ||
    value.indexOf("https://") === 0 ||
    value.indexOf("www.") === 0) ? <EditorLink name={name} value={value} /> : null,

  /* string */
  (name, value) => typeof value === "string" ? <EditorString name={name} value={value} /> : null,

  /* iterator */
  (name, value) => typeof value === "object" && !Array.isArray(value) && typeof value[Symbol.iterator] === 'function' ?
    <EditorArray value={Array.from(value)} name={name + "[iterable]"} /> : null,

  /* array */
  (name, value) => typeof value === "object" && Array.isArray(value) ? <EditorArray value={value} name={name} /> : null,

  /* object */
  (name, value) => typeof value === "object" ? <EditorObject value={value} name={name} /> : null
];


/*
*   main tree
*/
class JsonTree extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // merge rules with customs
    rules = Array.prototype.concat(this.props.rules || [], rules);

    // check the parameter, if its json string or js object
    if (typeof this.props.data === "string") {
      try {
        let obj = JSON.parse(this.props.data);
        this._dataObject = obj;
      }
      catch (err) {
        throw "iso-json-tree data parse error. json string cannot be converted to object. " + err;
        this._dataObject = {};
      }
    }
    else if (typeof this.props.data === "object") {
      this._dataObject = this.props.data;
    }
    else {
      throw "iso-json-tree data is not in the expected format. provided data = " + JSON.stringify(this.props.data);
    }
  }

  render() {
    let output = [];
    for (const key in this._dataObject) {
      
      if (this._dataObject.hasOwnProperty(key) && key !== 'transactionId') {
        output.push(<KeyValue key={key} name={key} value={this._dataObject[key]} />);
      }
    }
    return (
      <div className="JsonTree-Tree">
        {this.props.title && <p className="title">{this.props.title}</p>}
        {this.props.summary && <p className="summary">{this.props.summary}</p>}
        {output}
      </div>)
  }
}

JsonTree.propTypes = {
  title: PropTypes.string,

  rules: PropTypes.arrayOf(PropTypes.func),

  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}

JsonTree.displayName = 'JsonTree';


/*
*   key-value pairs
*/
class KeyValue extends Component {
  render() {
    var ret;

    for (var i = 0; i < rules.length; i++) {
      let processed = rules[i](this.props.name, this.props.value);
      if (processed) {
        ret = processed;
        break;
      }
    }

    return ret;
  }
}

KeyValue.displayName = "KeyValue";


/*
 *  Collapsable panel component
 */
class Collapsable extends Component {

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  toggle(e) {
    e.preventDefault();

    this.setState({ open: !this.state.open });
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div className="JsonTree-Node-Item">
        <div className="JsonTree-Node-Key">
          <a href="#" onClick={this.toggle.bind(this)} className={"Collapsable-Arrow" + (this.state.open ? " Open" : "")}>▼</a>
          <a href="#" onClick={this.toggle.bind(this)}>{this.props.title}</a>
        </div>
        <div className={"Collapsable-Content JsonTree-Node-Value child-element" + (this.state.open ? "" : " Hidden")}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

class EditorString extends Component {
  getLabel() {
    return <span className="JsonTree-Node-Value-String">{this.props.value}</span>
  }

  render() {
    return <div className="JsonTree-Node-Item">
      <div className="JsonTree-Node-Key">{this.props.name} : </div>
      <div className="JsonTree-Node-Value">{this.getLabel()}</div>
    </div>;
  }
}
EditorString.displayName = "EditorString";

class EditorNull extends Component {
  render() {
    return <div className="JsonTree-Node-Item">
      <div className="JsonTree-Node-Key">{this.props.name}</div>
    </div>;
  }
}
EditorString.displayName = "EditorNull";

class EditorLink extends EditorString {
  getLabel() {
    return <span className="JsonTree-Node-Value-String">
        <a href={this.props.value} target="_blank">{this.props.value}</a>
		   </span>
  }
}
EditorLink.displayName = "EditorLink";

class EditorVideo extends Component {
  isYoutube(url) {
    return url.indexOf("www.youtube") > 0;
  }
  render() {
    let url = this.props.value || '';
    if (this.isYoutube(url)) {
      url = url.replace('watch?v=', 'embed/');
      return <div className="JsonTree-Node-Value-Video">
        <iframe src={url} frameBorder="0" height={300} width={400}></iframe>
      </div>;
    } else {
      url = url.replace(/^(video-type>)/gi, '');
      return (
        <div className="JsonTree-Node-Item">
          <video controls autoPlay="">
            <source src={url} />
          </video>
        </div>
      );
    }
  }
}
EditorVideo.displayName = "EditorVideo";

class EditorImage extends Component {
  render() {
    let url = this.props.value || '';
    url = url.replace(/^(image-type>)/gi, '');
    return <div className="JsonTree-Node-Value-Image">
      <iframe className="frame" src={url} allowFullScreen></iframe>
    </div>;
  }
}
EditorImage.displayName = "EditorImage";

class EditorNumeric extends EditorString {
  getLabel() {
    return <span className="JsonTree-Node-Value-Number">{this.props.value}</span>
  }
}
EditorNumeric.displayName = "EditorNumeric";


class EditorBoolean extends EditorString {
  getLabel() {
    return <span className="JsonTree-Node-Value-Number">{JSON.stringify(this.props.value)}</span>
  }
}
EditorString.displayName = "EditorBoolean";

class EditorDate extends EditorString {
  formatDate(strDate) {
    const today = new Date(strDate);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
  }

  getLabel() {
    return <span className="JsonTree-Node-Value-Number">{this.formatDate(this.props.value)}</span>
  }
}
EditorDate.displayName = "EditorDate";

class EditorArray extends EditorString {
  render() {
    return <Collapsable title={this.props.name}>
      {this.props.value.map((item, index) =>
        <KeyValue name={index+1} value={item} key={item + "_" + index} />
      )}
    </Collapsable>
  }
}
EditorArray.displayName = "EditorArray";

class EditorObject extends EditorString {
  render() {
    return <Collapsable title={this.props.name}>
      {Object.keys(this.props.value).map((item, index) =>
        <KeyValue name={item} value={this.props.value[item]} key={item + "_" + index} />
      )}
    </Collapsable>
  }
}
EditorObject.displayName = "EditorObject";

class EditorFunc extends EditorString {

  getParamNames() {
    /*
      http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
    */
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;

    var fnStr = this.props.value.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) result = [];
    return result;
  }

  render() {
    let sourceCode = this.props.value.toString().split('\n');

    return <Collapsable title={this.props.value.name + "(" + this.getParamNames() + ")"}>
      <div className="JsonTree-Node-Item JsonTree-Node-Value-Func">
        {sourceCode.map((line, index) => {
          return <div className="JsonTree-Node-Value-Func-Line" key={"line_" + index}>
            {line}
          </div>
        })}

      </div>
    </Collapsable>
  }
}
EditorFunc.displayName = "EditorFunc";


export default JsonTree;