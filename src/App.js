import _ from 'underscore';

import './App.css';

import { useGame } from './GameProvider';
import React, { useState, useRef } from 'react';

import Results from './Results';
import Map from './Map'
import GameOver from './GameOver';
import GameWin from './GameWin';
import Intro from './Intro';
import PlayArea from './PlayArea';
import Tutorial from './Tutorial';
import { makeOneOfKlass, Goober, Hungry, Lugger, Immortal, Protector, Stud, Explorer, Doctor, Scavenger, Bozo, Asexual, Buddy, Recruiter, Opener, Replicator, weightedRandomClass } from './classes';
import { names } from './names'
import Dialogue from './Dialogue';
import NewDay from './NewDay';

const START_HAND_SIZE = 5
const DIFFICULTY = 0.2

const SCENE_INTRO = "intro"
const SCENE_TUTORIAL = "tutorial"
const SCENE_GAME_OVER = "gameover"
const SCENE_GAME_WIN = "gamewin"
const SCENE_PLAY_AREA = "playarea"
const SCENE_NEW_DAY = "newday"
const SCENE_MAP_SELECT = "mapselect"
const SCENE_RESULTS = "results"

function App() {
  const { state, dispatch } = useGame();
  const [scene, setScene] = useState(SCENE_INTRO);

  document.addEventListener('click', function (e) {
    console.log(e.pageX - 50, e.pageY - 50);
  });

  const onResultsFinish = () => {
    startTurn(state, dispatch)
  }

  const onIntroClick = () => {
    startTurn(state, dispatch)
    dispatch({
      type: "GAME_START"
    })
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

  const dispatchQueue = useRef([])
  const queueDispatch = (op) => {
    dispatch({ type: 'STAY' })
    dispatchQueue.current.push(op)
  }

  const executeQueue = () => {
    for (const op of dispatchQueue.current) {
      dispatch(op)
    }
    dispatchQueue.current = []
  }

  const endTurn = (state, dispatch) => {
    executeQueue()

    dispatch({
      type: "CONSUME",
    })

    setScene(SCENE_RESULTS)
  }

  const startTurn = (state, dispatch) => {
    if (state.gameWin) {
      setScene(SCENE_GAME_WIN)
      return
    }

    if (state.food < 0 || state.population.length == 0) {
      setScene(SCENE_GAME_OVER)
      return
    }

    setScene(SCENE_NEW_DAY)

    dispatch({
      type: "CLEAR"
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

  const defaultBreed = (parentA, parentB) => {
    const r = Math.random()
    if (r < 0.5) {
      return new Goober(randomName())
    } else if (r < 0.75) {
      return makeOneOfKlass(randomName(), parentA.klass)
    } else {
      return makeOneOfKlass(randomName(), parentB.klass)
    }
  }

  const breed = (state, dispatch) => {
    const { team } = state

    let offspring
    debugger
    if (team.length == 1) {
      if (nOfClass(team, 1, "asexual")) {
        offspring = [weightedRandomClass(randomName())]
      } else {
        dispatch({
          type: "FAILED_BIRTH",
          payload: {
            goobers: team
          }
        })
        return
      }
    }

    if (team.length > 2) {
      if (team.map(x => x.klass).includes("stud")) {
        offspring = []
        const studs = team.filter(x => x.klass == "stud")
        const nonStuds = team.filter(x => x.klass != "stud")

        for (let i = 0; i < studs.length; i++) {
          for (let j = 0; j < nonStuds.length; j++) {
            offspring.push(defaultBreed(nonStuds[j], nonStuds[j]))
          }
        }
      } else {
        dispatch({
          type: "FAILED_BIRTH",
          payload: {
            goobers: team
          }
        })
        return
      }
    }

    if (containsExactly(team, ["goober", "goober"])) {
      const r = Math.random()
      if (r < 0.5) {
        offspring = [new Goober(randomName())]
      } else if (r < 0.75) {
        offspring = [new Lugger(randomName())]
      } else {
        offspring = [new Protector(randomName())]
      }
    } else if (containsExactly(team, ["goober", "lugger"])) {
      offspring = [new Lugger(randomName())]
    } else if (containsExactly(team, ["goober", "protector"])) {
      offspring = [new Protector(randomName())]
    } else if (containsExactly(team, ["lugger", "protector"])) {
      offspring = [new Explorer(randomName())]
    } else if (containsExactly(team, ["lugger", "lugger"])) {
      offspring = [new Scavenger(randomName())]
    } else if (containsExactly(team, ["protector", "protector"])) {
      offspring = [new Doctor(randomName())]
    } else if (containsExactly(team, ["lugger", "explorer"])) {
      offspring = [new Buddy(randomName())]
    } else if (containsExactly(team, ["protector", "explorer"])) {
      offspring = [new Opener(randomName())]
    } else if (containsExactly(team, ["protector", "doctor"])) {
      offspring = [new Bozo(randomName())]
    } else if (containsExactly(team, ["lugger", "doctor"])) {
      offspring = [new Replicator(randomName())]
    } else if (containsExactly(team, ["scavenger", "scavenger"])) {
      offspring = [new Hungry(randomName())]
    } else if (containsExactly(team, ["buddy", "buddy"])) {
      offspring = [new Recruiter(randomName())]
    } else if (containsExactly(team, ["bozo", "bozo"])) {
      offspring = [new Asexual(randomName())]
    } else if (containsExactly(team, ["hungry", "hungry"])) {
      offspring = [new Immortal(randomName())]
    } else if (containsExactly(team, ["recruiter", "recruiter"])) {
      offspring = [new Stud(randomName())]
    } else if (team.length == 2 && team.map(x => x.klass).includes("replicator")) {
      if (nOfClass(team, 2, "replicator")) {
        offspring = [new Replicator(randomName())]
      } else {
        const klass = team.filter(x => x.klass != "replicator")[0].klass
        offspring = [makeOneOfKlass(randomName(), klass)]
      }
    } else {
      offspring = [defaultBreed(team[0], team[1])]
    }

    // 
    // if (nOfClass(team, 1, "asexual")) {
    //   offspring = [weightedRandomClass(randomName())]
    // } else if (team.length > 6) {
    //   offspring = [new Recruiter(randomName())]
    // } else if (nOfClass(team, 2, "recruiter")) {
    //   offspring = [new Stud(randomName())]
    // } else if (nOfClass(team, 2, "explorer")) {
    //   offspring = [new Replicator(randomName())]
    // } else if (nOfClass(team, 5, "goober")) {
    //   offspring = [new Buddy(randomName())]
    // } else if (nOfClass(team, 4, "goober")) {
    //   offspring = [new Asexual(randomName())]
    // } else if (nOfClass(team, 3, "goober")) {
    //   offspring = [new Doctor(randomName())]
    // } else if (nOfClass(team, 2, "goober")) {
    //   offspring = [new Explorer(randomName())]
    // } else if (nOfClass(team, 2, "buddy")) {
    //   offspring = [new Bozo(randomName())]
    // } else if (nOfClass(team, 2, "packer")) {
    //   offspring = [new Scavenger(randomName())]
    // } else if (nOfClass(team, 2, "hungry")) {
    //   offspring = [new Immortal(randomName())]
    // } else if (containsExactly(team, ["goober", "packer"])) {
    //   offspring = [new Packer(randomName())]
    // } else if (containsExactly(team, ["protector", "packer"])) {
    //   offspring = [new Hungry(randomName())]
    // } else if (containsExactly(team, ["explorer", "goober"])) {
    //   offspring = [new Opener(randomName())]
    // } else if (containsExactly(team, ["doctor", "goober"])) {
    //   offspring = [new Protector(randomName())]
    // } else if (team.length == 2 && team.map(x => x.klass).includes("replicator")) {
    //   if (nOfClass(team, 2, "replicator")) {
    //     offspring = [new Replicator(randomName())]
    //   } else {
    //     const klass = team.filter(x => x.klass != "replicator")[0].klass
    //     offspring = [makeOneOfKlass(randomName(), klass)]
    //   }
    // } else {
    //   if (state.team.length < 2) {
    //     dispatch({
    //       type: "FAILED_BIRTH"
    //     })
    //     return
    //   }

    //   const studCount = state.team.filter(x => x.klass == "stud").length
    //   const nonStudCount = state.team.length - studCount

    //   const offspringCount = studCount > 0 ? studCount * nonStudCount : 1
    //   offspring = Array.from({ length: offspringCount }, randomGoober);
    // }

    dispatch({
      type: "BIRTH",
      payload: {
        parents: team,
        offspring
      }
    })
  }

  const onAdventureCancel = () => {
    setScene(SCENE_PLAY_AREA)
  }

  const expedition = (state, dispatch, zone) => {
    setScene(SCENE_PLAY_AREA)
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
  }

  if (scene === SCENE_RESULTS && state.results.length === 0) {
    startTurn(state, dispatch)
  }

  return (
    <div className="App">
      {scene === SCENE_INTRO && <Intro onClick={() => setScene(SCENE_TUTORIAL)} />}
      {scene === SCENE_TUTORIAL && <Tutorial onClick={onIntroClick} />}
      {scene === SCENE_NEW_DAY && <NewDay onFinish={() => setScene(SCENE_PLAY_AREA)} />}
      {scene === SCENE_GAME_OVER && <GameOver state={state} />}
      {scene === SCENE_GAME_WIN && <GameWin />}
      {scene === SCENE_PLAY_AREA && <PlayArea
        food={state.food}
        lastRoundGainedFood={state.lastRoundGainedFood}
        hand={state.hand}
        population={state.population}
        team={state.team}
        initialTeam={state.initialTeam}
        onAddGooberToTeam={(x) => toggleTeamMember(state, dispatch, x)}
        onStayClick={() => stay(state, dispatch)}
        onBreedClick={() => breed(state, queueDispatch)}
        onExpeditionClick={() => setScene(SCENE_MAP_SELECT)}
        onEndTurn={() => endTurn(state, dispatch)}
      />}
      {scene === SCENE_MAP_SELECT && <Map zones={state.zones} unlockedRooms={state.unlockedRooms} team={state.team} onAdventureCancel={onAdventureCancel} onZoneClick={(zone) => expedition(state, queueDispatch, zone)} />}
      {scene === SCENE_RESULTS && state.results.length > 0 && <Results results={state.results} onFinish={onResultsFinish} />}
    </div>)
}

export default App;
