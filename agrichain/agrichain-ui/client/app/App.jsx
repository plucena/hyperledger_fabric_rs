import React from 'react';
import { Card, Alert, CardHeader, CardBody } from 'reactstrap';
import { CSSTransitionGroup } from "react-transition-group";
import RNavbar from './components/Navbar.jsx';
import RForm from './components/Form.jsx';
import BlockInfo from './components/BlockInfo.jsx';
import TransactionsInfo from './components/TransactionsInfo.jsx';

import './styles/app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);

    this.state = {
      data: {},
      err: {}
    };
  }

  onData(data) {
    console.log(data);
    this.setState({
      data: data,
      err: {}
    });
  }

  onError(err) {
    console.error(err);
    this.setState({
      data: {},
      err: err.response.data.error
    });
  }

  displayInfo() {
    if (this.state.err.message) {
      return <Alert color='danger'>{this.state.err.message}</Alert>;
    } else {
      if (Object.keys(this.state.data).length !== 0) {
        return (
          <Card border='dark' className='mb-3 shadow-sm'>
            <CardHeader>Agrichain Asset</CardHeader>
            <CardBody>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={700}
                transitionLeave={false}>
                <BlockInfo key={new Date().getTime().toString()} data={this.state.data}></BlockInfo>
              </CSSTransitionGroup>
            </CardBody>
          </Card>
        );
      }
      return (
        <Card border='dark' className='mb-3 shadow-sm'>
          <CardHeader>Agrichain Asset</CardHeader>
          <CardBody>
          </CardBody>
        </Card>
      );
    }
  }

  render() {
    return (
      <div>
        <RNavbar title="AGRICHAIN"></RNavbar>
        <div className="container">
          <header className="row justify-content-md-center">
            <RForm onData={this.onData} onError={this.onError}></RForm>
          </header>

          <div className="row justify-content-md-center">
            <div className="col col-md-8">
              {this.displayInfo()}
            </div>
            <div className="col-md-4">
              <TransactionsInfo></TransactionsInfo>
            </div>
          </div>
        </div>
      </div>
    );
  }
}