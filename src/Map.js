import { TransformWrapper, TransformComponent, useControls, useTransformEffect } from 'react-zoom-pan-pinch'
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

function MapControls() {
    const { zoomIn, zoomOut, resetTransform } = useControls()
    useTransformEffect(({ state }) => {
        console.log(state)
    })


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
                            {rooms.filter(room => unlockedRooms.includes(room.name)).map(room => {
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
