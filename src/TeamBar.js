import GooberGroup from './GooberGroup';

function TeamBar(props) {
    const { team, onGooberClick, onStayClick, onBreedClick, onExpeditionClick } = props
    return (
        <div>
            TEAM:
            <GooberGroup goobers={team} onClick={onGooberClick} />
            {team.length && <div>
                <button onClick={onStayClick}>STAY</button>
                <button onClick={onBreedClick}>BREED</button>
                <button onClick={onExpeditionClick}>EXPEDITION</button>
            </div>}
        </div>
    );
}

export default TeamBar;
