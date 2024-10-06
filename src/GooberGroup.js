
function GooberGroup(props) {
    return (
        <div className="goober-group">
            {props.goobers.map(x => (
                <div
                    className={`goober ${(props.onClick ? " selectable" : "")}  ${props.mini ? "mini" : ''}`}
                    key={x.name}
                    onClick={() => props.onClick && props.onClick(x)}>
                    <img className={`goober-image ${props.dead ? "dead" : ''}`} src={`assets/${x.klass}.webp`} alt="goober" />
                    {!props.mini && <div>{x.name}</div>}
                    {!props.mini && <div>({x.klass})</div>}
                </div>
            ))}
        </div>
    );
}

export default GooberGroup;
