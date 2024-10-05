import Hand from './Hand';
import Stats from './Stats';
import TeamBar from './TeamBar';

function PlayArea(props) {
    const { food, hand, population, team, onAddGooberToTeam, onStayClick, onBreedClick, onExpeditionClick } = props
    return (
        <div>
            <Stats food={food} population={population} />
            <Hand hand={hand} onClick={(x) => onAddGooberToTeam(x)} />
            <TeamBar
                team={team}
                onGooberClick={(x) => onAddGooberToTeam(x)}
                onStayClick={onStayClick}
                onBreedClick={onBreedClick}
                onExpeditionClick={onExpeditionClick}
            />
        </div >
    );
}

export default PlayArea;
