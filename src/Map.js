import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch'
import ZoneTooltip from './ZoneTooltip'
import { rooms } from './rooms';

function Map(props) {
    const { zones, onZoneClick, unlockedRooms } = props

    return (
        <TransformWrapper
            initialScale={0.1}
            minScale={0.1}
            maxScale={2}
            limitToBounds={false}
            panning={{disabled: false }}
        >
            <TransformComponent >
                <div className="map">
                    <div className="zones">
                        {zones.filter(z => unlockedRooms.includes(z.room) && !(z.unlocksRoom && z.unlocked)).map(zone => (
                            <div className="zone tooltip-container" key={zone.name} onClick={() => onZoneClick(zone)} style={{
                                position: 'absolute',
                                zIndex: 999,
                                top: `${zone.y || 500 * Math.random()}px`,
                                left: `${zone.x || 500 * Math.random()}px`,
                            }}>
                                <ZoneTooltip zone={zone} />
                            </div>
                        ))}
                    </div>
                    <div className="map-container">
                        <div className="map">
                            {rooms.filter(room => true || unlockedRooms.includes(room.name)).map(room => {
                                return <img key={room.name} src={`assets/room_${room.name}.png`} className="room" alt={room.name} style={{ left: room.x, top: room.y }} />
                            })}
                        </div>
                    </div>
                </div >
            </TransformComponent>
        </TransformWrapper>
    );
}

export default Map;
