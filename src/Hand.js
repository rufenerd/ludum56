function Hand(props) {
    return (
        <div>
            HAND:
            {props.hand.map(x => (
                <div key={x.name} onClick={() => props.onClick(x)}>
                    {x.name} ({x.klass})
                </div>
            ))}
        </div>
    );
}

export default Hand;
