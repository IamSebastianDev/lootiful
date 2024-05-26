import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCoins } from "./use-coins";
import { useDungeonMap } from "./use-dungeon-map";
import dungeonMap from "../assets/maps/dungeon.map";
import { useEntityCollection } from "./use-entity-collection";
import { useCursor } from "./use-cursor";
import { Skeleton } from "../assets/entities/skeleton.entity";
import { Player } from "../assets/entities/player.entity";
import { useHero } from "./use-hero";
import dungeonSprites from "../assets/sprites/dungeon.sprites";
import { Vampire } from "../assets/entities/vampire.entity";
import { useLoot } from "./use-loot";
import { useTick } from "./use-tick";
import { Treasure } from "../assets/entities/treasure.entity";

export type GameState = {
    coins: ReturnType<typeof useCoins>;
    hero: ReturnType<typeof useHero>;
    map: ReturnType<typeof useDungeonMap<typeof dungeonSprites>>;
    entityStore: ReturnType<typeof useEntityCollection>;
    cursor: ReturnType<typeof useCursor>;
    lootStore: ReturnType<typeof useLoot>;
    reset: () => void;
    setup: () => void;
    tick: number;
    requestTick: () => void;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const map = useDungeonMap([dungeonMap]);
    const hero = useHero();
    const coins = useCoins();
    const entityStore = useEntityCollection(map.currentMap);
    const cursor = useCursor();
    const lootStore = useLoot(map);
    const { tick, requestTick } = useTick();

    const setupPlayerForLevel = () => {
        entityStore.addEntity(Player({ position: hero.position }));
    };

    // Create the enemies for the Level
    const setupEnemySpawnForLevel = (amount: number) => {
        Array(amount)
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(Skeleton({ position: tile.position }));
                }
            });
        entityStore.addEntity(Vampire({ position: entityStore.getAvailableTile().position }));
    };

    const setupCoinsForLevel = (amount: number) => {
        Array(amount)
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(Treasure({ position: tile.position, type: "coins3" }));
                }
            });
    };

    const reset = () => {
        coins.reset();
        hero.reset();
        entityStore.clear();
        setupEnemySpawnForLevel(hero.attributes.Strength.value * hero.attributes.Constitution.value);
        setupPlayerForLevel();
        setupCoinsForLevel(hero.attributes.Charisma.value ^ 2);
    };

    // Called at start of run
    const setup = () => {};

    useEffect(() => {
        reset();
    }, []);

    const gameState: GameState = {
        entityStore,
        cursor,
        coins,
        hero,
        map,
        lootStore,
        reset,
        setup,
        tick,
        requestTick,
    };

    // Update the entities
    useEffect(
        () => entityStore.entities.forEach((entity) => entity.update(gameState)),
        [hero.position, hero.stamina, tick]
    );

    return <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>;
};

export const useGame = () => {
    const ctx = useContext(GameStateContext);

    if (!ctx) {
        throw new Error(`GameState undefined.`);
    }

    return ctx;
};
