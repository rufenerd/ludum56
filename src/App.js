import './App.css';
import { useGame } from './GameProvider';
import _ from 'underscore';

const HAND_SIZE = 2

const foodRequired = (state) => {
  return state.world.population.reduce((m, a) => m + a.foodRequirement, 0)
}

const draw = (state) => {
  return _.sample(state.world.population, HAND_SIZE)
}

const turn = (state, dispatch) => {
  const foodRequirement = foodRequired(state)
  if (foodRequirement > state.world.food) {
    dispatch({
      type: "GAME_OVER"
    })
    return
  }

  dispatch({
    type: "CONSUME",
    payload: {
      consume: foodRequirement
    }
  })
  dispatch({
    type: "DRAW",
    payload: {
      hand: draw(state)
    }
  })
}

function App() {
  const { state, dispatch } = useGame();

  return (
    <div className="App">
      {state.gameOver && <div>GAME OVER</div>}
      {!state.gameOver && <pre>{JSON.stringify(state, null, 2)}</pre>}
      {!state.gameOver && <button onClick={() => turn(state, dispatch)}>TURN</button>}
    </div>
  );
}

export default App;
