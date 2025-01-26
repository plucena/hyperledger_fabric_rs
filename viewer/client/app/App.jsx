import React from 'react';
import Navbar from './components/Navbar.jsx';
import Router from './Router.jsx';
import './styles/app.scss';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar title="Seeds Explorer"></Navbar>
        
        <Router></Router>
      </div>
    );
  }
}