import React, { createContext, useReducer, useContext } from 'react';
import { Goober, Lugger, Protector } from './classes';
import { zones } from './zones'
import { makeOneOfKlass } from './classes';

const GameContext = createContext();

const foodRequired = (state) => {
    return state.population.reduce((m, a) => m + a.foodRequirement, 0)
}

const LOCAL_STORAGE_KEY = "gooberGameState";

const serializeState = (state) => {
    const serializedState = {
        ...state,
        population: state.population.map(goober => ({
            name: goober.name,
            klass: goober.klass,
        })),
        hand: state.hand.map(goober => ({
            name: goober.name,
            klass: goober.klass,
        })),
        team: state.team.map(goober => ({
            name: goober.name,
            klass: goober.klass,
        })),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serializedState));
};

const deserializeState = () => {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serializedState) return null;

    const parsedState = JSON.parse(serializedState);

    // Rebuild goobers
    return {
        ...parsedState,
        population: parsedState.population.map(goober => makeOneOfKlass(goober.name, goober.klass)),
        hand: parsedState.hand.map(goober => makeOneOfKlass(goober.name, goober.klass)),
        team: parsedState.team.map(goober => makeOneOfKlass(goober.name, goober.klass)),
    };
};


const initialState = {
    population: [
        new Goober("Stev"),
        new Goober("Jez"),
        new Goober("Derb"),
        new Goober("Stelbo"),
        new Goober("Malx"),
        new Goober("Weebie"),
        new Lugger("Toogie"),
        new Lugger("Ribnar"),
        new Protector("Ilva"),
        new Protector("Darf"),
    ],
    food: 50,
    roundGainedFood: 0,
    hand: [],
    team: [],
    zones,
    results: [],
    continue: false,
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
    turn: 0,
    initialTeam: true
}

const gameReducerWithLocalStorage = (state, action) => {
    const newState = gameReducer(state, action);
    serializeState(newState);
    return newState;
};


const gameReducer = (state, action) => {
    switch (action.type) {
        case 'GAME_START':
            localStorage.removeItem(LOCAL_STORAGE_KEY)
            return {
                ...state,
                lastRoundGainedFood: 10
            };
        case 'CONTINUE_GAME':
            return {
                ...deserializeState(),
                continue: true
            }
        case 'CONSUME':
            const consumed = foodRequired(state)
            const newFood = state.food - consumed
            return {
                ...state,
                food: newFood,
                gameOver: newFood < 0,
                results: newFood < 0
                    ? state.results
                    : [...state.results,
                    {
                        type: "consume",
                        goobers: state.population,
                        consumed,
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
        case 'START_TURN':
            return {
                ...state,
                team: [],
                turn: state.turn + 1,
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
    const [state, dispatch] = useReducer(gameReducerWithLocalStorage, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
