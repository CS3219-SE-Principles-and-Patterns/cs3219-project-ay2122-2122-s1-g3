import "./questionSectionStyle.scss";
import { Video } from "./video";
import questions from "../Utils/Questions";
export const QuestionSection = (props) => {
  let {qn_num, roomId, difficulty} = props
  difficulty = difficulty === "0" ? "easy" : difficulty === "1" ? "medium" : "hard"
  qn_num = parseInt(qn_num) % questions[difficulty].length
  const {title, body} = questions[difficulty][qn_num]
  return (
    <div className="QuestionSection">
      <div className="questionPortion">
        <div className="questionHeader">
          <div className="nextButtonWrapper">
            <span>Python</span>
            <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
          </div>
          <h3 className="questionTitle">{title}</h3>
        </div>
        <div className="questionBody">
          <h6 className="questionDescription">
            {body}
          </h6>
        </div>
      </div>
      <Video roomId={roomId} />
    </div>
  );
};
