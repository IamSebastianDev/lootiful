import React, { ReactNode, createContext, useContext, useState } from "react";
import { useAttributes } from "./use-attributes";
import { useCoins } from "./use-coins";

export type Hero = {
    attributes: ReturnType<typeof useAttributes>[0];
    bumpAttributeByType: ReturnType<typeof useAttributes>[1];
    name: string | null;
    changeName: (name: string) => void;
};

export type GameState = {
    coins: ReturnType<typeof useCoins>;
    hero: Hero;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState<string | null>(null);
    const [attributes, bumpAttributeByType] = useAttributes();

    const gameState: GameState = {
        coins: useCoins(),
        hero: {
            name,
            attributes,
            bumpAttributeByType,
            changeName: (name: string) => setName(name),
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
