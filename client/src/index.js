import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.compat.css";
import "react-toastify/dist/ReactToastify.css";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, history } from "./reducers";
import indexRoutes from "./routes";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            if (prop.name === "Home") {
              return (
                <Route to={prop.path} component={prop.component} key={key} />
              );
            } else
              return (
                <Route
                  exact
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
          })}
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
