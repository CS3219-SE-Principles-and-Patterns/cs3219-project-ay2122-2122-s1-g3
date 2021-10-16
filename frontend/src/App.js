import React from "react";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";

import Home from "./Screen/Home";
import Login from "./Screen/Login";
import Signup from "./Screen/Signup";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";

// A header containing all current screens
// for displaying purpose
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/home">
              Home
            </NavLink>
            <small>(Access with token only)</small>
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/signup">
              Signup
            </NavLink>
            <small>(Access without token only)</small>
          </div>
          <div className="content">
            <Switch>
              <PrivateRoute path="/home" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/signup" component={Signup} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
