import "../Style/roomStyle.scss"
import {QuestionSection} from "../Room/questionSection"
import {CodeSection} from "../Room/codeSection"

export const Room = () => {
    return (
        <div className="Room">
            <QuestionSection />
            <CodeSection />
        </div>
    )
}