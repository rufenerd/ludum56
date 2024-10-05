
function Stats(props) {
    return (
        <div className='stats'>
            <div>
                FOOD: {props.food}
            </div>
            <div>
                POPULATION: {props.population.length}
            </div>
        </div>
    );
}

export default Stats;
