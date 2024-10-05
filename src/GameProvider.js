import React, { createContext, useReducer, useContext } from 'react';
import { Goober, Hungry, Packer, Protector } from './classes';
import { zones } from './zones'

const GameContext = createContext();

const initialState = {
    population: [
        new Goober("Stev"),
        new Protector("Jez"),
        new Hungry("Derb"),
        new Packer("Stelbo")
    ],
    food: 100,
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
                gameOver: true
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
                population: [...state.population, action.payload.goober],
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: [],
                results: [...state.results, {
                    type: "birth",
                    goober: action.payload.goober
                }]
            }
        case 'EXPEDITION':
            const { died, alive, gainedFood, unlockedZone } = action.payload

            let expeditionResults = []


            let zones = state.zones
            if (unlockedZone) {
                zones = zones.map(zone => zone === unlockedZone ? {
                    ...unlockedZone,
                    unlocked: true
                } : zone)
                expeditionResults.push({
                    type: "unlockedZone",
                    goobers: alive,
                    zone: unlockedZone
                })
            }

            expeditionResults.push({
                type: "food",
                goobers: alive,
                gainedFood
            })

            if (died.length) {
                expeditionResults.push({
                    type: "death",
                    goobers: died
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