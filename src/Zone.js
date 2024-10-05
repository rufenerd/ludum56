import { zones } from "./zones";

function Stats(props) {
    const { zone } = props
    if (!zone.unlocked) {
        return <div className='zone-tooltip'>
            <div className="zone-title">???</div>
        </div>
    }
    return (
        <div className='zone-tooltip'>
            <div className="zone-title">{zone.name}</div>
            <div>{`Risk level: ${zone.risk}`}</div>
            <div>{`Remaining food: ${zone.remaining}`}</div>
        </div>
    );
}

export default Stats;
