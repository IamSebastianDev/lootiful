import React, { ReactNode, createContext, useContext, useState } from "react";
import { Attribute, useAttributes, attributeNames } from "./use-attributes";
import { useCoins } from "./use-coins";
import { getMaxHealth } from "../functions/get-max-health";
import { getMaxStamina } from "../functions/get-max-stamina";
import { getRandomEntry } from "../functions/get-random-entry";
import { names } from "../data/names";
import { useDungeonMap } from "./use-dungeon-map";
import dungeonMap from "../assets/maps/dungeon.map";
import { useEntityCollection } from "./use-entity-collection";

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
    map: typeof dungeonMap;
    entities: ReturnType<typeof useEntityCollection>;
};

export const initialAttributeValues = () => {
    return Object.fromEntries(attributeNames.map((name) => [name, 1])) as Record<Attribute, number>;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [map] = useDungeonMap([dungeonMap]);
    const [name, setName] = useState<string | null>(getRandomEntry(names));
    const [attributes, bumpAttributeByType, setAttributeValues] = useAttributes(initialAttributeValues());
    const { current, spendCoins, addCoins } = useCoins();
    const [takenDamage, setTakenDamage] = useState(0);
    const [usedStamina, setUsedStamina] = useState(0);
    const { addEntity, removeEntity, entities, getAvailableTile } = useEntityCollection(map);

    // Derived attributes
    const maxHealth = getMaxHealth(attributes.Strength.value, attributes.Constitution.value);
    const maxStamina = getMaxStamina(attributes.Constitution.value, attributes.Dexterity.value);
    const damage = attributes.Strength.value * 2 + attributes.Dexterity.value;
    const stamina = Math.max(maxStamina - usedStamina, 0);
    const health = Math.max(maxHealth - takenDamage, 0);

    const reset = () => {
        spendCoins(current);
        setAttributeValues(initialAttributeValues());
        setName(getRandomEntry(names));
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
        map,
        reset,
        entities: {
            addEntity,
            removeEntity,
            entities,
            getAvailableTile,
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
