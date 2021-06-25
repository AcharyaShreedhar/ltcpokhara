import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "../../components";
import adminRoutes from "../../routes/admin";
import "./admin.scss";

class AdminPanel extends Component {
  render() {
    console.log("addm", adminRoutes);
    return (
      <Switch>
        {adminRoutes.map((prop, key) => {
          if (prop.redirect) {
            return <Redirect exact from={prop.path} to={prop.to} key={key} />;
          }
          return (
            <Route
              exact
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}

        <Route path="*" exact component={NotFound} />
      </Switch>
    );
  }
}

AdminPanel.propTypes = {
  history: PropTypes.any,
};

AdminPanel.defaultProps = {
  history: () => {},
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
