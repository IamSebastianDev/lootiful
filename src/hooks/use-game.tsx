import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
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
import { Treasure, stash } from "../assets/entities/treasure.entity";
import { rnd } from "../functions/rnd";
import { clamp } from "../functions/clamp";
import { artifactTable, useArtifacts } from "./use-artifacts";
import { Artifact } from "../assets/entities/artifact.entity";
import { useSFX } from "./use-sfx";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { router } from "../main";

export type GameState = {
    cursor: ReturnType<typeof useCursor>;
    coins: ReturnType<typeof useCoins>;
    hero: ReturnType<typeof useHero>;
    map: ReturnType<typeof useDungeonMap<typeof dungeonSprites>>;
    entityStore: ReturnType<typeof useEntityCollection>;
    lootStore: ReturnType<typeof useLoot>;
    artifactStore: ReturnType<typeof useArtifacts>;
    reset: () => void;
    startDungeonDive: () => void;
    tick: number;
    requestTick: () => void;
    stopped: boolean;
};

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const map = useDungeonMap([dungeonMap]);
    const hero = useHero();
    const coins = useCoins();
    const entityStore = useEntityCollection(map.currentMap);
    const cursor = useCursor();
    const lootStore = useLoot(map);
    const artifactStore = useArtifacts();
    const { tick, requestTick } = useTick();
    const [stopped, setStopped] = useState(false);

    const setupPlayerForLevel = () => {
        entityStore.addEntity(Player({ position: hero.position }));
    };

    // Create the enemies for the Level
    const setupEnemySpawnForLevel = (amount: number) => {
        // Balance enemies
        Array(clamp(1, Math.floor(amount), 15))
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(
                        Skeleton({
                            position: tile.position,
                            maxHealth: 2 + hero.attributes.Strength.value * 2,
                        })
                    );
                }
            });
        Array(clamp(1, Math.floor(amount / 3), 3))
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(
                        Vampire({
                            position: entityStore.getAvailableTile().position,
                            maxHealth: 5 + hero.attributes.Strength.value * 2,
                        })
                    );
                }
            });
    };

    const setupCoinsForLevel = (amount: number) => {
        Array(clamp(Math.floor(amount), 3, 12))
            .fill(null)
            .map(() => rnd.entry(Object.keys(stash)))
            .forEach((type) => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(
                        Treasure({
                            position: tile.position,
                            type: type as keyof typeof stash,
                        })
                    );
                }
            });
    };

    const setupArtifactsForLevel = () => {
        // create a artifact
        const { position } = entityStore.getAvailableTile();
        const artifact = artifactStore.getArtifactByChance();
        if (position && artifact) {
            entityStore.addEntity(Artifact({ type: artifact.sprite, position }));
        }
    };

    // Called at start of run
    const startDungeonDive = () => {
        entityStore.clear();
        setupEnemySpawnForLevel((hero.attributes.Strength.value * hero.attributes.Constitution.value) / 5);
        setupCoinsForLevel((hero.attributes.Charisma.value * hero.attributes.Dexterity.value) / 3);
        setupPlayerForLevel();
        setupArtifactsForLevel();
        setStopped(false);
    };

    const endDungeonDive = () => {
        setStopped(true);
        hero.setup();
        entityStore.clear();
        lootStore.clear();
        cursor.setPosition(null);

        if (artifactStore.collectedArtifacts.length === Object.keys(artifactTable).length) {
            Navigate({ to: "/win" });
        }
    };

    const reset = () => {
        coins.reset();
        hero.reset();
        startDungeonDive();
    };

    useEffect(() => {
        reset();
    }, []);

    const gameState: GameState = {
        entityStore,
        artifactStore,
        cursor,
        coins,
        hero,
        map,
        lootStore,
        reset,
        tick,
        requestTick,
        startDungeonDive,
        stopped,
    };

    // Update the entities
    useEffect(() => {
        entityStore.entities.forEach((entity) => entity.update(gameState));

        if (hero.stamina === 0 || hero.health === 0) {
            endDungeonDive();
        }
    }, [hero.position, hero.stamina, tick]);

    return <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>;
};

export const useGame = () => {
    const ctx = useContext(GameStateContext);

    if (!ctx) {
        throw new Error(`GameState undefined.`);
    }

    return ctx;
};
