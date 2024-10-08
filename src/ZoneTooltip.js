import React, { useState } from "react"
import { useTransformEffect } from "react-zoom-pan-pinch"
import { makeOneOfKlass } from "./classes"
import GooberGroup from "./GooberGroup"

function ZoneTooltip(props) {
    const { zone } = props
    const [scale, setScale] = useState(0.5)

    useTransformEffect(({ state }) => {
        setScale(state.scale)
    })

    const hasRequirements = zone.requires && zone.requires.length > 0
    const exampleRequiresGoobers = hasRequirements ? zone.requires.map(x => makeOneOfKlass("", x)) : []

    if (!zone.unlocked) {
        return (<div className="tooltip zone-tooltip" style={{
            transform: `scale(${Math.max(1 / scale, 1)})`,
        }}>
            <div className="zone-title">{zone.name}</div>
            <div>{`Risk level: ${zone.risk}`}</div>
            {hasRequirements && <div>Requires: {zone.requires.join(" and ")}</div>}
            {(zone.requiresText || hasRequirements) && (zone.requiresText || <GooberGroup goobers={exampleRequiresGoobers} mini={true} hideTooltip={true} />)}
        </div>)
    }
    return (
        <div className="tooltip zone-tooltip" style={{
            transform: `scale(${Math.max(1 / scale, 1)})`,
        }}>
            <div className="zone-title">{zone.name}</div>
            <div>{`Risk level: ${zone.risk}`}</div>
            <div>{`Remaining food: ${zone.remaining}`}</div>
            {zone.bounty > 1 && <div>{`Food Multiplier: ${zone.bounty}x`}</div>}
        </div>
    );
}

export default ZoneTooltip;
