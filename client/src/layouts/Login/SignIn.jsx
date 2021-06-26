import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../../components";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin() {
    const { username, password } = this.state;
    this.props.onLogin({ user_name:username, user_pass:password });
  }

  handleRegister() {
    this.props.onSelect("register");
  }

  handleUsername(e) {
    this.setState({ username: e });
  }

  handlePassword(e) {
    this.setState({ password: e });
  }

  render() {
    const { isBusy } = this.props;
    const { username, password } = this.state;

    return (
      <div className="sign-in">
        <Input
          className="mt-4"
          title="Username"
          direction="vertical"
          value={username}
          placeholder="Type here..."
          onChange={this.handleUsername}
        />
        <Input
          className="mt-4"
          type="password"
          title="Password"
          direction="vertical"
          value={password}
          onChange={this.handlePassword}
          onEnter={this.handleLogin}
        />

        <div className="justify-content-center d-flex mt-4">
          <Button name="Login" onClick={this.handleLogin} />
        </div>
        {/* <div className="justify-content-center d-flex mt-4">
          <span className="dsl-b12">Don't have account?</span>
          <span className="dsl-p12 ml-1">
            Create one.
          </span>
        </div>
        <div className="justify-content-center d-flex mt-4">
          <a className="dsl-p12">
            Forgot Your Password?
          </a>
        </div> */}
      </div>
    );
  }
}

SignIn.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onLogin: PropTypes.func,
};

SignIn.defaultProps = {
  username: "",
  password: "",
  OnLogin: () => {},
};

export default SignIn;
