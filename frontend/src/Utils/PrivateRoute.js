import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./Common";

// handle the private routes
// only access the routes with login token only
// if user is not logged in
// redirect to login page
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
