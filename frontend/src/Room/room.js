import "./roomStyle.scss"
import {QuestionSection} from "./questionSection"
import {CodeSection} from "./codeSection"

export const Room = () => {
    return (
        <div className="Room">
            <QuestionSection />
            <CodeSection />
        </div>
    )
}