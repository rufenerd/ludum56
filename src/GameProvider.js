import React, { createContext, useReducer, useContext } from 'react';
import { Goober, Hungry, Packer } from './classes';

const GameContext = createContext();

const initialState = {
    world: {
        population: [
            new Goober("Stev"),
            new Goober("Jez"),
            new Hungry("Derb"),
            new Packer("Stelbo")
        ],
        food: 100,
    },
};

const gameReducer = (state, action) => {
    console.log(action.type)

    switch (action.type) {
        case 'CONSUME':
            return {
                ...state,
                world: {
                    ...state.world,
                    food: state.world.food - action.payload.consume,
                },
            };
        case 'GAME_OVER':
            return {
                ...state,
                gameOver: true
            }
        case 'DRAW':
            return {
                ...state,
                hand: action.payload.hand,
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