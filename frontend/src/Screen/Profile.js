import React, { useState } from "react";
import axios from "axios";
import { getUser, getToken } from "../Utils/Common";
import "../Style/Profile.scss";
import Popup from "reactjs-popup";

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

  return (
    <div className="profile">
      <div className="field">
        <h6>Username: </h6>
        <h6>{username}</h6>
      </div>
      <div className="field">
        <h6>Email: </h6>
        <h6>{email}</h6>
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
                    <td>
                      <div></div>
                    </td>
                    <td className="tabledata">
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
