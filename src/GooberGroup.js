
function GooberGroup(props) {
    return (
        <div className="goober-group">
            {props.goobers.map(x => (
                <div
                    className={"goober" + (props.onClick ? " selectable" : "")}
                    key={x.name}
                    onClick={() => props.onClick && props.onClick(x)}>
                    <img className="goober-image" src={`assets/${x.klass}.webp`} alt="goober" />
                    <div>{x.name}</div>
                    <div>({x.klass})</div>
                </div>
            ))}
        </div>
    );
}

export default GooberGroup;
