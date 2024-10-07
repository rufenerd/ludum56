import GooberGroup from "./GooberGroup";

function GameOver(props) {
    return (
        <div className="game-over">
            <h1>GAME OVER</h1>
            <GooberGroup goobers={props.state.population} dead mini hideTooltip />
            <p>All the poor goobers have perished {props.state.food <= 0 && "due to starvation"}</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
        </div >
    );
}

export default GameOver;
