import GooberTooltip from "./GooberTooltip"

function GooberGroup(props) {
    let className = "goober tooltip-container"
    if (props.onClick) {
        className += " selectable"
    }
    if (props.mini) {
        className += " mini"
    }
    if (props.bounce) {
        className += " bounce"
    }
    if (props.popIn) {
        className += " pop-in"
    }

    return (
        <div className="goober-group">
            {props.goobers.map(x => (
                <div
                    className={className}
                    key={x.name + (!props.bounce ? Math.random() : '')}
                    onClick={() => props.onClick && props.onClick(x)}>
                    {!props.hideTooltip && <GooberTooltip goober={x} showDescription={!props.mini} />}
                    <img className={`goober-image ${props.dead ? "dead" : ''}`} src={`assets/${x.klass}.png`} alt="goober" />
                    {!props.mini && <div>{x.name}</div>}
                </div>
            ))
            }
        </div >
    );
}

export default GooberGroup;
