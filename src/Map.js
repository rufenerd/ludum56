import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ZoneTooltip from './ZoneTooltip'
import { rooms } from './rooms';
import React, { useState } from 'react';
import GooberGroup from './GooberGroup';

function Map(props) {
    const { zones, onZoneClick, unlockedRooms, team } = props
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);

    const onZoneCircleClick = (zone) => {
        setSelectedZone(zone)
        setShowConfirmation(true)
    }

    const onCancelClick = () => {
        setSelectedZone(null)
        setShowConfirmation(false)
    }

    return (
        <TransformWrapper
            initialScale={0.1}
            minScale={0.1}
            maxScale={2}
            limitToBounds={false}
            panning={{ disabled: false }}
        >
            <TransformComponent >
                <div className="map">
                    <div className="zones">
                        {zones.filter(z => unlockedRooms.includes(z.room) && !(z.unlocksRoom && z.unlocked)).map(zone => (
                            <div className="zone tooltip-container" key={zone.name} onClick={() => onZoneCircleClick(zone)} style={{
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
            {showConfirmation && <div className='expedition-confirmation-bar'>
                <GooberGroup goobers={team} bounce={true} />
                <div className='expedition-confirmation'>
                    <div>Send these Goobers to {selectedZone.name}?</div>
                    <button onClick={onCancelClick}>
                        Cancel
                    </button>
                    <button onClick={() => onZoneClick(selectedZone)}>
                        Confirm
                    </button>
                </div>
            </div>}
        </TransformWrapper>
    );
}

export default Map;
