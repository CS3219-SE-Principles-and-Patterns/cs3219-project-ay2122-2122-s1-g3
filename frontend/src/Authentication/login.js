import React from "react";

export class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header"> Log in </div>
        <div className="content">
          <div className="form">
            <div className="sub-form">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="sub-form">
              <label htmlFor="username">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <div className="login-button">
              <button type="button" className="btn">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
