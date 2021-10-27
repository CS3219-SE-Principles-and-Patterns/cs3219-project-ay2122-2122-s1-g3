import React, { useState } from "react";
import axios from "axios";
import { getUser, getToken } from "../Utils/Common";
import "../Style/Profile.scss";

function Profile(props) {
  const newPassword = useFormInput("");
  const confirmPassword = useFormInput("");
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
    if (newPassword.value !== confirmPassword.value) {
      setError("Password does not match.");
      return;
    }
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
    })
    .catch((error) => {
      setLoading(false);
      setError(error.response.data.message);
    });

  return (
    <div className="Profile">
      <div className="field">
        <h6>Username: </h6>
        <h6>{username}</h6>
      </div>
      <div className="field">
        <h6>Email: </h6>
        <h6>{email}</h6>
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <table>
        <tr>
          <td>
            <label htmlFor="password">New password</label>
          </td>
          <td>
            <input
              type="password"
              {...newPassword}
              autoComplete="new-password"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="confirm-password">Confirm Password</label>
          </td>
          <td>
            <input
              type="password"
              {...confirmPassword}
              autoComplete="new-password"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div></div>
          </td>
          <td>
            <div className="resetpwd-button">
              <input
                type="button"
                value={loading ? "Loading..." : "Reset password"}
                onClick={handleResetPassword}
                disabled={loading}
              />
            </div>
          </td>
        </tr>
      </table>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
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
