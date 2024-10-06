import GooberGroup from './GooberGroup';

function TeamBar(props) {
    const { team, onGooberClick, onStayClick, onBreedClick, onExpeditionClick, onEndTurn } = props

    const noTeam = team.length == 0 ? "no-team" : ""

    return (
        <div className="team-bar">
            <GooberGroup goobers={team} onClick={onGooberClick} />
            <div className="actions">
                {<button className={noTeam} onClick={onBreedClick}>REPRODUCE</button>}
                {<button className={noTeam} onClick={onExpeditionClick}>ADVENTURE</button>}
                {<button className={noTeam} onClick={onStayClick}>CHILL</button>}
                <button onClick={onEndTurn}>END TURN</button>
            </div>
        </div>
    );
}

export default TeamBar;
