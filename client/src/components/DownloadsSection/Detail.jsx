import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.download_id,
      download_title: props.history.location.item.download_title,
      published_date: props.history.location.item.published_date,
      download_file: props.history.location.item.download_file,
      attachment: "",
    };
  }

  render() {
    const { isBusy } = this.props;
    const {
      download_title,
      published_date,
      download_file,
      attachment,
    } = this.state;
    return (
      <div className="d-flex flex-column p-5">
        <div className="titlebar justify-cat-center">
          कार्यक्रमको बिस्तृत विवरण
        </div>
        <Row className="p-2">
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">शीर्षक:</span>
          </Col>
          <Col xs={2} md={11} lg={11} className="p-0">
            <span className="dsl-b22 text-400">{download_title}</span>
          </Col>
        </Row>

        <Row className="p-2">
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">मिति:</span>
          </Col>
          <Col xs={2} md={4} lg={4} className="p-0">
            <span className="dsl-b22 text-400">{published_date}</span>
          </Col>
        </Row>
        <Row className="p-2"></Row>
        <div className="image p-2">
          <FontAwesomeIcon icon={faFile} className="pr-1" />
          {attachment || download_file ? attachment.name || download_file : ""}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  download_title: PropTypes.string,

  published_date: PropTypes.string,
};

Detail.defaultProps = {
  download_title: "",
  published_date: "",
};

export default Detail;
