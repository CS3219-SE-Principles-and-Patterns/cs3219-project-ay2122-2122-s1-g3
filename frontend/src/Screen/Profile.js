import React, { useState } from "react";
import axios from "axios";

function Profile(props) {
  var username = "";
  var email = "";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangePasswords = () => {};

  // retrieve user data
  axios
    .get("/:id")
    .then((response) => {
      setLoading(false);

      var data = response.data.object;

      for (var i = 0; i < data.length; i++) {
        let type = data[i].content_type.toLowerCase();
        if (type === username) {
          username = data[i];
        }
        if (type === email) {
          email = data[i];
        }
      }
    })
    .catch((error) => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong.");
    });

  return (
    <div className="Profile">
      <div className="field">
        <h6>Username:</h6>
        <h6>{username}</h6>
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
      <div className="changepwd-button">
        <input
          type="button"
          value={loading ? "Loading..." : "Change password"}
          onClick={handleChangePasswords}
          disabled={loading}
        />
      </div>
    </div>
  );
}
export default Profile;
