import React, { Component } from "react";
import { connect } from "react-redux";
import { equals, isEmpty, isNil } from "ramda";
import SignIn from "./SignIn";
import Register from "./Register";
import AppActions from "../../actions/app";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Sign In",
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    if (!isEmpty(this.props.token) && !isNil(this.props.token)) {
      this.props.history.push("/home");
    }
  }

  handleRegister(payload) {
    //implementation goes here after API is ready.
  }

  render() {
    const { type } = this.state;
    const { loginRequest, isBusy } = this.props;

    return (
      <div className="login mt-5">
        {/* <Loading loading={isBusy} /> */}
        <div className="login-header justify-content-center">
          <span className="dsl-w12 ml-1">Login</span>
        </div>

        <SignIn
          onLogin={loginRequest}
          isBusy={isBusy}
          onSelect={this.handleTab}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isBusy: equals(state.app.status, "pending"),
  token: state.app.token,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => dispatch(AppActions.loginRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
