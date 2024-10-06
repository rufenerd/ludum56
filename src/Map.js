import { useState, useEffect } from 'react';
import Zone from './Zone'
import { rooms } from './rooms';

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

    useEffect(() => {
        window.scrollTo(rooms[0].x, rooms[0].y)
    }, []);

    // console.log("Scrolling", rooms[0].x, rooms[0].y)
    // console.log(rooms.filter(room => unlockedRooms.includes(room.name)).map(x => x.name).join(','))

    return (
        <div className="map">
            <div className="zones">
                {zones.filter(z => unlockedRooms.includes(z.room)).map(zone => (
                    <div className="zone" key={zone.name} onClick={() => onZoneClick(zone)} style={{
                        position: 'absolute',
                        zIndex: 999,
                        top: `${zone.y || 500 * Math.random()}px`,
                        left: `${zone.x || 500 * Math.random()}px`,
                    }}>
                        <div className="tooltip">
                            <Zone zone={zone} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="map-container" onWheel={handleWheel}>
                <div className="map" style={{ transform: `scale(${scale})` }}>
                    {rooms.filter(room => unlockedRooms.includes(room.name)).map(room => {
                        return <img key={room.name} src={`assets/room_${room.name}.webp`} className="room" alt={room.name} style={{ left: room.x, top: room.y }} />
                    })}
                </div>
            </div>
        </div >
    );
}

export default Map;
