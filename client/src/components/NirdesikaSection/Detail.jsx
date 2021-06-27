import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.nirdeshika_id,
      nirdeshika_sirsak: props.history.location.item.nirdeshika_sirsak,
      nirdeshika_bisaya: props.history.location.item.nirdeshika_bisaya,
      nirdeshika_miti: props.history.location.item.nirdeshika_miti,
      nirdeshika_file: props.history.location.item.nirdeshika_file,
      attachment: "",
    };
  }

  render() {
    const { isBusy, title } = this.props;
    const {
      nirdeshika_sirsak,
      nirdeshika_bisaya,
      nirdeshika_miti,
      nirdeshika_file,
      attachment,
    } = this.state;
    return (
      <div className="d-flex flex-column p-5">
        <div className="sirsakbar justify-bisaya-center">{title}</div>
        <Row className="p-2">
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">शीर्षक:</span>
          </Col>
          <Col xs={2} md={11} lg={11} className="p-0">
            <span className="dsl-b22 text-400">{nirdeshika_sirsak}</span>
          </Col>
        </Row>
        <Row className="p-2">
          <span className="dsl-b22 text-400">{nirdeshika_bisaya}</span>
        </Row>
        <Row className="p-2">
          <Col xs={2} md={2} lg={2} className="p-0">
            <span className="dsl-b22 text-400">रुजुकर्ता:</span>
          </Col>
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">मिति:</span>
          </Col>
          <Col xs={2} md={4} lg={4} className="p-0">
            <span className="dsl-b22 text-400">{nirdeshika_miti}</span>
          </Col>
        </Row>
        <Row className="p-2"></Row>
        <div className="image p-2">
          <FontAwesomeIcon icon={faFile} className="pr-1" />
          {attachment || nirdeshika_file
            ? attachment.name || nirdeshika_file
            : ""}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  nirdeshika_sirsak: PropTypes.string,
  approved_by: PropTypes.string,
  nirdeshika_miti: PropTypes.string,
  onSubmit: PropTypes.func,
};

Detail.defaultProps = {
  nirdeshika_sirsak: "",
  nirdeshika_miti: "",
  approved_by: "",
};

export default Detail;
