import React, { useState } from 'react';
import GooberGroup from './GooberGroup';

function Results(props) {
    const [resultsIndex, setResultsIndex] = useState(0);
    const { results } = props

    if (resultsIndex >= results.length) {
        return <div />
    }

    const result = results[resultsIndex]

    return (
        <div>
            <div>{result.type}</div>
            {result.goobers && <GooberGroup goobers={result.goobers} />}
            <pre>{JSON.stringify(result, null, 2)}</pre>
            <button onClick={() => setResultsIndex(resultsIndex + 1)}>OK</button>
        </div>
    );
}

export default Results;
