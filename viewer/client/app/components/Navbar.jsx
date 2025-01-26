import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import logo from 'assets/images/logo.png';
import '../styles/navbar.scss';

export default class RNavbar extends React.Component {
  constructor(props) {
    super(props);
    // this.toggleNavbar = this.toggleNavbar.bind(this);
    // this.state = {
    //   collapsed: true
    // };
  }

  // toggleNavbar() {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // }

  render() {
    return (
      <Navbar dark expand="md">
        <NavbarBrand href="/">
          <div style={{ fontWeight: 'bold' }}>
            <img src={logo} height="36" />
            <span style={{ marginLeft: 10 }}>{this.props.title}</span>
          </div>
        </NavbarBrand>
        {/* <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              { utils.isMobile() ? <NavLink href="/transactions">Transactions</NavLink> : null }
            </NavItem>
          </Nav>
        </Collapse> */}
      </Navbar>
    );
  }
}
