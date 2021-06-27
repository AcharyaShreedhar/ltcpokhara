import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Button, Input } from "../../../components";
import AdminActions from "../../../actions/admin";
import "../admin.scss";

class AddNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice_title: "",
      notice_cat: "",
      notice_publisheddate: "",
      notice_content: "",
      notice_approvedby: "",
      notice_file: "",
      attachment:"",
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
      attachment,
    } = this.state;
    console.log('attachment',attachment)
    const payload = {
      notice: {
        data: {
          notice_title: notice_title,
          notice_cat: notice_cat,
          notice_content: notice_content,
          notice_publisheddate: notice_publisheddate,
          notice_approvedby: notice_approvedby,
          notice_file: attachment.name,
        },
      },
    };

    this.props.saveNotice(payload, attachment);
  }

  handleCategory(e) {
    this.setState({ notice_cat: e.target.value });
  }

  handleDate(e) {
    this.setState({ notice_publisheddate: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const {
      notice_title,
      notice_cat,
      notice_content,
      notice_publisheddate,
      notice_approvedby,
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
            title="बेहोरा"
            value={notice_content}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ notice_content: e })}
          />

          <Input
            className="mb-4"
            title="रुजुकर्ता"
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
  notice_title: PropTypes.string,
  notice_approvedby: PropTypes.string,
  notice_publisheddate: PropTypes.string,
  notice_cat: PropTypes.string,
};

AddNotice.defaultProps = {
  notice_title: "",
  notice_cat: "",
  notice_publisheddate: "",
  notice_approvedby: "",
};

const mapDispatchToProps = (dispatch) => ({
  saveNotice: (e) => dispatch(AdminActions.addnoticeRequest(e)),
});

export default connect(null, mapDispatchToProps)(AddNotice);
