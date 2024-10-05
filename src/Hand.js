import GooberGroup from "./GooberGroup";

function Hand(props) {
    return (
        <div className="hand">
            HAND:
            <GooberGroup goobers={props.hand} onClick={(x) => props.onClick(x)} />
        </div>
    );
}

export default Hand;
