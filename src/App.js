import './App.css';
import { useGame } from './GameProvider';
import _ from 'underscore';
import { Goober } from './classes';
import { names } from './names'

const HAND_SIZE = 2

const foodRequired = (state) => {
  return state.population.reduce((m, a) => m + a.foodRequirement, 0)
}

const draw = (state) => {
  return _.sample(state.population, HAND_SIZE)
}

const turn = (state, dispatch) => {
  const foodRequirement = foodRequired(state)
  if (foodRequirement > state.food) {
    dispatch({
      type: "GAME_OVER"
    })
    return
  }

  dispatch({
    type: "CLEAR_TEAM"
  })

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

const toggleTeamMember = (state, dispatch, goober) => {
  dispatch({
    type: "TOGGLE_TEAM_MEMBER",
    payload: {
      goober
    }
  })
}

const stay = (state, dispatch) => {
  dispatch({
    type: "STAY"
  })
}

const breed = (state, dispatch) => {
  if (state.team.length < 2) {
    return
  }
  dispatch({
    type: "BIRTH",
    payload: {
      goober: new Goober(_.sample(names, 1))
    }
  })
}

const expedition = (state, dispatch) => {
  dispatch({
    type: "EXPEDITION"
  })
}

function App() {
  const { state, dispatch } = useGame();

  if (state.gameOver) {
    return (
      <div className="App">
        <div>GAME OVER</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        FOOD: {state.food}
      </div>
      <div>
        POPULATION: {state.population.length}
      </div>
      <div>
        HAND:
        {state.hand.map(x => (
          <div key={x.name}>
            {x.name} ({x.klass})
            <button onClick={() => toggleTeamMember(state, dispatch, x)}>Toggle</button>
          </div>
        ))}
      </div>
      <div>
        TEAM:
        {state.team.map(x => (
          <div key={x.name}>
            {x.name} ({x.klass})
          </div>
        ))}
        <div>
          <button onClick={() => stay(state, dispatch)}>STAY</button>
          <button onClick={() => breed(state, dispatch)}>BREED</button>
          <button onClick={() => expedition(state, dispatch)}>EXPEDITION</button>
        </div>
      </div>
      <button onClick={() => turn(state, dispatch)}>TURN</button>
    </div >
  );
}

export default App;
