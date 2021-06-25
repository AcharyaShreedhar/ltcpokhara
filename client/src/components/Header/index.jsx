import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faFax,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

class HeaderComponent extends Component {
  render() {
    return (
      <Row className="m-0">
        <Row className="top-bar m-0">
          <Col
            xs={6}
            sm={6}
            md={2}
            lg={2}
            className="d-flex justify-content-end"
          >
            ताजा जानकारी :
          </Col>
          <Col xs={6} sm={6} md={10} lg={10}>
            <marquee> पशु सेवा तालिम केन्द्र</marquee>
          </Col>
        </Row>
        <Row className="header_content">
          <Col xs={12} sm={6} md={3} lg={3} className="app-logo">
            <Image src="/images/nepal_logon.png" />
          </Col>
          <Col xs={12} sm={6} md={3} lg={3} className="info_section">
            <p>प्रदेश सरकार</p>
            <p>भुमि व्यवस्था, कृषि तथा सहकारी मन्त्रालय</p>{" "}
            <p>पशुपन्छी तथा मत्स्य विकास निर्देशनालय </p>
            <p>पशु सेवा तालिम केन्द्र </p>
            <p>पोखरा, नेपाल</p>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3} className="app-logo">
            <Image src="/nepalflag.gif" />
          </Col>
          <Col xs={12} sm={6} md={3} lg={3} className="contact-section">
            <div>
              <div className="d-flex p-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                <p> ठेगाना : पोखरा, नेपाल</p>
              </div>
              <div className="d-flex p-1">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <p>सम्पर्क नं.:०६१-५२४१९५</p>
              </div>
              {/* <div className="d-flex p-1">
              <FontAwesomeIcon icon={faFax} className="mr-2" />
              <p>फ्याक्स : </p>
            </div> */}
              <div className="d-flex p-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <p>ईमेल: info@ltcpokhara.gov.np </p>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default HeaderComponent;
