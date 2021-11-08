import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
import "../Style/LoginSignup.scss";
require("dotenv").config();

function Login(props) {
  const email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    if (email.value === "") {
      setError("Please enter your email.");
      return;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.value === "") {
      setError("Please enter your password.");
      return;
    }
    axios
      .post(process.env.SIGN_IN_URL, {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/home");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="Login">
      <div className="peer-prep">
        <h1>PeerPrep</h1>
        <h3>See your growth and get support</h3>
      </div>
      <div className="container">
        <div className="title"> Log in </div>
        <div className="content">
          <div className="form">
            <div className="sub-form">
              <label htmlFor="email">Email</label>
              <input type="text" {...email} autoComplete="new-password" />
            </div>
            <div className="sub-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...password}
                autoComplete="new-password"
              />
            </div>
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
            <div className="login-button">
              <input
                type="button"
                value={loading ? "Loading..." : "Login"}
                onClick={handleLogin}
                disabled={loading}
              />
            </div>
          </div>
          <div className="sub-form">
            <label htmlFor="signup">
              Don't have an account? <a href="/Signup"> Create an account </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
