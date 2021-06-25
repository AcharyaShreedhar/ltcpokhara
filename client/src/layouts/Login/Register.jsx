/**
 * Created by Shreedhar Acharya
 * Created on 07/04/2019
 * https://marvelapp.com/4a0e48c/screen/58123589/layer/92774781
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty, equals } from "ramda";
import { Button, CheckBox, Input } from "../../components";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatedPassword: "",
      error: "",
      firstName: "",
      lastName: "",
      jobRole: "",
      companyURL: "",
      companyName: "",
      termsAgreed: false,
      aboutAvatar: "",
      companyAvatar: "",
    };

    // this.handleEmail = this.handleEmail.bind(this)
    // this.handlePassword = this.handlePassword.bind(this)
    // this.handleRepeatPassword = this.handleRepeatPassword.bind(this)
    // this.handleFirstName = this.handleFirstName.bind(this)
    // this.handleLastName = this.handleLastName.bind(this)
    // this.handleJobRole = this.handleJobRole.bind(this)
    // this.handleCompanyUrl = this.handleCompanyUrl.bind(this)
    // this.handleCompanyName = this.handleCompanyName.bind(this)
    // this.handleCheck = this.handleCheck.bind(this)
    // this.handleDrop = this.handleDrop.bind(this)
    // this.handleRegister = this.handleRegister.bind(this)
  }

  handleEmail(e) {
    this.setState({ email: e });
  }

  handlePassword(e) {
    const { repeatedPassword } = this.state;
    if (equals(e, repeatedPassword)) {
      this.setState({ error: "" });
    } else {
      this.setState({ error: "Passwords donot match!!. Please try again." });
    }
    this.setState({ password: e });
  }

  handleRepeatPassword(e) {
    const { password } = this.state;
    if (equals(e, password)) {
      this.setState({ error: "" });
    } else {
      this.setState({ error: "Passwords donot match!!. Please try again." });
    }
    this.setState({ repeatedPassword: e });
  }

  handleFirstName(e) {
    this.setState({ firstName: e });
  }

  handleLastName(e) {
    this.setState({ lastName: e });
  }

  handleJobRole(e) {
    this.setState({ jobRole: e });
  }

  handleCompanyUrl(e) {
    this.setState({ companyURL: e });
  }

  handleCompanyName(e) {
    this.setState({ companyName: e });
  }

  handleCheck() {
    const { termsAgreed } = this.state;
    this.setState({ termsAgreed: !termsAgreed });
  }

  handleRegister() {
    const {
      email,
      password,
      firstName,
      lastName,
      jobRole,
      companyURL,
      companyName,
      aboutAvatar,
      companyAvatar,
    } = this.state;
    // implementation will be defined after API is ready
  }

  render() {
    const {
      email,
      password,
      repeatedPassword,
      error,
      firstName,
      lastName,
      jobRole,
      companyName,
      companyURL,
      termsAgreed,
    } = this.state;
    const disabled =
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(jobRole) ||
      isEmpty(companyName) ||
      isEmpty(companyURL) ||
      equals(termsAgreed, false) ||
      !isEmpty(error);
    return (
      <div className="register">
        <div className="d-flex">
          <div className="section">
            <div className="py-2 border-bottom-light">
              <p className="dsl-b16 bold">Login</p>
              <Input
                className="mt-1"
                title="Login email"
                value={email}
                placeholder="Type here..."
                onChange={this.handleEmail}
              />
              <Input
                className="mt-1"
                type="password"
                title="Password"
                value={password}
                placeholder="Type here..."
                onChange={this.handlePassword}
              />
              <Input
                className="mt-1"
                type="password"
                title=" Repeat Password"
                value={repeatedPassword}
                error={error}
                placeholder="Type here..."
                onChange={this.handleRepeatPassword}
              />
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="section">
            <div className="py-2 border-bottom-light">
              <p className="dsl-b16 bold">About</p>
              <div className="d-flex">
                <div className="d-flex-1">
                  <Input
                    className="mt-1"
                    title="First name"
                    value={firstName}
                    placeholder="Type here..."
                    onChange={this.handleFirstName}
                  />
                  <Input
                    className="mt-1"
                    title="Last name"
                    value={lastName}
                    placeholder="Type here..."
                    onChange={this.handleLastName}
                  />
                  <Input
                    className="mt-1"
                    title="Job role"
                    value={jobRole}
                    placeholder="Type here..."
                    onChange={this.handleJobRole}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="section">
            <div className="py-2 border-bottom-light">
              <p className="dsl-b16 bold">Company</p>
              <div className="d-flex">
                <div className="d-flex-1">
                  <Input
                    className="mt-1"
                    title="Company URL"
                    value={companyURL}
                    placeholder="Type here..."
                    onChange={this.handleCompanyUrl}
                  />
                  <Input
                    className="mt-1"
                    title="Company name"
                    value={companyName}
                    placeholder="Type here..."
                    onChange={this.handleCompanyName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <CheckBox
            size="small"
            checked={termsAgreed}
            onChange={this.handleCheck}
          />
          <span className="dsl-m12 ml-2">I aggree to</span>
          <span className="dsl-p12 ml-2">Terms of Service & Privacy</span>
        </div>
        <div className="section-footer">
          <Button
            name="REGISTER"
            onClick={this.handleRegister}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

Register.defaultProps = {
  email: "",
  password: "",
};

export default Register;
