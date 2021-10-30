import React, { useState } from "react";
import { getUser, removeUserSession } from "../Utils/Common";

import "../Style/homeStyle.scss";

function Home(props) {
  const difficulty = useFormInput("Easy");
  const category = useFormInput("Array");
  const language = useFormInput("Python");
  const user = getUser();

  // handle submission of form
  const handleSubmit = (e) => {
    props.history.push("/room");
    e.preventDefault();
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
          <select {...difficulty}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>
          <label>Category</label>
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
          </select>
          <label>Language</label>
          <select {...language}>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
          </select>
          <button type="submit" value="Submit">
            Let's go
          </button>
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


// INSTRUCTIONS FOR USING MATHCMAKING

// localhost: 8099

// 1. Send /update 
//   => this removes id from queue if inside, otherwise does nothing

// 2. Send /start
//   => this adds current id and difficulty to the queue

//   - Call once at the start of matchmaking

// 3. Send /status
//   => this retrieves the status of whether a match has been found or not

//   - Call this continously until the failure message not returned OR timeout expired

// 4. Send /update 
  
//   - To reset queue again before leaving