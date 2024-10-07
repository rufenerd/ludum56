import React, { useEffect, useState } from 'react';
import GooberGroup from './GooberGroup';
import useSound from 'use-sound';

import winSound from './sound/winm.wav';
import deathSound from './sound/deathm.wav';

function Results(props) {
    const [resultsIndex, setResultsIndex] = useState(0);
    const { results, onFinish } = props
    const [ playWin ] = useSound(winSound)
    const [ playDeath ] = useSound(deathSound)

    if (resultsIndex >= results.length) {
        onFinish()
        return <div />
    }

    const result = results[resultsIndex]

    let title = result.type
    let message = JSON.stringify(result, null, 2)
    let extra = <div></div>
    let dead = false
    let mini = false
    switch (result.type) {
        case "food":
            playWin()
            title = "Food!"
            message = "Braving the elements, some food was retrieved!"
            extra = <div className="title">{result.gainedFood}</div>
            break;
        case "birth":
            playWin()
            title = "Food!"
            title = "Birth!"
            message = "These parents produced offspring!"
            extra = <GooberGroup goobers={result.offspring}></GooberGroup>
            break;
        case "failedBirth":
            title = "Hmm..."
            message = "Fun was had, but no offspring was produced."
            break;
        case "death":
            playDeath()
            title = "RIP"
            message = `These brave souls have perished adventuring to ${result.targetZone.name}`
            dead = true
            break;
        case 'unlockedZone':
            playWin()
            title = "Food!"
            title = "Discovery!"
            message = `These fine adventurers have discovered a new zone.`
            extra = <div className="title">{result.zone.name}</div>
            break;
        case 'unlockedRoom':
            playWin()
            title = "Food!"
            title = "Major Discovery!"
            message = `These fine adventurers have discovered an entire new area! Check the map your next adventure!`
            break;
        case 'failedUnlockZone':
            playDeath()
            title = "Failed!"
            message = `These adventurers were unable to discover anything.`
            break;
        case 'savingDoctors':
            title = "Saved!"
            message = 'These doctors prevented the following deaths!'
            extra = <GooberGroup goobers={result.savedGoobers}></GooberGroup>
            break;
        case 'consume':
            title = "Food Consumed"
            message = `This population of goobers ate ${result.consumed} food!`
            mini = true
            extra = <div className='title'>You have {result.newFood} remaining!</div>
            break;
    }

    return (
        <div className='results'>
            <div className="title">{title}</div>
            <div className="message">{message}</div>
            {result.goobers && <GooberGroup goobers={result.goobers} dead={dead} mini={mini} />}
            {extra}
            <button className="big" onClick={() => setResultsIndex(resultsIndex + 1)}>OK</button>
        </div>
    );
}

export default Results;
