import "../Style/roomStyle.scss";
import { QuestionSection } from "../Room/questionSection";
import { getUser, removeUserSession } from "../Utils/Common";
import { CodeSection } from "../Room/codeSection";

export const Room = (props) => {
  const { qn_num, roomId, difficulty } = props.location.state;
  const handleExit = () => {
    removeUserSession();
    props.history.replace("/login");
  };
  return (
    <div className="Room">
      <QuestionSection
        qn_num={qn_num}
        roomId={roomId}
        difficulty={difficulty}
      />
      <CodeSection roomId={roomId} handleExit={handleExit} />
    </div>
  );
};
