import Hand from './Hand';
import Stats from './Stats';
import TeamBar from './TeamBar';

function PlayArea(props) {
    const { food, hand, population, team, onAddGooberToTeam, onStayClick, onBreedClick, onExpeditionClick, onEndTurn } = props
    const stillInHand = hand.filter(x => !team.includes(x))

    if (hand.length == 0 && team.length == 0) {
        onEndTurn()
    }

    return (
        <div className="play-area">
            <Stats food={food} population={population} />
            <Hand hand={stillInHand} onClick={(x) => onAddGooberToTeam(x)} />
            <TeamBar
                team={team}
                onGooberClick={(x) => onAddGooberToTeam(x)}
                onStayClick={onStayClick}
                onBreedClick={onBreedClick}
                onExpeditionClick={onExpeditionClick}
                onEndTurn={onEndTurn}
            />
        </div >
    );
}

export default PlayArea;
