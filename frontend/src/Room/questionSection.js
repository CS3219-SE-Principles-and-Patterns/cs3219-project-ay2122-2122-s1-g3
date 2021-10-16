import "./questionSectionStyle.scss"
import {Video} from "./video"
import {Button} from "react-bootstrap"
export const QuestionSection = () => {
    return (
        <div className="QuestionSection">
            <div className="questionPortion">
                <div className="questionHeader">
                    <div className="nextButtonWrapper">
                        <Button className="nextButton" variant="outline-dark">
                            Next Question
                        </Button>
                    </div>
                    <h3 className="questionTitle">
                        Single Threaded CPU
                    </h3>
                </div>
                <div className="questionBody">
                    <h6 className="questionDescription">
                    You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.
                    </h6>
                </div>
            </div>
            <Video />
        </div>
    )
}