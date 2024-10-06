import GooberGroup from "./GooberGroup";

function Deck(props) {
    return (
        <div className="deck">
            <GooberGroup goobers={props.population} mini={true} />
        </div>
    );
}

export default Deck;
