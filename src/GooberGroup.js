
function GooberGroup(props) {
    return (
        <div className="goober-group">
            {props.goobers.map(x => (
                <div
                    className={"goober" + (props.onClick ? " selectable" : "")}
                    key={x.name}
                    onClick={() => props.onClick && props.onClick(x)}>
                    {x.name} ({x.klass})
                </div>
            ))}
        </div>
    );
}

export default GooberGroup;
