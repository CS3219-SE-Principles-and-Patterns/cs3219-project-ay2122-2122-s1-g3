import "../Style/roomStyle.scss"
import {QuestionSection} from "../Room/questionSection"
import {CodeSection} from "../Room/codeSection"

// TODO: Need the details of the partner as props
// partnerVideoSocketID
// roomID
export const Room = () => {
    return (
        <div className="Room">
            <QuestionSection />
            <CodeSection />
        </div>
    )
}