import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "../../../components";
import AdminActions from "../../../actions/admin";
import "../admin.scss";

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDesignation = this.handleDesignation.bind(this);
    this.handleBranch = this.handleBranch.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleSubmit() {
    const { name, designation, branch, email, attachment } = this.state;
    const payload = {
      staff: {
        data: {
          staff_name: name,
          staff_designation: designation,
          staff_branch: branch,
          staff_email: email,
          staff_file: attachment.name,
        },
      },
    };

    this.props.saveStaff(payload, attachment);
  }

  handleName(e) {
    this.setState({ name: e.trim() });
  }

  handleDesignation(e) {
    this.setState({ designation: e.trim() });
  }

  handleBranch(e) {
    this.setState({ branch: e });
  }
  handleEmail(e) {
    this.setState({ email: e });
  }

  handleDrop(e) {
    this.setState({ attachment: e[0] });
  }

  render() {
    const { isBusy } = this.props;
    const { name, designation, branch, email, attachment } = this.state;
    return (
      <div className="admin card mt-5">
        <div className="sign-in">
          <div className="titlebar text-center justify-content-center">
            कर्मचारी
          </div>
          <Input
            className="mt-4"
            title="नाम"
            direction="vertical"
            value={name}
            placeholder="Type here..."
            onChange={this.handleName}
          />
          <Input
            className="mt-4"
            title="पद"
            direction="vertical"
            value={designation}
            placeholder="Type here..."
            onChange={this.handleDesignation}
          />
          <Input
            className="mt-4"
            title="शाखा"
            direction="vertical"
            value={branch}
            placeholder="Type here..."
            onChange={this.handleBranch}
          />
          <Input
            className="mt-4"
            title="ईमेल"
            direction="vertical"
            value={email}
            placeholder="Type here..."
            onChange={this.handleEmail}
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
                    फोटो : {attachment ? attachment.name : ""}
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

AddStaff.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onLogin: PropTypes.func,
};

AddStaff.defaultProps = {
  email: "",
  password: "",
  OnLogin: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  saveStaff: (e) => dispatch(AdminActions.addstaffRequest(e)),
});

export default connect(null, mapDispatchToProps)(AddStaff);
