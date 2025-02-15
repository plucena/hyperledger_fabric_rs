import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Loading from 'react-loading-components';
import axios from 'axios';
import { URL } from '../config';

export default class RForm extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      isLoading: false,
      data: {
        model: 'analysis',
        id: ''
      }
    };
  }

  search(event) {
    event.preventDefault();
    // if (this.state.data.id === '') {
    //   this.props.onError({
    //     message: 'Error: input is empty'
    //   });
    //   return;
    // }

    this.setState({ isLoading: true });
    
    axios.get(`${URL}/${this.state.data.model}/${this.state.data.id}`)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props.onData(res.data);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        this.props.onError(err);
      });
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  render() {
    const styles = {
      marginTop: 20,
      marginBottom: 10,
      padding: 10
    };

    const data = this.state.data;

    return (
      <Form onSubmit={this.search} style={styles} inline>
        <FormGroup className="mr-sm-4">
        <Input type="select" name="model" id="data-model"
                  value={data.model} onChange={this.onChange} >
            <option value="analysis">analysis</option>
            <option value="company">company</option>
            <option value="field">field</option>
            <option value="product">product</option>
            <option value="season">season</option>
            <option value="venue">venue</option>
            <option value=""></option>

          </Input>
        </FormGroup>
        <FormGroup className="mr-sm-2">
          <Label className="mr-sm-2" for="data-id">ID</Label>
          <Input type="text" name="id" id="data-id"
                  value={data.id} onChange={this.onChange} />
        </FormGroup>
          {
            !this.state.isLoading ?
              <Button color="primary" type="submit">Search</Button> :
              <Loading type='tail_spin' fill='#000' width={38} height={38} />
          }
      </Form>
    );
  }
}