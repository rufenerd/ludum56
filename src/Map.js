import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ZoneTooltip from './ZoneTooltip'
import { rooms } from './rooms';
import React, { useState } from 'react';
import GooberGroup from './GooberGroup';

function getZoneColor(zone) {
    if (!zone.unlocked) {
        return "#646ef5"
    }

    if (zone.risk > 3) {
        return "#f56464"
    }

    if (zone.remaining > 0) {
        return "#90f564"
    }

    return "#cfcfcf"
}

const INITIAL_SCALE = 0.1

function Map(props) {
    const { zones, onZoneClick, onAdventureCancel, unlockedRooms, team } = props
    const [selectedZone, setSelectedZone] = useState(null);

    const onZoneCircleClick = (zone) => {
        setSelectedZone(zone)
    }

    const onCancelClick = () => {
        if (selectedZone) {
            setSelectedZone(null)
        } else {
            onAdventureCancel()
        }
    }

    return (
        <TransformWrapper
            initialScale={INITIAL_SCALE}
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
                                opacity: 0.66,
                                backgroundColor: getZoneColor(zone),
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
            <div className='expedition-confirmation-bar'>
                <div className="adventurers">
                    Adventurers
                    <GooberGroup goobers={team} bounce={true} />
                </div>
                <div className='expedition-confirmation'>
                    {selectedZone && <div>Send these Goobers to {selectedZone.name}?</div>}
                    <button onClick={onCancelClick}>
                        Cancel
                    </button>
                    {selectedZone && <button onClick={() => onZoneClick(selectedZone)}>
                        Confirm
                    </button>}
                </div>
            </div>
        </TransformWrapper >
    );
}

export default Map;
