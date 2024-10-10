import GooberTooltip from "./GooberTooltip"

function GooberGroup(props) {
    const mini = props.mini || props.goobers.length > 10
    let className = "goober tooltip-container"
    if (props.onClick) {
        className += " selectable"
    }
    if (mini) {
        className += " mini"
    }
    if (props.bounce) {
        className += " bounce"
    } else if (props.wave) {
        className += " slow-wave"
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
                    {!props.hideTooltip && <GooberTooltip goober={x} showDescription={!mini} />}
                    <img className={`goober-image ${props.dead ? "dead" : ''}`} src={`assets/${x.klass}.png`} alt="goober" />
                    {!mini && <div>{x.name}</div>}
                </div>
            ))
            }
        </div >
    );
}

export default GooberGroup;
