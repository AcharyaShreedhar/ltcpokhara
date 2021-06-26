import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "../../components";
import PublicationsRoutes from "../../routes/publications";
import PublicationActions from "../../actions/publication";

class Publications extends Component {
  componentDidMount() {
    this.props.fetchallBooks({
      name: "published_date",
      page: 0,
      perPage: 10,
    });
  }
  render() {
    return (
      <Switch>
        {PublicationsRoutes.map((prop, key) => {
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

Publications.propTypes = {
  history: PropTypes.any,
};

Publications.defaultProps = {
  history: () => {},
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchallBooks: (payload) =>
    dispatch(PublicationActions.fetchallbooksRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
