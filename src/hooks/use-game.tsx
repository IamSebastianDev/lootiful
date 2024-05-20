import React, { ReactNode, createContext, useContext } from "react";
import { useAttributes } from "./use-attributes";
import { useCoins } from "./use-coins";

export type Hero = {
    attributes: ReturnType<typeof useAttributes>[0];
    setAttributeByType: ReturnType<typeof useAttributes>[1];
    name: string | null;
};

export type GameState = {
    coins: ReturnType<typeof useCoins>;
    hero: Hero;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [attributes, setAttributeByType] = useAttributes();

    const gameState: GameState = {
        coins: useCoins(),
        hero: {
            name: null,
            attributes,
            setAttributeByType,
        },
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
