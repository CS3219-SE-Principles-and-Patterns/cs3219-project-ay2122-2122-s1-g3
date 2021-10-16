import "./videoStyle.scss"
export const Video = () => {
    return (
        <div className="Video">
            <div className="leftButtons">
                <button type="button" className="btn">
                    Video
                </button>
                <button type="button" className="btn">
                    Microphone
                </button>
            </div>
            <div className="cameraFeed">
                Rollrollfaraway video
            </div>
            <div className="rightButtons">
                <button type="button" className="btn">
                    Smiley
                </button>
            </div>
        </div>
    )
}