import React, { useState } from "react";
import axios from "axios";
import { getUser, getToken, removeUserSession } from "../Utils/Common";
import "../Style/Profile.scss";
import Popup from "reactjs-popup";
import avatar from "./avatar.png";
import validator from "validator";

function Profile(props) {
  const newPassword = useFormInput("");
  const confirmPassword = useFormInput("");
  const user = getUser();
  const id = user.id;
  const token = getToken();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [msg, setMsg] = useState(null);
  const [closePopup, setClosePopup] = useState(false);

  const handleResetPassword = () => {
    if (newPassword.value !== confirmPassword.value) {
      setError("Password does not match.");
      return;
    }
    if (newPassword.value === "") {
      setError("Password cannot be empty.");
      return;
    }
    if (
      !validator.isStrongPassword(newPassword.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setError(
        "Password must consist at least 8 characters, with 1 lowercase, 1 uppercase, 1 number and 1 symbol."
      );
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
        setMsg("Password reset is successful");
        setClosePopup(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  // retrieve user data
  axios
    .get(`http://localhost:4000/users/getSingleUser/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setUsername(response.data.username);
      setEmail(response.data.email);
    })
    .catch((error) => {
      setError(error.response.data.message);
    });

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  // handle click event of home button
  const handleProfile = () => {
    props.history.push("/home");
  };

  return (
    <div className="profile">
      <div className="buttons">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleProfile}>Home</button>
      </div>
      <img src={avatar} alt="avatar" width="70" />

      <div className="field">
        <table className="table">
          <tr>
            <td>
              <div>Username:</div>
            </td>
            <td>
              <div>{username}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Email:</div>
            </td>
            <td>
              <div>{email}</div>
            </td>
          </tr>
        </table>
      </div>
      <div className="popup">
        <Popup
          trigger={<button className="reset-button"> Reset password </button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <div className="header"> Reset Password </div>
              <table className="box">
                <tbody className="tablebody">
                  <tr className="tablerow">
                    <td>
                      <label htmlFor="password">New password</label>
                    </td>
                    <td className="tabledata">
                      <input
                        className="input"
                        type="password"
                        {...newPassword}
                        autoComplete="new-password"
                      />
                    </td>
                  </tr>
                  <tr className="tablerow">
                    <td>
                      <label htmlFor="confirm-password">
                        Confirm Password{" "}
                      </label>
                    </td>
                    <td className="tabledata">
                      <input
                        className="input"
                        type="password"
                        {...confirmPassword}
                        autoComplete="new-password"
                      />
                    </td>
                  </tr>
                  <tr className="tablerow">
                    <td></td>
                    <td className="tabledata">
                      <div className="msg">
                        {error && (
                          <>
                            <small style={{ color: "red" }}>{error}</small>
                            <br />
                          </>
                        )}
                        {msg && (
                          <>
                            <small style={{ color: "green" }}>{msg}</small>
                            <br />
                          </>
                        )}
                      </div>
                      <div>
                        <input
                          className="cfm-button"
                          type="button"
                          value={closePopup ? "Close" : "Reset"}
                          onClick={() => {
                            handleResetPassword();
                            if (closePopup) {
                              close();
                              window.location.reload();
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Popup>
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
