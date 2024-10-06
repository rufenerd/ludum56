import GooberGroup from "./GooberGroup";

function Stats(props) {
    return (
        <div className='stats'>

            <div>
                POPULATION: {props.population.length}
            </div>
            <div>
                FOOD SUPPLY: {props.food}
            </div>
            <div>
                FOOD DEMAND: {props.population.reduce((m, a) => m + a.foodRequirement, 0)}
            </div>
        </div>
    );
}

export default Stats;
