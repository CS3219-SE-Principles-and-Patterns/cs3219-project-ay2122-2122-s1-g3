import React, { useState, useEffect } from "react";
import { getUser, removeUserSession } from "../Utils/Common";
import axios from "axios";
import "../Style/homeStyle.scss";

function Home(props) {
  //const category = useFormInput("Array");
  //const language = useFormInput("py");
  const difficulty = useFormInput("0");
  const user = getUser();
  const [tryAgain, setTryAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  //TODO: Not sure how to get id/jwt token of user
  //TODO: keep random userId?
  const userId = Math.floor(Math.random() * 10000).toString();
  const seconds = new Date().getSeconds()
  const handleSubmit = async (e) => {
    let meetingId;
    let qn_num;
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Send /update
      //   => this removes id from queue if inside, otherwise does nothing
      await axios
        .post(
          "http://localhost:8099/update",
          { id: userId, difficulty: difficulty.value},
          {
            headers: {
              // include real jwt token
              "Authorization": "Bearer xxxxxxxxxxxxxxxxxxx",
              "Content-Type": "application/json",
            },
          }
        );
      // 2. Send /start
      //   => this adds current id and difficulty to the queue
      //   - Call once at the start of matchmaking
      const body = { id: userId, difficulty: difficulty.value};
      await axios
        .post("http://localhost:8099/start", body, {
          headers: {
            // include real jwt token
            Authorization: "Bearer xxxxxxxxxxxxxxxxxxx",
            "Content-Type": "application/json",
          },
        });

      // 3. Send /status
      //   => this retrieves the status of whether a match has been found or not
      //   - Call this continously until the failure message not returned OR timeout expired
      let foundMatch = false;
      for (let i = 0; i < 10; i++) {
        if (foundMatch) {
          break;
        }
        let res = await axios.post("http://localhost:8099/status", {
          id: userId,
          difficulty: difficulty.value,
        }, {
          headers: {
            // include real jwt token
            Authorization: "Bearer xxxxxxxxxxxxxxxxxxx",
            "Content-Type": "application/json",
          },
        });
        if (res.data.response === "A match was found") {
          //Need meeting id and QUESTION TO DO
          meetingId = res.data.meeting_id;
          qn_num = res.data.qn_num;
          foundMatch = true;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      // 4. Send /update
      //   - To reset queue again before leaving
      await axios.post("http://localhost:8099/update", { id: userId, difficulty: difficulty.value}, {
        headers: {
          // include real jwt token
          Authorization: "Bearer xxxxxxxxxxxxxxxxxxx",
          "Content-Type": "application/json",
        },
      })

      if (foundMatch) {
        // push all the relevant data into room
        props.history.push({
          pathname: '/room',
          state: {
            roomId: meetingId,
            qn_num: qn_num,
            difficulty: difficulty.value
          }
      });
      } else {
        setTryAgain(true);
      }
    } catch (response) {
      console.log(response);
    } finally{
      setLoading(false);
    }
  };

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  // handle click event of profile button
  const handleProfile = () => {
    props.history.push("/profile");
  };

  return (
    <div className="Home">
      <div className="homeHeader">
        <div className="buttons">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleProfile}>Profile</button>
        </div>
        <div className="brandName">PeerPrep</div>
      </div>
      <div className="homeBody">
        <form onSubmit={handleSubmit}>
          <label>Difficulty</label>
          {!loading && (
            <select {...difficulty}>
              <option value="0">Easy</option>
              <option value="1">Medium</option>
              <option value="2">Difficult</option>
            </select>
          )}

          {/* <label>Category</label>
          <select {...category}>
            <option value="Array">Array</option>
            <option value="Binary">Binary</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Graph">Graph</option>
            <option value="Heap">Heap</option>
            <option value="Interval">Interval</option>
            <option value="Linked List">Linked List</option>
            <option value="Matrix">Matrix</option>
            <option value="String">String</option>
            <option value="Tree">Tree</option>
            <option value="Recursion">Recursion</option>
          </select> */}
          {/* <label>Language</label>
          <select {...language}>
            <option value="py">Python</option>
            <option value="cpp">C++</option>
          </select> */}
          {tryAgain && <div className="tryAgain">Please try again!</div>}
          {loading ? (
            <div className="loading">Finding your match</div>
          ) : (
            <button type="submit" value="Submit">
              Let's go
            </button>
          )}
        </form>
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

export default Home;
