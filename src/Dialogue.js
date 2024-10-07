import {useState} from "react";

function Dialogue(props) {
    const lines = props.lines
    const [ lineNum, setLineNum ] = useState(0)

    if (lineNum >= lines.length) {
        if (props.onFinish) {
            props.onFinish()
        }
        return <div className="dialogue">
        </div>
    }

    const line = lines[lineNum]

    return (
        <div className="dialogue" onClick={() => setLineNum(lineNum + 1)}>
            {line.img && <img src={line.img} />}
            <p>{line.text}</p>
            <small>Click to continue...</small>
        </div>
    );
}

export default Dialogue;
