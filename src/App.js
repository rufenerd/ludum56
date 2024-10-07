import _ from 'underscore';

import './App.css';

import { useGame } from './GameProvider';
import React, { useState } from 'react';

import Results from './Results';
import Map from './Map'
import GameOver from './GameOver';
import Intro from './Intro';
import PlayArea from './PlayArea';
import { makeOneOfKlass, Goober, Hungry, Packer, Immortal, Protector, Stud, Explorer, Doctor, Scavenger, Bozo, Asexual, Buddy, Recruiter, Opener, Replicator } from './classes';
import { names } from './names'

const START_HAND_SIZE = 5
const DIFFICULTY = 0.2

function App() {
  const { state, dispatch } = useGame();
  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showResults, setShowResults] = useState(false);

  document.addEventListener('click', function (e) {
    console.log(e.pageX - 50, e.pageY - 50);
  });

  const toggleShowMap = () => {
    setShowMap(!showMap)
  }

  const onResultsFinish = () => {
    setShowResults(false)
    startTurn(state, dispatch)
  }

  const onIntroClick = () => {
    startTurn(state, dispatch)
    dispatch({
      type: "GAME_START"
    })
    setShowIntro(false)
  }

  const foodRequired = (state) => {
    return state.population.reduce((m, a) => m + a.foodRequirement, 0)
  }

  const draw = (state) => {
    const numRecruiters = state.population.filter(x => x.klass == "recruiter").length
    let hand = _.sample(state.population, START_HAND_SIZE + numRecruiters)
    let unusedBuddies = hand.filter(x => x.klass == "buddy").length
    let usedBuddies = 0
    while (unusedBuddies > 0) {
      const remainingPopulation = state.population.filter(member => !hand.includes(member))
      hand = [...hand, ..._.sample(remainingPopulation, 2)]
      usedBuddies++
      unusedBuddies = hand.filter(x => x.klass == "buddy").length - usedBuddies
    }
    return hand
  }

  const endTurn = (state, dispatch) => {
    if (state.results.length > 0) {
      setShowResults(true)
    } else {
      onResultsFinish()
    }
  }

  const startTurn = (state, dispatch) => {
    setShowMap(false)
    const foodRequirement = foodRequired(state)

    dispatch({
      type: "CLEAR"
    })

    dispatch({
      type: "CONSUME",
      payload: {
        consume: foodRequirement
      }
    })

    if (foodRequirement > state.food || state.population.length == 0) {
      dispatch({
        type: "GAME_OVER"
      })
      return
    }

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

  const randomName = () => {
    let name = null
    while (name == null || state.population.map(x => x.name).includes(name)) {
      name = _.sample(names, 1)[0]
    }
    return name
  }

  const randomGoober = () => {
    return new Goober(randomName())
  }

  const nOfClass = (team, n, klass) => {
    return team.length == n && containsNofClass(team, n, klass)
  }

  const containsNofClass = (team, n, klass) => {
    return team.filter(x => x.klass == klass).length == n
  }

  const containsExactly = (team, klasses) => {
    return JSON.stringify(team.map(x => x.klass).sort()) == JSON.stringify(klasses.sort())
  }

  const breed = (state, dispatch) => {
    const { team } = state
    let offspring
    if (nOfClass(team, 1, "asexual")) {
      offspring = [new Asexual(randomName())]
    } else if (team.length > 6) {
      offspring = [new Recruiter(randomName())]
    } else if (nOfClass(team, 2, "recruiter")) {
      offspring = [new Stud(randomName())]
    } else if (nOfClass(team, 2, "explorer")) {
      offspring = [new Replicator(randomName())]
    } else if (nOfClass(team, 5, "goober")) {
      offspring = [new Buddy(randomName())]
    } else if (nOfClass(team, 4, "goober")) {
      offspring = [new Doctor(randomName())]
    } else if (nOfClass(team, 3, "goober")) {
      offspring = [new Explorer(randomName())]
    } else if (nOfClass(team, 2, "goober")) {
      offspring = [new Asexual(randomName())]
    } else if (nOfClass(team, 2, "buddy")) {
      offspring = [new Bozo(randomName())]
    } else if (nOfClass(team, 2, "packer")) {
      offspring = [new Scavenger(randomName())]
    } else if (nOfClass(team, 2, "hungry")) {
      offspring = [new Immortal(randomName())]
    } else if (containsExactly(team, ["goober", "packer"])) {
      offspring = [new Packer(randomName())]
    } else if (containsExactly(team, ["protector", "packer"])) {
      offspring = [new Hungry(randomName())]
    } else if (containsExactly(team, ["explorer", "goober"])) {
      offspring = [new Opener(randomName())]
    } else if (containsExactly(team, ["protector", "goober"])) {
      offspring = [new Protector(randomName())]
    } else if (team.length == 2 && team.map(x => x.klass).includes("replicator")) {
      if (nOfClass(team, 2, "replicator")) {
        offspring = [new Replicator(randomName())]
      } else {
        const klass = team.filter(x => x.klass != "replicator")[0].klass
        offspring = [makeOneOfKlass(randomName(), klass)]
      }
    } else {
      if (state.team.length < 2) {
        dispatch({
          type: "FAILED_BIRTH"
        })
        return
      }

      const studCount = state.team.filter(x => x.klass == "stud").length
      const nonStudCount = state.team.length - studCount

      const offspringCount = studCount > 0 ? studCount * nonStudCount : 1
      offspring = Array.from({ length: offspringCount }, randomGoober);
    }

    dispatch({
      type: "BIRTH",
      payload: {
        offspring
      }
    })
  }

  const onAdventureCancel = () => {
    setShowMap(false)
  }

  const expedition = (state, dispatch, zone) => {
    setShowMap(false)
    const { team } = state

    const risk = DIFFICULTY * zone.risk / team.reduce((m, a) => m * a.protect, 1)

    let unusedDoctors = state.team.filter(x => x.klass == "doctor").length;
    const savingDoctors = [];
    const savedGoobers = [];

    let unusedBozos = state.team.filter(x => x.klass == "bozo");
    let usedBozos = []
    let died = team.filter(x => {
      if (x.klass == "immortal") {
        return false
      }

      const shouldDie = Math.random() < risk;
      const doctorAvailable = unusedDoctors > 0;

      if (shouldDie && doctorAvailable) {
        unusedDoctors--;
        savingDoctors.push(state.team.find(d => d.klass == "doctor" && !savingDoctors.includes(d)));
        savedGoobers.push(x)
        return false;
      }

      if (shouldDie && unusedBozos.length > 0) {
        usedBozos.push(unusedBozos.pop())
        return false
      }

      return shouldDie;
    });

    died = [...died, ...usedBozos]

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
            alive,
            savingDoctors,
            savedGoobers,
            targetZone: zone,
            failedUnlockZone: zone
          }
        })
        return
      }
    }

    const found = team.reduce((m, a) => m * a.scavenge, 1) * zone.bounty
    const aliveCapacity = alive.reduce((m, a) => m + a.carryingCapacity, 0)
    const gainedFood = Math.min(found, aliveCapacity, zone.remaining)

    dispatch({
      type: "EXPEDITION",
      payload: {
        gainedFood,
        died,
        alive,
        unlockedZone: unlockedZone,
        savingDoctors,
        savedGoobers,
        targetZone: zone
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
        lastRoundGainedFood={state.lastRoundGainedFood}
        hand={state.hand}
        population={state.population}
        team={state.team}
        initialTeam={state.initialTeam}
        onAddGooberToTeam={(x) => toggleTeamMember(state, dispatch, x)}
        onStayClick={() => stay(state, dispatch)}
        onBreedClick={() => breed(state, dispatch)}
        onExpeditionClick={toggleShowMap}
        onEndTurn={() => endTurn(state, dispatch)}
      />}
      {showMap && <Map zones={state.zones} unlockedRooms={state.unlockedRooms} team={state.team} onAdventureCancel={onAdventureCancel} onZoneClick={(zone) => expedition(state, dispatch, zone)} />}
      {showResults && state.results.length > 0 && <Results results={state.results} onFinish={onResultsFinish} />}
    </div>)
}

export default App;
