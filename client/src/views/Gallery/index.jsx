import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "../../components";
import GalleryRoutes from "../../routes/gallery";

class Gallery extends Component {
  render() {
    console.log("yeha aayoa", GalleryRoutes);
    return (
      <Switch>
        {GalleryRoutes.map((prop, key) => {
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

Gallery.propTypes = {
  history: PropTypes.any,
};

Gallery.defaultProps = {
  history: () => {},
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
