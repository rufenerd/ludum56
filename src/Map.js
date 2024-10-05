import { useState } from 'react';

function Map(props) {
    const { zones, onZoneClick, unlockedRooms } = props

    const [scale, setScale] = useState(1);
    const handleWheel = (e) => {
        if (e.ctrlKey) { // Detect pinch-to-zoom gesture on mobile
            e.preventDefault();
            let newScale = scale - e.deltaY * 0.01;
            newScale = Math.min(Math.max(.5, newScale), 3); // Clamp scale between 0.5x and 3x
            setScale(newScale);
        }
    };


    return (
        <div className="map">
            <div className="zones">
                {unlockedRooms.join(", ")}
                {zones.filter(z => unlockedRooms.includes(z.room)).map(zone => (
                    <button key={zone.name} onClick={() => onZoneClick(zone)}>
                        {zone.name}
                    </button>
                ))}
            </div>
            <div className="map-container" onWheel={handleWheel}>
                <div className="map" style={{ transform: `scale(${scale})` }}>
                    {unlockedRooms.includes(1) && <img src="assets/room_1.webp" className="room" alt="Room 1" style={{ top: '0', left: '0px' }} />}
                    {unlockedRooms.includes(2) && <img src="assets/room_2.webp" className="room" alt="Room 2" style={{ top: '0', left: '926px' }} />}
                </div>
            </div>
        </div>
    );
}

export default Map;
