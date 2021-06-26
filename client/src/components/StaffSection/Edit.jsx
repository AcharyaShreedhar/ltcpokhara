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
      id: props.history.location.item.staff_id,
      staff_name: props.history.location.item.staff_name,
      staff_designation: props.history.location.item.staff_designation,
      staff_branch: props.history.location.item.staff_branch,
      staff_email: props.history.location.item.staff_email,
      staff_file: props.history.location.item.staff_file,
      attachment: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const {
      staff_name,
      staff_designation,
      staff_branch,
      staff_email,
      staff_file,
      attachment,
    } = this.state;
    const payload = {
      staff: {
        data: {
          staff_name: staff_name,
          staff_designation: staff_designation,
          staff_branch: staff_branch,
          staff_email: staff_email,
          staff_file: attachment.name || staff_file,
        },
      },
    };

    this.props.onUpdate(payload, attachment);
  }

  handleDrop(e) {
    this.setState({ attachment: e[0] });
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
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="namebar text-center justify-cat-center">सुचना</div>
          <Input
            className="mb-4"
            name="शीर्षक "
            value={staff_name}
            direction="vertical"
            onChange={(e) => this.setState({ staff_name: e })}
          />
          <Input
            className="mb-4"
            name="बेहोरा"
            value={staff_designation}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ staff_designation: e })}
          />
          <Input
            className="mb-4"
            name="बेहोरा"
            value={staff_email}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ staff_email: e })}
          />
          <Input
            className="mb-4"
            name="बेहोरा"
            value={staff_branch}
            direction="vertical"
            as="textarea"
            onChange={(e) => this.setState({ staff_branch: e })}
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
                    Upload:{attachment ? attachment.name || staff_file : ""}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="justify-cat-center d-flex mt-4">
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
  staff_name: PropTypes.string,
  approved_by: PropTypes.string,
  staff_branch: PropTypes.string,
  onSubmit: PropTypes.func,
};

Edit.defaultProps = {
  staff_name: "",
  staff_branch: "",
  approved_by: "",

  OnSubmit: () => {},
};

export default Edit;
