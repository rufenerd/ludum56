import React, { useState } from 'react';
import GooberGroup from './GooberGroup';

function Results(props) {
    const [resultsIndex, setResultsIndex] = useState(0);
    const { results, onFinish } = props

    if (resultsIndex >= results.length) {
        onFinish()
        return <div />
    }

    const result = results[resultsIndex]

    let title = result.type
    let message = JSON.stringify(result, null, 2)
    let extra = <div></div>
    let dead = false
    switch (result.type) {
        case "food":
            title = "Food!"
            message = "Braving the elements, some food was retrieved!"
            extra = <div className="title">{result.gainedFood}</div>
            break;
        case "birth":
            title = "Birth!"
            message = "These parents produced offspring!"
            extra = <GooberGroup goobers={result.offspring} hideTooltip={true}></GooberGroup>
            break;
        case "failedBirth":
            title = "Hmm..."
            message = "Fun was had, but no offspring was produced."
            break;
        case "death":
            title = "RIP"
            message = `These brave souls have perished adventuring to ${result.targetZone.name}`
            dead = true
            break;
        case 'unlockedZone':
            title = "Discovery!"
            message = `These fine adventurers have discovered a new zone.`
            extra = <div className="title">{result.zone.name}</div>
            break;
        case 'unlockedRoom':
            title = "Major Discovery!"
            message = `These fine adventurers have discovered an entire new area!`
            break;
        case 'failedUnlockZone':
            title = "Failed!"
            message = `These adventurers were unable to discover anything.`
            break;
        case 'savingDoctors':
            title = "Saved!"
            message = 'These doctors prevented the following deaths!'
            extra = <GooberGroup goobers={result.savedGoobers} hideTooltip={true}></GooberGroup>
    }

    return (
        <div className='results'>
            <div className="title">{title}</div>
            <div className="message">{message}</div>
            {result.goobers && <GooberGroup goobers={result.goobers} dead={dead} hideTooltip={true} />}
            {extra}
            <button className="big" onClick={() => setResultsIndex(resultsIndex + 1)}>OK</button>
        </div>
    );
}

export default Results;
