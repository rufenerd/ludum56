function Intro(props) {
    return (
        <div className="intro" style={{
            backgroundImage: 'url(assets/main_menu.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
        }}>
            <h1>Goobers!</h1>
            <p>The escape from Laboratory 8</p>
            <button onClick={() => props.onClick(false)}>Start Game</button>
            {!!localStorage.getItem("gooberGameState") && <button onClick={() => props.onClick(true)}>Continue</button>}
        </div >
    );
}

export default Intro;
