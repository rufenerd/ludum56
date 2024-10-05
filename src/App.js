import './App.css';
import { useGame } from './GameProvider';
import _ from 'underscore';
import { Goober } from './classes';
import { names } from './names'
import React, { useState } from 'react';
import Hand from './Hand';
import Stats from './Stats';
import TeamBar from './TeamBar';
import Results from './Results';
import Map from './Map'

const HAND_SIZE = 3
const DIFFICULTY = 0.5

function App() {
  const { state, dispatch } = useGame();
  const [showMap, setShowMap] = useState(false);
  const [showResults, setShowResults] = useState(true);


  const toggleShowMap = () => {
    setShowMap(!showMap)
  }

  const toggleResults = () => {
    setShowResults(!showResults)
  }

  const foodRequired = (state) => {
    return state.population.reduce((m, a) => m + a.foodRequirement, 0)
  }

  const draw = (state) => {
    return _.sample(state.population, HAND_SIZE)
  }

  const turn = (state, dispatch) => {
    setShowMap(false)
    setShowResults(true)
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
    setShowMap(false)
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
    toggleShowMap()
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
      <TeamBar
        team={state.team}
        onGooberClick={(x) => toggleTeamMember(state, dispatch, x)}
        onStayClick={() => stay(state, dispatch)}
        onBreedClick={() => breed(state, dispatch)}
        onExpeditionClick={toggleShowMap}
      />
      {showMap && <Map zones={state.zones} onZoneClick={(zone) => expedition(state, dispatch, zone)} />}
      <button onClick={() => turn(state, dispatch)}>End Turn</button>
      {showResults && state.results.length > 0 && <Results results={state.results} onFinish={toggleResults} />}
    </div>)
}

export default App;
