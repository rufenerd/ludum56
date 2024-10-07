function ZoneTooltip(props) {
    const { zone } = props
    if (!zone.unlocked) {
        return (<div className="tooltip zone-tooltip">
            <div className="zone-title">???</div>
            <div>{`Requires: ${zone.requires}`}</div>
        </div>)
    }
    return (
        <div className="tooltip zone-tooltip">
            <div className="zone-title">{zone.name}</div>
            <div>{`Risk level: ${zone.risk}`}</div>
            <div>{`Remaining food: ${zone.remaining}`}</div>
            {zone.bounty > 10 && <div>{`Food Multiplier: ${zone.bounty / 10}x`}</div>}
        </div>
    );
}

export default ZoneTooltip;
