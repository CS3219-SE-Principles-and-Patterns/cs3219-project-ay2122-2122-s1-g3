import "./codeSectionStyle.scss";
import { Editor } from "./editor";

export const CodeSection = () => {
  return (
    <div className="CodeSection">
      <div className="codeHeader">
        <div className="nextButtonWrapper">
          <button>Exit</button>
        </div>
        <div className="questionTitle">Your Code</div>
      </div>
      <Editor />
    </div>
  );
};
