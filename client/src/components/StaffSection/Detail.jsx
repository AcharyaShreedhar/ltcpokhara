import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.staff_id,
      staff_name: props.history.location.item.staff_name,
      staff_designation: props.history.location.item.staff_designation,
      staff_branch: props.history.location.item.staff_branch,
      staff_email: props.history.location.item.staff_email,
      staff_file: props.history.location.item.staff_file,
      attachment: "",
    };
  }

  render() {
    const { isBusy } = this.props;
    const {
      staff_name,
      staff_designation,
      staff_branch,
      staff_email,
      staff_file,
      attachment,
    } = this.state;
    return (
      <div className="d-flex flex-column p-5">
        <div className="namebar justify-cat-center">
          कार्यक्रमको बिस्तृत विवरण
        </div>
        <Row className="p-2">
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">शीर्षक:</span>
          </Col>
          <Col xs={2} md={11} lg={11} className="p-0">
            <span className="dsl-b22 text-400">{staff_name}</span>
          </Col>
        </Row>
        <Row className="p-2">
          <span className="dsl-b22 text-400">{staff_designation}</span>
        </Row>
        <Row className="p-2">
         
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">मिति:</span>
          </Col>
          <Col xs={2} md={4} lg={4} className="p-0">
            <span className="dsl-b22 text-400">{staff_branch}</span>
          </Col>
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">मिति:</span>
          </Col>
          <Col xs={2} md={4} lg={4} className="p-0">
            <span className="dsl-b22 text-400">{staff_email}</span>
          </Col>
        </Row>
        <Row className="p-2"></Row>
        <div className="image p-2">
          <FontAwesomeIcon icon={faFile} className="pr-1" />
          {attachment || staff_file ? attachment.name || staff_file : ""}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  staff_name: PropTypes.string,
  approved_by: PropTypes.string,
  staff_branch: PropTypes.string,
  onSubmit: PropTypes.func,
};

Detail.defaultProps = {
  staff_name: "",
  staff_branch: "",
  approved_by: "",
};

export default Detail;
