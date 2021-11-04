import "./codeSectionStyle.scss";
import { getUser, removeUserSession } from "../Utils/Common";
import { Editor } from "./editor";

export const CodeSection = (props) => {
  const {handleExit} = props
  return (
    <div className="CodeSection">
      <Editor roomId={props.roomId} handleExit={handleExit}/>
    </div>
  );
};
