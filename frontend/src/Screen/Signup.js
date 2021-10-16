import React, { useState } from "react";
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
    props.history.push("/home");
  };

  return (
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
            <input type="password" {...password} autoComplete="new-password" />
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
