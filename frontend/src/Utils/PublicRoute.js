import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./Common";

// handle the public routes
// only access the routes without login token only
// if user is logged in
// redirect to home page
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/home" }} />
        )
      }
    />
  );
}

export default PublicRoute;
