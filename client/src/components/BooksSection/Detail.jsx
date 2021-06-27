import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.book_id,
      book_title: props.history.location.item.book_title,
      book_cat: props.history.location.item.book_cat,
      published_date: props.history.location.item.published_date,
      book_file: props.history.location.item.book_file,
      attachment: "",
    };
  }

  render() {
    const { isBusy, title } = this.props;
    const {
      book_title,
      book_cat,
      published_date,
      book_file,
      attachment,
    } = this.state;
    return (
      <div className="d-flex flex-column p-5">
        <div className="titlebar justify-cat-center">{title}</div>
        <Row className="p-2">
          <Col xs={1} md={1} lg={1} className="p-0">
            <span className="dsl-b22 text-400">शीर्षक:</span>
          </Col>
          <Col xs={2} md={11} lg={11} className="p-0">
            <span className="dsl-b22 text-400">{book_title}</span>
          </Col>
        </Row>
        <Row className="p-2">
          <span className="dsl-b22 text-400">{book_cat}</span>
        </Row>
        <Row className="p-2">
          <Col xs={2} md={2} lg={2} className="p-0">
            <span className="dsl-b22 text-400">रुजुकर्ता:</span>
          </Col>
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
          {attachment || book_file ? attachment.name || book_file : ""}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  book_title: PropTypes.string,
  approved_by: PropTypes.string,
  published_date: PropTypes.string,
  onSubmit: PropTypes.func,
};

Detail.defaultProps = {
  book_title: "",
  published_date: "",
  approved_by: "",
};

export default Detail;
