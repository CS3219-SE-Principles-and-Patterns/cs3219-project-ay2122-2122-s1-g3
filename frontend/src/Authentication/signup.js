import React from "react";

export class Signup extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header"> Sign up </div>
        <div className="content">
          <div className="form">
            <div className="sub-form">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="sub-form">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <div className="sub-form">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                placeholder="confirm-password"
              />
            </div>
          </div>
          <div className="login-button">
            <button type="button" className="btn">
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}
