import './App.css';
import { useGame } from './GameProvider';
import _ from 'underscore';
import { Goober } from './classes';
import { names } from './names'
import React, { useState } from 'react';
import { zones } from './zones';

const HAND_SIZE = 3
const DIFFICULTY = 0.5

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
    type: "CLEAR"
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

function App() {
  const { state, dispatch } = useGame();
  const [showExpeditions, setShowExpeditions] = useState(false);


  const toggleExpedition = () => {
    setShowExpeditions(!showExpeditions)
  }

  const expedition = (state, dispatch, zone) => {
    const { team } = state
    const risk = DIFFICULTY * zone.risk / team.reduce((m, a) => m * a.protect, 1)
    const died = team.filter(x => Math.random() < risk)
    const alive = team.filter(x => !died.includes(x))

    const found = team.reduce((m, a) => m * a.scavenge, 1) * zone.bounty
    const aliveCapacity = alive.reduce((m, a) => m + a.carryingCapacity, 0)
    const gainedFood = Math.min(found, aliveCapacity)

    dispatch({
      type: "EXPEDITION",
      payload: {
        gainedFood,
        died
      }
    })
    toggleExpedition()
  }

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
        {state.team.length && <div>
          <button onClick={() => stay(state, dispatch)}>STAY</button>
          <button onClick={() => breed(state, dispatch)}>BREED</button>
          <button onClick={toggleExpedition}>EXPEDITION</button>
          {showExpeditions && <div>
            {state.zones.map(zone => (
              <button key={zone.name} onClick={() => expedition(state, dispatch, zone)}>
                {zone.name}
              </button>
            ))}
          </div>}
        </div>}
      </div>
      <button onClick={() => turn(state, dispatch)}>TURN</button>
      <div>{state.message}</div>
    </div >
  );
}

export default App;
