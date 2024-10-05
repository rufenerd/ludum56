import React, { createContext, useReducer, useContext } from 'react';
import { Goober, Hungry, Packer, Protector, Stud, Explorer, Doctor, Scavenger, Bozo, Asexual, Buddy, Recruiter, Opener } from './classes';
import { zones } from './zones'

const GameContext = createContext();

const initialState = {
    population: [
        new Goober("Stev"),
        new Protector("Jez"),
        new Hungry("Derb"),
        new Packer("Stelbo"),
        new Stud("Malx"),
        new Explorer("Weebie"),
        new Doctor("Toogie"),
        new Scavenger("Ribnar"),
        new Bozo("Ilva"),
        new Asexual("Wiggy"),
        new Buddy("Waz"),
        new Buddy("Wav"),
        new Recruiter("Darf"),
        new Opener("Chimi"),
    ],
    food: 1000,
    hand: [],
    team: [],
    zones,
    results: []
};

const gameReducer = (state, action) => {
    console.log(action.type)

    switch (action.type) {
        case 'CONSUME':
            return {
                ...state,
                food: state.food - action.payload.consume,
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
                results: []
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
                    goobers: state.team,
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
                    goobers: state.team
                }]
            }
        case 'EXPEDITION':
            const { died, alive, gainedFood, unlockedZone, savingDoctors, savedGoobers, targetZone, failedUnlockZone } = action.payload

            let expeditionResults = []


            let zones = state.zones
            if (unlockedZone) {
                const newZone = {
                    ...unlockedZone,
                    unlocked: true
                }
                zones = zones.map(zone => zone === unlockedZone ? newZone : zone)
                expeditionResults.push({
                    type: "unlockedZone",
                    goobers: alive,
                    zone: newZone
                })
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
                population: state.population.filter(member => !died.includes(member)),
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: [],
                zones,
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