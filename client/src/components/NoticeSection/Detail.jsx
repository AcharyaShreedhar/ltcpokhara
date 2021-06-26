import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Button, Input } from "../../components";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.history.location.item.notice_id,
      notice_title: props.history.location.item.notice_title,
      notice_cat: props.history.location.item.notice_cat,
      notice_content: props.history.location.item.notice_content,
      notice_publisheddate: props.history.location.item.notice_publisheddate,
      notice_approvedby: props.history.location.item.notice_approvedby,
      notice_file: props.history.location.item.notice_file,
      attachment: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      notice_title,
      notice_cat,
      notice_content,
      notice_publisheddate,
      notice_approvedby,
      notice_file,
      attachment,
    } = this.state;
    const payload = {
      notice: {
        data: {
          notice_title: notice_title,
          notice_cat: notice_cat,
          notice_content: notice_content,
          notice_publisheddate: notice_publisheddate,
          notice_approvedby: notice_approvedby,
          notice_file: attachment.name || notice_file,
        },
      },
    };

    this.props.onUpdate(payload, attachment);
  }
  handleCategory(e) {
    this.setState({ category: e.target.value });
  }

  handleDate(e) {
    this.setState({ notice_publishedDate: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const {
      notice_title,
      notice_content,
      notice_cat,
      notice_publisheddate,
      notice_approvedby,
      notice_file,
      attachment,
    } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-content-center">
            सुचना
          </div>
          <Input
            className="mb-4"
            title="शीर्षक "
            value={notice_title}
            direction="vertical"
            onChange={(e) => this.setState({ notice_title: e })}
          />
          <Input
            className="mb-4"
            title="बेहोरा"
            value={notice_content}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ notice_content: e })}
          />
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="core-input-label">वर्ग</Form.Label>
            <Form.Control
              className="input"
              as="select"
              value={notice_cat}
              onChange={this.handleCategory}
            >
              <option value="newsnotice">सूचना तथा समाचारहरू</option>
              <option value="programme">कार्यक्रमहरू</option>
              <option value="pressrelease">प्रेस विज्ञप्ति</option>
            </Form.Control>
          </Form.Group>
          <Input
            className="mb-4"
            title="शीर्षक "
            value={notice_approvedby}
            direction="vertical"
            onChange={(e) => this.setState({ notice_approvedby: e })}
          />
          <span className="dsl-b18">प्रकाशित मिति</span>
          <NepaliDatePicker
            inputClassName="form-control"
            className="mb-4"
            value={notice_publisheddate}
            onChange={(e) => this.handleDate(e)}
            options={{ calenderLocale: "ne", valueLocale: "en" }}
          />
          <Dropzone
            className="drag-drop"
            activeClassName="drag-drop active"
            acceptClassName="drag-drop active"
            rejectClassName="drag-drop deactivate"
            onDrop={this.handleDrop}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="mt-2">
                  <input {...getInputProps()} />
                  <div className="image">
                    <FontAwesomeIcon icon={faUpload} className="pr-1" />
                    Upload:{attachment ? attachment.name || notice_file : ""}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          <div className="justify-content-center d-flex mt-4">
            <Button
              name="Submit"
              onClick={this.handleSubmit}
              disabled={isBusy}
            />
          </div>
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  notice_title: PropTypes.string,
  notice_approvedby: PropTypes.string,
  notice_publisheddate: PropTypes.string,
  notice_cat: PropTypes.string,
  onSubmit: PropTypes.func,
};

Detail.defaultProps = {
  notice_title: "",
  notice_cat: "",
  notice_publisheddate: "",
  notice_approvedby: "",

  OnSubmit: () => {},
};

export default Detail;
