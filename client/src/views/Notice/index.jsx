import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "../../components";
import NoticeRoutes from "../../routes/notice";

class Notice extends Component {
  render() {
    return (
      <Switch>
        {NoticeRoutes.map((prop, key) => {
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

Notice.propTypes = {
  history: PropTypes.any,
};

Notice.defaultProps = {
  history: () => {},
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
