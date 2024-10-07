import GooberGroup from "./GooberGroup";

function GameOver(props) {
    return (
        <div className="game-over">
            <h1>GAME OVER</h1>
            <GooberGroup goobers={props.population} dead mini hideTooltip />
            <p>All the poor goobers have perished</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
        </div >
    );
}

export default GameOver;
