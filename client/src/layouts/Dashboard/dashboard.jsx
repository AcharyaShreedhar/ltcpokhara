import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "../../components";
import dashboardRoutes from "../../routes/dashboard";
import "./Dashboard.scss";

export const Content = ({ loggedIn }) => {
  return (
    <div id="ds-content" className="content">
      <div className="main">
        <Switch>
          {dashboardRoutes.map((route, key) => {
            if (route.redirect)
              return (
                <Redirect exact from={route.path} to={route.to} key={key} />
              );
            return (
              <Route path={route.path} component={route.component} key={key} />
            );
          })}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};
