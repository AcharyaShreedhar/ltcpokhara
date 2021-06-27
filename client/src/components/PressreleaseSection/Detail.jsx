import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.event_id,
      event_title: props.history.location.item.event_title,
      event_content: props.history.location.item.event_content,
      event_date: props.history.location.item.event_date,
      approved_by: props.history.location.item.approved_by,
      event_file: props.history.location.item.event_file,
      attachment: "",
    };
  }

  render() {
    const { isBusy, title } = this.props;
    const {
      event_title,
      event_content,
      event_date,
      approved_by,
      event_file,
      attachment,
    } = this.state;
    return (
      <div className="d-flex flex-column p-5">
        <div className="titlebar justify-content-center">{title}</div>
        <Row className="p-2">
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">शीर्षक:</span>
          </Col>
          <Col xs={2} md={11} lg={11} className="p-0">
            <span className="dsl-b22 text-400">{event_title}</span>
          </Col>
        </Row>
        <Row className="p-2">
          <span className="dsl-b22 text-400">{event_content}</span>
        </Row>
        <Row className="p-2">
          <Col xs={2} md={2} lg={2} className="p-0">
            <span className="dsl-b22 text-400">रुजुकर्ता:</span>
          </Col>
          <Col xs={2} md={4} lg={4} className="p-0">
            <span className="dsl-b22 text-400">{approved_by}</span>
          </Col>
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">मिति:</span>
          </Col>
          <Col xs={2} md={4} lg={4} className="p-0">
            <span className="dsl-b22 text-400">{event_date}</span>
          </Col>
        </Row>
        <Row className="p-2"></Row>
        <div className="image p-2">
          <FontAwesomeIcon icon={faFile} className="pr-1" />
          {attachment || event_file ? attachment.name || event_file : ""}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  event_title: PropTypes.string,
  approved_by: PropTypes.string,
  event_date: PropTypes.string,
  onSubmit: PropTypes.func,
};

Detail.defaultProps = {
  event_title: "",
  event_date: "",
  approved_by: "",
};

export default Detail;
