import React, { ReactNode, createContext, useContext } from "react";

export type GameState = {
    money: number;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const gameState: GameState = {
        money: 0,
    };

    return <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>;
};

export const useGame = () => {
    const ctx = useContext(GameStateContext);

    if (!ctx) {
        throw new Error(`GameState undefined.`);
    }

    return ctx;
};
