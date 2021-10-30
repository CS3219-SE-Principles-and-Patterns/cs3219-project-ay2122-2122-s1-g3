import React from "react";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";

import Home from "./Screen/Home";
import Login from "./Screen/Login";
import Signup from "./Screen/Signup";
import { Room } from "./Screen/Room";
import Profile from "./Screen/Profile";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { removeUserSession } from "./Utils/Common";

// A header containing all current screens
// for displaying purpose
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" to="/signup">
              Signup
            </NavLink>
            <NavLink exact activeClassName="active" to="/home">
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/room">
              Room
            </NavLink>
            <NavLink activeClassName="active" to="/profile">
              Profile
            </NavLink>
            <button onClick={removeUserSession}>Logout</button>
          </div>
          <div className="content">
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/signup" component={Signup} />
              <PublicRoute path="/home" component={Home} />
              <PublicRoute path="/room" component={Room} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
