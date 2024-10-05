function Hand(props) {
    return (
        <div>
            HAND:
            {props.hand.map(x => (
                <div key={x.name}>
                    {x.name} ({x.klass})
                    <button onClick={() => props.onClick(x)}>Toggle</button>
                </div>
            ))}
        </div>
    );
}

export default Hand;
