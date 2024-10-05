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
    switch (result.type) {
        case "food":
            title = "Food!"
            message = "Braving the elements, some food was retrieved!"
            extra = <div className="title">{result.gainedFood}</div>
            break;
        case "birth":
            title = "Birth!"
            message = "These parents produced offspring!"
            extra = <GooberGroup goobers={result.offspring}></GooberGroup>
            break;
        case "death":
            title = "RIP"
            message = "These brave souls have perished!"
            break;
        case 'unlockedZone':
            title = "Discovery!"
            message = `These fine adventurers have discovered a new zone.`
            extra = <div className="title">{result.zone.name}</div>
            break;
    }

    return (
        <div className='results'>
            <div className="title">{title}</div>
            <div className="message">{message}</div>
            {result.goobers && <GooberGroup goobers={result.goobers} />}
            {extra}
            <button onClick={() => setResultsIndex(resultsIndex + 1)}>OK</button>
        </div>
    );
}

export default Results;
