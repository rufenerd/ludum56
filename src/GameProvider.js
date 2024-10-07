import React, { createContext, useReducer, useContext } from 'react';
import { Goober } from './classes';
import { zones } from './zones'

const GameContext = createContext();

const initialState = {
    population: [
        new Goober("Stev"),
        new Goober("Jez"),
        new Goober("Derb"),
        new Goober("Stelbo"),
        new Goober("Malx"),
        new Goober("Weebie"),
        new Goober("Toogie"),
        new Goober("Ribnar"),
        new Goober("Ilva"),
        new Goober("Darf"),
    ],
    food: 50,
    roundGainedFood: 0,
    hand: [],
    team: [],
    zones,
    results: [],
    unlockedRooms: [
        "start",
        // "hall",
        // "breakroom",
        // "office",
        // "kitchen",
        // "lobby",
        // "hall2",
        // "experiment"
    ],
    initialTeam: true
};

const gameReducer = (state, action) => {
    console.log(action.type)
    console.log(JSON.stringify(action.payload))
    console.log("------")

    switch (action.type) {
        case 'GAME_START':
            return {
                ...state,
                lastRoundGainedFood: 10 //hack to fix first turn delta
            };
        case 'CONSUME':
            const newFood = state.food - action.payload.consume
            return {
                ...state,
                food: newFood,
                gameOver: newFood < 0,
                results: [...state.results,
                {
                    type: "consume",
                    goobers: state.population,
                    consumed: action.payload.consume,
                    newFood
                }
                ]
            };
        case 'GAME_OVER':
            return {
                ...state,
                gameOver: true,
                results: [{
                    type: "game_over"
                }]
            }
        case 'CLEAR':
            return {
                ...state,
                team: [],
                message: null,
                results: [],
                roundGainedFood: 0,
                lastRoundGainedFood: state.roundGainedFood,
                initialTeam: true
            }
        case 'DRAW':
            return {
                ...state,
                hand: action.payload.hand,
            }
        case 'TOGGLE_TEAM_MEMBER':
            const { goober } = action.payload;
            const memberExists = state.team.some(member => member === goober);

            return {
                ...state,
                initialTeam: false,
                team: memberExists
                    ? state.team.filter(member => member !== goober)
                    : [...state.team, action.payload.goober],
            }
        case 'STAY':
            return {
                ...state,
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: []
            }
        case 'BIRTH':
            return {
                ...state,
                population: [...state.population, ...action.payload.offspring],
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: [],
                results: [...state.results, {
                    type: "birth",
                    goobers: action.payload.parents,
                    offspring: action.payload.offspring
                }]
            }
        case 'FAILED_BIRTH':
            return {
                ...state,
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: [],
                results: [...state.results, {
                    type: "failedBirth",
                    goobers: action.payload.goobers
                }]
            }
        case 'EXPEDITION':
            const { died, alive, gainedFood, unlockedZone, savingDoctors, savedGoobers, targetZone, failedUnlockZone } = action.payload

            let expeditionResults = []
            let unlockedRooms = state.unlockedRooms
            let zones = state.zones
            if (unlockedZone) {

                if (unlockedZone.name == 'Exit to Freedom (Win Game)') {
                    return {
                        ...state,
                        gameWin: true
                    }
                }

                const newZone = {
                    ...unlockedZone,
                    unlocked: true
                }
                zones = zones.map(zone => zone === unlockedZone ? newZone : zone)


                if (newZone.unlocksRoom) {
                    if (!unlockedRooms.includes(unlockedZone.unlocksRoom)) {
                        unlockedRooms = [...unlockedRooms, unlockedZone.unlocksRoom]
                        expeditionResults.push({
                            type: "unlockedRoom",
                            goobers: alive,
                            newRoom: newZone.unlocksRoom
                        })
                    }
                } else {
                    expeditionResults.push({
                        type: "unlockedZone",
                        goobers: alive,
                        zone: newZone
                    })
                }
            }

            if (failedUnlockZone) {
                expeditionResults.push({
                    type: "failedUnlockZone",
                    goobers: [...alive, ...died],
                })
            }

            if (gainedFood > 0) {
                expeditionResults.push({
                    type: "food",
                    goobers: alive,
                    gainedFood
                })
                const depletedZone = {
                    ...targetZone,
                    remaining: targetZone.remaining - gainedFood
                }
                zones = zones.map(zone => zone === targetZone ? depletedZone : zone)

            }

            if (savingDoctors.length > 0) {
                expeditionResults.push({
                    type: "savingDoctors",
                    goobers: savingDoctors,
                    savedGoobers
                })
            }

            if (died.length) {
                expeditionResults.push({
                    type: "death",
                    goobers: died,
                    targetZone
                })
            }

            return {
                ...state,
                food: state.food + gainedFood,
                roundGainedFood: state.roundGainedFood + gainedFood,
                population: state.population.filter(member => !died.includes(member)),
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: [],
                zones,
                unlockedRooms,
                results: [...state.results, ...expeditionResults],
            }
        default:
            return state;
    }
};

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
