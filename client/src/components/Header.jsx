import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

//images
import logo from "../images/logo.png";
//css
import "./css/Header.css";

//react bootstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

class Header extends React.Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <header>
        <Navbar color="light" light expand="md">
          <NavbarBrand to="/">Kalakari</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="nav-item">
                <NavLink className="nav-link" tag={Link} to="/products">
                  Products
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className="nav-link"
                  to="https://github.com/reactstrap/reactstrap"
                >
                  <img src={logo} alt="logo" className="logo" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default withRouter(Header);
