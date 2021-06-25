import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "../../../components";
import AdminActions from "../../../actions/admin";
import "../admin.scss";

class AddNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      title,
      category,
      publishedDate,
      approvedBy,
      attachment,
    } = this.state;
    const payload = {
      notice: {
        data: {
          notice_title: title,
          notice_cat: category,
          notice_publisheddate: publishedDate,
          notice_approvedby: approvedBy,
          notice_file: attachment.name,
        },
      },
    };

    this.props.saveNotice(payload, attachment);
  }

  handleTitle(e) {
    this.setState({ title: e.trim() });
  }
  handleCategory(e) {
    this.setState({ category: e.target.value });
  }

  handleApproval(e) {
    this.setState({ approvedBy: e });
  }
  handleDate(e) {
    this.setState({ publishedDate: e.trim() });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const {
      title,
      category,
      approvedBy,
      publishedDate,
      attachment,
    } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-content-center">
            सुचना
          </div>
          <Input
            className="mt-4"
            title="Title"
            direction="vertical"
            value={title}
            placeholder="Type here..."
            onChange={this.handleTitle}
          />
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="core-input-label">Category</Form.Label>
            <Form.Control
              className="input"
              as="select"
              value={category}
              onChange={this.handleCategory}
            >
              <option value="newsnotice">सूचना तथा समाचारहरू</option>
              <option value="programme">कार्यक्रमहरू</option>
              <option value="pressrelease">प्रेस विज्ञप्ति</option>
            </Form.Control>
          </Form.Group>
          <Input
            className="mt-4"
            title="Approved By"
            direction="vertical"
            value={approvedBy}
            placeholder="Type here..."
            onChange={this.handleApproval}
          />
          <Input
            className="mt-4"
            title="Published Date"
            direction="vertical"
            value={publishedDate}
            placeholder="Type here..."
            onChange={this.handleDate}
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
                    Upload:{attachment ? attachment.name : ""}
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

AddNotice.propTypes = {
  title: PropTypes.string,
  approvedBy: PropTypes.string,
  publishedDate: PropTypes.string,
  category: PropTypes.string,
  onSubmit: PropTypes.func,
};

AddNotice.defaultProps = {
  title: "",
  category: "",
  publishedDate: "",
  approvedBy: "",

  OnSubmit: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  saveNotice: (e) => dispatch(AdminActions.addnoticeRequest(e)),
});

export default connect(null, mapDispatchToProps)(AddNotice);
