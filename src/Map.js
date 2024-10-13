import { TransformWrapper, TransformComponent, useControls, useTransformEffect } from 'react-zoom-pan-pinch'
import ZoneTooltip from './ZoneTooltip'
import { rooms } from './rooms';
import { canUnlock } from './zones';
import React, { useState } from 'react';
import GooberGroup from './GooberGroup';

function getZoneColor(zone, team) {
    if (!zone.unlocked && !canUnlock(zone, team)) {
        return "#cfcfcf"
    }

    if (zone.remaining <= 0 && zone.unlocked) {
        return "#cfcfcf"
    }

    if (zone.risk == 0) {
        return "#00ff44"
    }

    if (zone.risk == 1) {
        return "#b7ff00"
    }

    if (zone.risk == 2) {
        return "#fff019"
    }

    if (zone.risk == 3) {
        return "#ffa200"
    }

    if (zone.risk >= 4) {
        return "#f56464"
    }

    return "#cfcfcf"
}

function MapControls() {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return <div className="map-tools">
        <button onClick={() => resetTransform()}>recenter</button>
    </div>
}

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
            initialScale={0.5}
            initialPositionX={-3700}
            initialPositionY={30}
            minScale={0.1}
            maxScale={2}
            wheel={{ step: 0.1 }}
            limitToBounds={false}
            panning={{ disabled: false }}
        >
            <MapControls />
            <TransformComponent >
                <div className="map">
                    <div className="zones">
                        {zones.filter(z => unlockedRooms.includes(z.room) && !(unlockedRooms.includes(z.unlocksRoom))).map(zone => (
                            <div className="tooltip-container" key={zone.name} onClick={() => onZoneCircleClick(zone)} style={{
                                position: 'absolute',
                                zIndex: 999,
                                top: `${zone.y}px`,
                                left: `${zone.x}px`,
                            }}>
                                <div className="zone" style={{
                                    opacity: 0.65,
                                    backgroundColor: getZoneColor(zone, team),
                                }}>
                                </div>
                                <ZoneTooltip zone={zone} />
                            </div>
                        ))}
                    </div>
                    <div className="map-container">
                        <div className="map">
                            {rooms.filter(room => unlockedRooms.includes(room.name)).map(room => {
                                return <img key={room.name} src={`assets/room_${room.name}.png`} className="room" alt={room.name} style={{ left: room.x, top: room.y }} />
                            })}
                        </div>
                    </div>
                </div >
            </TransformComponent>
            <div className='expedition-confirmation-bar'>
                <div className="adventurers">
                    click a location for your goobers to gather food or explore
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
