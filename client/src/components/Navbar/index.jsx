import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { isEmpty, equals } from "ramda";
import AppActions from "../../actions/app";
import "./Navbar.scss";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutRequest();
  }
  render() {
    const { token } = this.props;
    const path = this.props.history.location.pathname;

    return (
      <Navbar
        className="navbar_style px-2"
        collapseOnSelect
        expand="lg"
        variant="dark"
        sticky="top"
      >
        <Navbar.Brand href="/" className="px-1">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          पशु सेवा तालिम केन्द्र, पोखरा
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="हाम्रो बारेमा"
              id="collasible-nav-dropdown"
              className="pr-5"
            >
              <NavDropdown.Item href="/about/introduction">
                परिचय
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/organization_structure">
                संगठन संरचना
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/objectives">
                उदेश्य
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/tor">TOR</NavDropdown.Item>
              <NavDropdown.Item href="/about/staff">कर्मचारी</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="सुचना पाटी"
              id="collasible-nav-dropdown"
              className="pr-5"
            >
              <NavDropdown.Item href="/notice/newsandnoticeslist">
                सूचना तथा समाचारहरू
              </NavDropdown.Item>
              <NavDropdown.Item href="/notice/eventslist">
                कार्यक्रमहरू
              </NavDropdown.Item>
              <NavDropdown.Item href="/notice/pressreleaselist">
                प्रेस विज्ञप्ति
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/downloadslist" className="pr-5">
              डाउनलोड्
            </Nav.Link>
            <NavDropdown
              title="प्रकाशन्"
              id="collasible-nav-dropdown"
              className="pr-5"
            >
              <NavDropdown.Item href="/publications/procedureslist">
                निर्देशिका / कार्यविधि
              </NavDropdown.Item>
              <NavDropdown.Item href="/publications/bookslist">
                हाते पुस्तिका
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="ग्यालरी"
              id="collasible-nav-dropdown"
              className="pr-5"
            >
              <NavDropdown.Item href="/gallery/photogallery">
                फोटो ग्यालरी
              </NavDropdown.Item>
              <NavDropdown.Item href="/gallery/videogallery">
                भिडियो ग्यालरी
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contact" className="pr-5 mr-5">
              सम्पर्क
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isEmpty(token) && equals(path, "/admin/auth") && (
          <Navbar.Brand href="/admin/auth" className="px-1">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </Navbar.Brand>
        )}
        {!isEmpty(token) && (
          <Navbar.Brand
            href="/admin"
            className="px-1"
            onClick={() => this.handleLogout()}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Navbar.Brand>
        )}
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: () => dispatch(AppActions.logoutRequest()),
});

export default connect(null, mapDispatchToProps)(NavbarComponent);
