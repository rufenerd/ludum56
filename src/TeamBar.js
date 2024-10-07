import GooberGroup from './GooberGroup';

function TeamBar(props) {
    const { team, bounce, onGooberClick, onStayClick, onBreedClick, onExpeditionClick, onEndTurn } = props

    const noTeam = team.length == 0 ? "no-team" : ""

    return (
        <div className="team-bar">
            <GooberGroup goobers={team} bounce={bounce} onClick={onGooberClick} />
            <div className="actions">
                {<button className={noTeam} disabled={noTeam} onClick={onBreedClick}>REPRODUCE</button>}
                {<button className={noTeam} disabled={noTeam} onClick={onExpeditionClick}>ADVENTURE</button>}
                <button onClick={onEndTurn}>END TURN</button>
            </div>
        </div>
    );
}

export default TeamBar;
