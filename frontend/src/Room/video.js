import "./videoStyle.scss";
import { FaVideo, FaMicrophone, FaRegLaugh } from "react-icons/fa";
export const Video = () => {
  return (
    <div className="Video">
      <div className="leftButtons">
        <button className="videoButton">
          <FaVideo />
        </button>
        <button className="microhphoneButton">
          <FaMicrophone />
        </button>
      </div>
      <div className="cameraFeed">Your video</div>
      <div className="cameraFeed">Rollrollfaraway video</div>
      <div className="rightButtons">
        <button className="smileyButton">
          <FaRegLaugh />
        </button>
      </div>
    </div>
  );
};
