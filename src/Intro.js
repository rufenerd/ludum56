function Intro(props) {
    return (
        <div className="intro" style={{
            backgroundImage: 'url(assets/main_menu.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
        }}>
            <h1>Goobers!</h1>
            <p>The escape from Laboratory 8</p>
            <button onClick={props.onClick}>Start Game</button>
        </div >
    );
}

export default Intro;
