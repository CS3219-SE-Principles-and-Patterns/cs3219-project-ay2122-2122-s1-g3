import "../Style/roomStyle.scss";
import { QuestionSection } from "../Room/questionSection";
import React, { useState } from "react";
import { getUser, removeUserSession } from "../Utils/Common";
import { CodeSection } from "../Room/codeSection";

export const Room = (props) => {
  const { qn_num, roomId, difficulty } = props.location.state;
  const [videoSocket, setVideoSocket] = useState(null)
  const handleExit = () => {
    removeUserSession();
    if (videoSocket) {
      videoSocket.disconnect()
    }
    props.history.replace("/login");
  };
  return (
    <div className="Room">
      <QuestionSection
        qn_num={qn_num}
        roomId={roomId}
        difficulty={difficulty}
        setVideoSocket={setVideoSocket}
      />
      <CodeSection roomId={roomId} handleExit={handleExit} />
    </div>
  );
};
