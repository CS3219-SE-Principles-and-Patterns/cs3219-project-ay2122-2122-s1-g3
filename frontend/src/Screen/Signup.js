import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
import "../Style/LoginSignup.scss";

function Signup(props) {
  const username = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of signup form
  const handleSignup = () => {
    axios
      .post("http://localhost:4000/auth/signup", {
        email: email.value,
        password: password.value,
        username: username.value,
      })
      .then((response) => {
        setLoading(false);
        axios
          .post("http://localhost:4000/auth/signin", {
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
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong :(");
        }
      });
  };

  return (
    <div className="Signup">
      <div className="peer-prep">
        <h1>PeerPrep</h1>
        <h3>See your growth and get support</h3>
      </div>
      <div className="container">
        <div className="title"> Sign up </div>
        <div className="content">
          <div className="form">
            <div className="sub-form">
              <label htmlFor="username">Username</label>
              <input type="text" {...username} autoComplete="new-password" />
            </div>
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
            <div className="sub-form">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                {...confirmPassword}
                autoComplete="new-password"
              />
            </div>
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
          </div>
          <div className="login-button">
            <input
              type="button"
              value={loading ? "Loading..." : "Signup"}
              onClick={handleSignup}
              disabled={loading}
            />
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

export default Signup;
