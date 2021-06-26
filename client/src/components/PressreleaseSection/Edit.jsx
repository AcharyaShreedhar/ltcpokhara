import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Button, Input } from "../../components";

class Edit extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      event_title,
      event_content,
      event_date,
      approved_by,
      event_file,
      attachment,
    } = this.state;
    const payload = {
      event: {
        data: {
          event_title: event_title,
          event_content: event_content,
          event_date: event_date,
          approved_by: approved_by,
          event_file: attachment.name || event_file,
        },
      },
    };

    this.props.onUpdate(payload, attachment);
  }

  handleDate(e) {
    this.setState({ event_date: e });
  }
  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const {
      event_title,
      event_content,
      event_date,
      approved_by,
      event_file,
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
            value={event_title}
            direction="vertical"
            onChange={(e) => this.setState({ event_title: e })}
          />
          <Input
            className="mb-4"
            title="बेहोरा"
            value={event_content}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ event_content: e })}
          />

          <Input
            className="mb-4"
            title="रुजुकर्ता"
            value={approved_by}
            direction="vertical"
            onChange={(e) => this.setState({ approved_by: e })}
          />
          <span className="dsl-b18">प्रकाशित मिति</span>
          <NepaliDatePicker
            inputClassName="form-control"
            className="mb-4"
            value={event_date}
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
                    Upload:{attachment ? attachment.name || event_file : ""}
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

Edit.propTypes = {
  event_title: PropTypes.string,
  approved_by: PropTypes.string,
  event_date: PropTypes.string,
  onSubmit: PropTypes.func,
};

Edit.defaultProps = {
  event_title: "",
  event_date: "",
  approved_by: "",

  OnSubmit: () => {},
};

export default Edit;
