import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "../../components";
import aboutRoutes from "../../routes/about";

class About extends Component {
  render() {
    return (
      <Switch>
        {aboutRoutes.map((prop, key) => {
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

About.propTypes = {
  history: PropTypes.any,
};

About.defaultProps = {
  history: () => {},
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(About);
