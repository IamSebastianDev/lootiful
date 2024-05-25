import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Attribute, useAttributes, attributeNames } from "./use-attributes";
import { useCoins } from "./use-coins";
import { getMaxHealth } from "../functions/get-max-health";
import { getMaxStamina } from "../functions/get-max-stamina";
import { getRandomEntry } from "../functions/get-random-entry";
import { names } from "../data/names";
import { useDungeonMap } from "./use-dungeon-map";
import dungeonMap from "../assets/maps/dungeon.map";
import { useEntityCollection } from "./use-entity-collection";
import { useCursor } from "./use-cursor";
import { useClock } from "./use-clock";
import { Position } from "../functions/position";
import { Loot, lootTable } from "../assets/entities/loot";
import { Skeleton } from "../assets/entities/skeleton";

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
    cursor: ReturnType<typeof useCursor>;
};

export const initialAttributeValues = () => {
    return Object.fromEntries(attributeNames.map((name) => [name, 1])) as Record<Attribute, number>;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [map] = useDungeonMap([dungeonMap]);
    const [name, setName] = useState<string | null>(getRandomEntry(names));
    const [attributes, bumpAttributeByType, setAttributeValues] = useAttributes(initialAttributeValues());
    const coins = useCoins();
    const [takenDamage, setTakenDamage] = useState(0);
    const [usedStamina, setUsedStamina] = useState(0);
    const entityStore = useEntityCollection(map);
    const { entities, ...entityMethods } = entityStore;
    const cursor = useCursor();
    const tick = useClock(0.1);

    // Update the entities
    useEffect(() => entities.forEach((entity) => entity.update(entityStore)), [tick]);

    // Derived attributes
    const maxHealth = getMaxHealth(attributes.Strength.value, attributes.Constitution.value);
    const maxStamina = getMaxStamina(attributes.Constitution.value, attributes.Dexterity.value);
    const damage = attributes.Strength.value * 2 + attributes.Dexterity.value;
    const stamina = Math.max(maxStamina - usedStamina, 0);
    const health = Math.max(maxHealth - takenDamage, 0);

    const createLoot = (position: Position) => {
        const entry = lootTable.getRandom();
        if (position && entry) {
            entityStore.addEntity(
                Loot({
                    position,
                    type: entry.key,
                    onPickUp: ({ id }) => {
                        entityStore.removeEntity(id);
                        coins.addCoins(entry.value);
                        cursor.setTooltip(null);
                    },
                    onPointerIn: ({ type, loot }) => cursor.setTooltip(`${type}: ${loot.value}`),
                    onPointerOut: () => cursor.setTooltip(null),
                })
            );
        }
    };

    // create x random enemys
    const createEnemiesForLevel = (amount: number) => {
        Array(amount)
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(Skeleton({ position: tile.position, createLoot }));
                }
            });
    };

    useEffect(() => {
        createEnemiesForLevel(5);
    }, []);

    const reset = () => {
        coins.spendCoins(coins.current);
        setAttributeValues(initialAttributeValues());
        setName(getRandomEntry(names));
        setTakenDamage(0);
        setUsedStamina(0);
        createEnemiesForLevel(5);
    };

    const damageHero = (damage: number) => {
        setTakenDamage((current) => current + damage);
    };

    const gameState: GameState = {
        entities: entityStore,
        reset,
        cursor,
        coins,
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
