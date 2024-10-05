
function Stats(props) {
    return (
        <div>
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
