import './App.css';
import { useGame } from './GameProvider';
import _ from 'underscore';
import { Goober } from './classes';
import { names } from './names'
import React, { useState } from 'react';
import Hand from './Hand';
import Stats from './Stats';
import GooberGroup from './GooberGroup';

const HAND_SIZE = 3
const DIFFICULTY = 0.5

function App() {
  const { state, dispatch } = useGame();
  const [showExpeditions, setShowExpeditions] = useState(false);


  const toggleExpedition = () => {
    setShowExpeditions(!showExpeditions)
  }

  const foodRequired = (state) => {
    return state.population.reduce((m, a) => m + a.foodRequirement, 0)
  }

  const draw = (state) => {
    return _.sample(state.population, HAND_SIZE)
  }

  const turn = (state, dispatch) => {
    setShowExpeditions(false)
    const foodRequirement = foodRequired(state)
    if (foodRequirement > state.food || state.population.length == 0) {
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

  const expedition = (state, dispatch, zone) => {
    const { team } = state

    const risk = DIFFICULTY * zone.risk / team.reduce((m, a) => m * a.protect, 1)
    const died = team.filter(x => Math.random() < risk)
    const alive = team.filter(x => !died.includes(x))

    let unlockedZone = null
    if (!zone.unlocked) {
      if (zone.canUnlock(alive)) {
        unlockedZone = zone
      } else {
        dispatch({
          type: "EXPEDITION",
          payload: {
            gainedFood: 0,
            died,
            alive
          }
        })
        return
      }
    }

    const found = team.reduce((m, a) => m * a.scavenge, 1) * zone.bounty
    const aliveCapacity = alive.reduce((m, a) => m + a.carryingCapacity, 0)
    const gainedFood = Math.min(found, aliveCapacity)

    dispatch({
      type: "EXPEDITION",
      payload: {
        gainedFood,
        died,
        unlockedZone: unlockedZone
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
      <Stats food={state.food} population={state.population} />
      <Hand hand={state.hand} onClick={(x) => toggleTeamMember(state, dispatch, x)} />
      <div>
        TEAM:
        <GooberGroup goobers={state.team} />
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
      <pre>{state.results.length > 0 && JSON.stringify(state.results, null, 2)}</pre>
    </div>)
}

export default App;
