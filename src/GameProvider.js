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
    zones
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
                message: null
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
                message: action.payload.goober.name + " was born!"
            }
        case 'EXPEDITION':
            const { died, gainedFood } = action.payload
            const deathMessage = died.length ? `${died.map(x => x.name).join(' and ')} died!` : ''
            const foundMessage = `Retrieved ${gainedFood} food.`
            return {
                ...state,
                food: state.food + gainedFood,
                population: state.population.filter(member => !died.includes(member)),
                hand: state.hand.filter(member => !state.team.includes(member)),
                team: [],
                message: deathMessage + " " + foundMessage
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