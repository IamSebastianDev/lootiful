import React, { ReactNode, createContext, useContext, useState } from "react";
import { Attribute, useAttributes, attributeNames } from "./use-attributes";
import { useCoins } from "./use-coins";
import { getRandomName } from "../functions/get-random-name";
import { getMaxHealth } from "../functions/get-max-health";
import { getMaxStamina } from "../functions/get-max-stamina";

export type Hero = {
    attributes: ReturnType<typeof useAttributes>[0];
    bumpAttributeByType: ReturnType<typeof useAttributes>[1];
    name: string | null;
    changeName: (name: string) => void;
    maxHealth: number;
    health: number;
    maxStamina: number;
    stamina: number;
    damage: number;
    damageHero: (amount: number) => void;
};

export type GameState = {
    coins: ReturnType<typeof useCoins>;
    hero: Hero;
    reset: () => void;
};

export const initialAttributeValues = () => {
    return Object.fromEntries(attributeNames.map((name) => [name, 8])) as Record<Attribute, number>;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState<string | null>(getRandomName());
    const [attributes, bumpAttributeByType, setAttributeValues] = useAttributes(initialAttributeValues());
    const { current, spendCoins, addCoins } = useCoins();
    const [takenDamage, setTakenDamage] = useState(0);
    const [usedStamina, setUsedStamina] = useState(0);

    // Derived attributes
    const maxHealth = getMaxHealth(attributes.Strength.value, attributes.Constitution.value);
    const maxStamina = getMaxStamina(attributes.Constitution.value, attributes.Dexterity.value);
    const damage = attributes.Strength.value * 2 + attributes.Dexterity.value;
    const stamina = maxStamina - usedStamina;
    const health = maxHealth - takenDamage;

    const reset = () => {
        spendCoins(current);
        setAttributeValues(initialAttributeValues());
        setName(getRandomName());
        setTakenDamage(0);
        setUsedStamina(0);
    };

    const damageHero = (damage: number) => {
        setTakenDamage((current) => current + damage);
    };

    const gameState: GameState = {
        coins: {
            current,
            spendCoins,
            addCoins,
        },
        hero: {
            name,
            attributes,
            bumpAttributeByType,
            changeName: (name: string) => setName(name),
            maxHealth,
            health,
            damage,
            maxStamina,
            stamina,
            damageHero,
        },
        reset,
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
