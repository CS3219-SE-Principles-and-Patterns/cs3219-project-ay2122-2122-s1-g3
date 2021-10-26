import React, { useState } from "react";
import axios from "axios";
import { getUser, getToken } from "../Utils/Common";

function Profile(props) {
  const newPassword = useFormInput("");
  const user = getUser();
  const id = user.id;
  const token = getToken();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    text: "Your password has been successfully reset.",
    show: false,
  });
  const onShowMsg = () => {
    setMsg({ show: true });
  };
  const onCloseMsg = () => {
    setMsg({ show: true });
  };

  const handleResetPassword = () => {
    axios
      .put(
        `http://localhost:4000/users/updatePassword/${id}`,
        { password: newPassword.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setLoading(false);
        setMsg("Password has been set successfully");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  // retrieve user data
  axios
    .get(`http://localhost:4000/users/getSingleUser/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setLoading(false);
      setUsername(response.data.username);
      setEmail(response.data.email);
      console.log(username);
      console.log(email);
    })
    .catch((error) => {
      setLoading(false);
      setError(error.response.data.message);
    });

  return (
    <div className="Profile">
      <div className="field">
        <h6>Username:</h6>
        <label>{username}</label>
      </div>
      <div className="field">
        <h6> Email:</h6>
        <h6>{email}</h6>
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <div className="sub-form">
        <label htmlFor="password">New password</label>
        <input type="password" {...newPassword} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <div className="changepwd-button">
        <input
          type="button"
          value={loading ? "Loading..." : "Reset password"}
          onClick={handleResetPassword}
          disabled={loading}
        />
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

export default Profile;
