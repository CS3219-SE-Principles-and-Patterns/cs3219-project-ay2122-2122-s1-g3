import "./videoStyle.scss";
export const Video = () => {
  return (
    <div className="Video">
      <div className="leftButtons">
        <div className="videoButton">
          <input
            type="button"
            value="Video"
          />
        </div>
        <div className="microphoneButton">
          <input
            type="button"
            value="Microphone"
          />
        </div>
      </div>
      <div className="cameraFeed">Rollrollfaraway video</div>
      <div className="rightButtons">
        <div className="smileyButton">
          <input
            type="button"
            value="Smiley"
          />
        </div>
      </div>
    </div>
  );
};
