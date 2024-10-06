function ZoneTooltip(props) {
    const { zone } = props
    if (!zone.unlocked) {
        return <div className='zone-tooltip'>
            <div className="zone-title">???</div>
            <div>{`Requires: ${zone.requires}`}</div>
        </div>
    }
    return (
        <div className='zone-tooltip'>
            <div className="zone-title">{zone.name}</div>
            <div>{`Risk level: ${zone.risk}`}</div>
            <div>{`Remaining food: ${zone.remaining}`}</div>
            {zone.boutry > 1 && <div>{`Food Multiplier: ${zone.bountry}x`}</div>}
        </div>
    );
}

export default ZoneTooltip;
