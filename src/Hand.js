import GooberGroup from "./GooberGroup";

function Hand(props) {
    return (
        <div className="hand">
            <GooberGroup goobers={props.hand} popIn={props.popIn} wave={true} onClick={(x) => props.onClick(x)} />
        </div>
    );
}

export default Hand;
