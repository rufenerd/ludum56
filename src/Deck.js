import GooberGroup from "./GooberGroup";

function Deck(props) {
    const { population } = props
    return (
        <div className="deck">
            <div className="deck-title">{`Population (${population.length})`}</div>
            <GooberGroup goobers={population} mini={true} />
        </div>
    );
}

export default Deck;
