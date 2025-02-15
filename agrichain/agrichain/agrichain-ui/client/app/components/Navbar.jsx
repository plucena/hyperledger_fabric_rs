import React from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

import logo from 'assets/images/ibmlogo.png';

export default class RNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md" style={{ height: 56 }}>
        <NavbarBrand href="/">
          <div style={{ fontWeight: 'bold' }}>
            <img src={logo} height="20" />
            <span style={{ verticalAlign: 'middle', marginLeft: 10 }}>{this.props.title}</span>
          </div>
        </NavbarBrand>
      </Navbar>
    );
  }
}
