import React, { useState } from "react";
import axios from "axios";
import { getUser } from "../Utils/Common";

function Profile(props) {
  var username = "";
  var email = "";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // retrieve user data
  const getUserData = () => {
    axios
      .get("", {
        params: {
          username: getUser.username,
        },
      })
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
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong.");
      });
  };

  return <div className="Profile"></div>;
}
export default Profile;
