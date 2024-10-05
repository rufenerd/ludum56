function Map(props) {
    const { zones, onZoneClick, unlockedRooms } = props
    return (
        <div className="map">
            {unlockedRooms.join(", ")}
            {zones.filter(z => unlockedRooms.includes(z.room)).map(zone => (
                <button key={zone.name} onClick={() => onZoneClick(zone)}>
                    {zone.name}
                </button>
            ))}
        </div>
    );
}

export default Map;
