function Stats(props) {
    const foodDemand = props.population.reduce((m, a) => m + a.foodRequirement, 0)
    return (
        <div className='stats'>
            <div>
                Day: {props.turn}
            </div>
            <div>
                FOOD SUPPLY: {props.food}
            </div>
            <div>
                FOOD DEMAND: {foodDemand}
            </div>
            {props.lastRoundGainedFood !== null && < div >
                FOOD CHANGE: {props.lastRoundGainedFood - foodDemand}
            </div>}
        </div >
    );
}

export default Stats;
