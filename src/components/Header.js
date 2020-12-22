import React, { Component } from "react";
import firebase from 'firebase';
import swal from 'sweetalert';
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class Header extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

userLogout=()=>{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    swal("Logout", 'Sign-out successful.', 'warning');
  }).catch(function(error) {
    // An error happened.
    swal('Opps', error, 'warning');
  });
}

render() {
  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink exact to="/">Home</MDBNavLink>
            </MDBNavItem>            
          </MDBNavbarNav>          
        </MDBCollapse>
         <MDBNavbarNav right> 
          <MDBNavLink to="#!" onClick={this.userLogout}>Logout</MDBNavLink>
         </MDBNavbarNav>
      </MDBNavbar>
    </Router>
    );
  }
}

export default Header;