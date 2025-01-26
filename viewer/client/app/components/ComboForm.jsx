import React from 'react';
import { Form, Label, FormGroup, CustomInput } from 'reactstrap';
import Projects, { getNameById } from '../services/Projects';
import '../styles/comboform.scss';

export default class ComboForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      isLoading: false,
      project: {
        id: '',
        name: ''
      }
    };
  }

  componentWillReceiveProps() {
    this.setState({ project: this.props.project });
  }

  onChange(event) {
    const project = this.state.project;
    project.id = event.target.value;
    project.name = getNameById(project.id);
    this.setState({ project });
    this.props.onSelect(this.state.project);
  }

  render() {
    return (
      <Form inline>
        <FormGroup row>
          <Label for="project-name" sm={3}>Project Name</Label>
          <CustomInput id="project-name" type="select" onChange={this.onChange} value={this.state.project.id}>
            <option value="0">Select...</option>
            {Projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </CustomInput>
        </FormGroup>
      </Form>
    );
  }
}