import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "../../../components";
import AdminActions from "../../../actions/admin";
import "../admin.scss";

class AddPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const { title, category, publishedDate, subject, attachment } = this.state;
    const payload = {
      publication: {
        data: {
          publication_title: title,
          publication_subject: subject,
          publication_cat: category,
          publication_date: publishedDate,
          publication_file: attachment.name,
        },
      },
    };

    this.props.savePublication(payload, attachment);
  }

  handleTitle(e) {
    this.setState({ title: e.trim() });
  }
  handleCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleSubject(e) {
    this.setState({ subject: e });
  }
  handleDate(e) {
    this.setState({ publishedDate: e.trim() });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const { title, category, subject, publishedDate, attachment } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-content-center">
            प्रकाशन्
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
              <option value="tor">निर्देशिका / कार्यविधि</option>
              <option value="books">हाते पुस्तिका</option>
              <option value="download">अन्य डाउनलोड</option>
            </Form.Control>
          </Form.Group>
          <Input
            className="mt-4"
            title="Subject"
            direction="vertical"
            value={subject}
            placeholder="Type here..."
            onChange={this.handleSubject}
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
                    Upload: {attachment ? attachment.name : ""}
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

AddPublication.propTypes = {
  title: PropTypes.string,
  subject: PropTypes.string,
  publishedDate: PropTypes.string,
  category: PropTypes.string,
  onSubmit: PropTypes.func,
};

AddPublication.defaultProps = {
  title: "",
  category: "",
  publishedDate: "",
  subject: "",

  OnSubmit: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  savePublication: (e) => dispatch(AdminActions.addpublicationRequest(e)),
});

export default connect(null, mapDispatchToProps)(AddPublication);
