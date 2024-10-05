
function Map(props) {
    const { zones, onZoneClick } = props
    return (
        <div>
            {zones.map(zone => (
                <button key={zone.name} onClick={() => onZoneClick(zone)}>
                    {zone.name}
                </button>
            ))}
        </div>
    );
}

export default Map;
