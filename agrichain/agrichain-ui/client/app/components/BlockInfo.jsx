import React from 'react';
import JsonTree from './JsonTree.jsx';

import '../styles/blockinfo.css';

export default class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="block-info">
        <JsonTree data={this.props.data} title="Block" rules={[
          (name, value) => typeof value === 'string' ?
            <div className="JsonTree-Node-Item">
              <div className="JsonTree-Node-Key">{name} : </div>
              <div className="JsonTree-Node-Value">
                <span className="JsonTree-Node-Value-String">{"\"" + value + "\""}</span>
              </div>
            </div> : null
        ]} />
      </div>
    );
  }
}