import _ from 'underscore';

import './App.css';

import { useGame } from './GameProvider';
import React, { useState } from 'react';

import Results from './Results';
import Map from './Map'
import GameOver from './GameOver';
import Intro from './Intro';
import PlayArea from './PlayArea';
import { Goober } from './classes';
import { names } from './names'

const HAND_SIZE = 3
const DIFFICULTY = 0.5

function App() {
  const { state, dispatch } = useGame();
  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showResults, setShowResults] = useState(false);


  const toggleShowMap = () => {
    setShowMap(!showMap)
  }

  const onResultsFinish = () => {
    setShowResults(false)
    startTurn(state, dispatch)
  }

  const onIntroClick = () => {
    startTurn(state, dispatch)
    setShowIntro(false)
  }

  const foodRequired = (state) => {
    return state.population.reduce((m, a) => m + a.foodRequirement, 0)
  }

  const draw = (state) => {
    return _.sample(state.population, HAND_SIZE)
  }

  const endTurn = (state, dispatch) => {
    setShowResults(true)
  }

  const startTurn = (state, dispatch) => {
    setShowMap(false)
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

    const randomGoober = () => {
      let name = null
      while (name == null || state.population.map(x => x.name).includes(name)) {
        name = _.sample(names, 1)[0]
      }
      console.log(name)
      return new Goober(name)
    }

    const studCount = state.team.filter(x => x.klass == "stud").length
    const nonStudCount = state.team.length - studCount

    const offspringCount = studCount > 0 ? studCount * nonStudCount : 1
    const offspring = Array.from({ length: offspringCount }, randomGoober);

    dispatch({
      type: "BIRTH",
      payload: {
        offspring
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
        alive,
        unlockedZone: unlockedZone
      }
    })
    toggleShowMap()
  }

  if (showIntro) {
    return (
      <div className="App">
        <Intro onClick={onIntroClick} />
      </div>
    );
  }

  if (state.gameOver) {
    return (
      <div className="App">
        <GameOver />
      </div>
    );
  }

  const hidePlayArea = showMap || (showResults && state.results.length > 0)

  return (
    <div className="App">
      {!hidePlayArea && <PlayArea
        food={state.food}
        hand={state.hand}
        population={state.population}
        team={state.team}
        onAddGooberToTeam={(x) => toggleTeamMember(state, dispatch, x)}
        onStayClick={() => stay(state, dispatch)}
        onBreedClick={() => breed(state, dispatch)}
        onExpeditionClick={toggleShowMap}
        onEndTurn={() => endTurn(state, dispatch)}
      />}
      {showMap && <Map zones={state.zones} onZoneClick={(zone) => expedition(state, dispatch, zone)} />}
      {showResults && state.results.length > 0 && <Results results={state.results} onFinish={onResultsFinish} />}
    </div>)
}

export default App;
