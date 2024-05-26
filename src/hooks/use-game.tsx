import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCoins } from "./use-coins";
import { useDungeonMap } from "./use-dungeon-map";
import dungeonMap from "../assets/maps/dungeon.map";
import { useEntityCollection } from "./use-entity-collection";
import { useCursor } from "./use-cursor";
import { useClock } from "./use-clock";
import { Position } from "../functions/position";
import { Loot, lootTable } from "../assets/entities/loot.entity";
import { Skeleton } from "../assets/entities/skeleton.entity";
import { Player } from "../assets/entities/player.entity";
import { useHero } from "./use-hero";
import dungeonSprites from "../assets/sprites/dungeon.sprites";

export type GameState = {
    coins: ReturnType<typeof useCoins>;
    hero: ReturnType<typeof useHero>;
    map: ReturnType<typeof useDungeonMap<typeof dungeonSprites>>;
    entityStore: ReturnType<typeof useEntityCollection>;
    cursor: ReturnType<typeof useCursor>;
    reset: () => void;
    setup: () => void;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const map = useDungeonMap([dungeonMap]);
    const hero = useHero();
    const coins = useCoins();
    const entityStore = useEntityCollection(map.currentMap);
    const cursor = useCursor();

    // Function to add Loot
    // todo: spread around target
    const createLoot = useCallback(
        (position: Position) => {
            const entry = lootTable.getRandom();
            if (position && entry) {
                entityStore.addEntity(
                    Loot({
                        position,
                        type: entry.key,
                    })
                );
            }
        },
        [entityStore, coins, cursor]
    );

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
                    entityStore.addEntity(Skeleton({ position: tile.position, createLoot }));
                }
            });
    };

    const reset = () => {
        coins.reset();
        hero.reset();
        entityStore.clear();
        setupEnemySpawnForLevel(hero.attributes.Strength.value * hero.attributes.Constitution.value);
        setupPlayerForLevel();
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
        reset,
        setup,
    };

    // Update the entities
    useEffect(
        () =>
            entityStore.entities.forEach((entity) => {
                console.log("updating");
                entity.update(gameState);
            }),
        [hero.position]
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
