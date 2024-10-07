import GooberGroup from "./GooberGroup";

function GameWin(props) {
    return (
        <div className="game-over game-win" style={{
            backgroundImage: 'url(assets/win.jpg)',
            backgroundSize: 'cover',
        }}>
            <h1 className="textborder">you win!</h1>
            <GooberGroup goobers={props.state.population} mini hideTooltip />
            <p className="textborder">These Goobers have escaped to freedom!</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
        </div >
    );
}

export default GameWin;
