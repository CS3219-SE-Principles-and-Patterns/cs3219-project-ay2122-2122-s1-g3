import "./codeSectionStyle.scss"
import {Editor} from "./editor"
import {Terminal} from "./terminal"
import {Button} from "react-bootstrap"

export const CodeSection = () => {
    return (
        <div className="CodeSection">
            <div className="codeHeader">
                <div className="nextButtonWrapper">
                        <Button className="nextButton" variant="danger">
                            Exit
                        </Button>
                </div>
                <h3 className="questionTitle">
                    Your Code
                </h3>
            </div>

            <Editor />
            <h5 className="terminalHeader">
                Standard Output
            </h5>
            <Terminal />
        </div>
    )
}