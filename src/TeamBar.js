import GooberGroup from './GooberGroup';

function TeamBar(props) {
    const { team, onGooberClick, onStayClick, onBreedClick, onExpeditionClick, onEndTurn } = props
    return (
        <div className="team-bar">
            <GooberGroup goobers={team} onClick={onGooberClick} />
            <div className="actions">
                {team.length > 0 && <button onClick={onStayClick}>STAY</button>}
                {team.length > 0 && <button onClick={onBreedClick}>BREED</button>}
                {team.length > 0 && <button onClick={onExpeditionClick}>ADVENTURE</button>}
                <button onClick={onEndTurn}>END TURN</button>
            </div>
        </div>
    );
}

export default TeamBar;
