import Hand from './Hand';
import Stats from './Stats';
import TeamBar from './TeamBar';
import Deck from './Deck';

function PlayArea(props) {
    const { food, lastRoundGainedFood, turn, hand, population, team, initialTeam, onAddGooberToTeam, onStayClick, onBreedClick, onExpeditionClick, onEndTurn } = props
    const stillInHand = hand.filter(x => !team.includes(x))

    return (
        <div>
            <div className="play-area" style={{
                backgroundImage: "url('assets/play_area_bg.png')",
                backgroundSize: "cover",
            }}>
                <h1 className="play-area-title">{hand.length} goobers are ready for orders!</h1>
                <Stats food={food} population={population} lastRoundGainedFood={lastRoundGainedFood} turn={turn} />
                <Deck population={population} />
                <Hand popIn={initialTeam} hand={stillInHand} onClick={(x) => onAddGooberToTeam(x)} />
                <TeamBar
                    team={team}
                    bounce={true}
                    onGooberClick={(x) => onAddGooberToTeam(x)}
                    onStayClick={onStayClick}
                    onBreedClick={onBreedClick}
                    onExpeditionClick={onExpeditionClick}
                    onEndTurn={onEndTurn}
                />
            </div >
        </div>
    );
}

export default PlayArea;
