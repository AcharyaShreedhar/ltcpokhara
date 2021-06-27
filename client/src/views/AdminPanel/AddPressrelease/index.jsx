import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Button, Input } from "../../../components";
import PressreleaseActions from "../../../actions/pressRelease";
import "../admin.scss";

class AddPressrelease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressrelease_title: "",
      published_date: "",
      pressrelease_content: "",
      submitted_by: "",
      pressrelease_file: "",
      attachment: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      pressrelease_title,
      pressrelease_content,
      published_date,
      submitted_by,
      attachment,
    } = this.state;

    const payload = {
      pressrelease: {
        data: {
          pressrelease_title: pressrelease_title,
          pressrelease_content: pressrelease_content,
          published_date: published_date,
          submitted_by: submitted_by,
          pressrelease_file: attachment.name,
        },
      },
    };

    this.props.savePressrelease(payload, attachment);
  }

  handleDate(e) {
    this.setState({ published_date: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const {
      pressrelease_title,

      pressrelease_content,
      published_date,
      submitted_by,
      attachment,
    } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-content-center">
            प्रेस विज्ञप्ति
          </div>
          <Input
            className="mb-4"
            title="शीर्षक "
            value={pressrelease_title}
            direction="vertical"
            onChange={(e) => this.setState({ pressrelease_title: e })}
          />

          <Input
            className="mb-4"
            title="बेहोरा"
            value={pressrelease_content}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ pressrelease_content: e })}
          />

          <Input
            className="mb-4"
            title="रुजुकर्ता"
            value={submitted_by}
            direction="vertical"
            onChange={(e) => this.setState({ submitted_by: e })}
          />
          <span className="dsl-b18">प्रकाशित मिति</span>
          <NepaliDatePicker
            inputClassName="form-control"
            className="mb-4"
            value={published_date}
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

AddPressrelease.propTypes = {
  pressrelease_title: PropTypes.string,
  submitted_by: PropTypes.string,
  published_date: PropTypes.string,
};

AddPressrelease.defaultProps = {
  pressrelease_title: "",
  published_date: "",
  submitted_by: "",
};

const mapDispatchToProps = (dispatch) => ({
  savePressrelease: (e) =>
    dispatch(PressreleaseActions.addpressreleaseRequest(e)),
});

export default connect(null, mapDispatchToProps)(AddPressrelease);
