import "./roomStyle.scss"
import {QuestionSection} from "./questionSection"
import {CodeSection} from "./codeSection"

export const Room = () => {
    return (
        <div className="Room">
            <h1>ROOM</h1>
            <QuestionSection />
            <CodeSection />
        </div>
    )
}