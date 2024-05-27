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
import { useStats } from "./use-stats";
import { useSettings } from "./use-settings";
import { router } from "../main";
import { position } from "../functions/position";

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
    endDungeonDive: () => void;
    tick: number;
    requestTick: () => void;
    stopped: boolean;
    stats: ReturnType<typeof useStats>;
    settings: ReturnType<typeof useSettings>;
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
    const stats = useStats();
    const { tick, requestTick, reset: resetTicks } = useTick();
    const [stopped, setStopped] = useState(false);
    const settings = useSettings();

    const setupPlayerForLevel = () => {
        entityStore.addEntity(Player({ position: hero.position }));
    };

    // Create the enemies for the Level
    const setupEnemySpawnForLevel = () => {
        const amount = Math.floor(
            (hero.attributes.Strength.value * 2 + hero.attributes.Constitution.value) * settings.difficulty
        );
        // Balance enemies
        Array(clamp(2, Math.floor(amount), 15))
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(
                        Skeleton({
                            position: tile.position,
                            maxHealth: Math.round(2 + hero.attributes.Strength.value * 2 * settings.difficulty),
                            damage: Math.round(1 + hero.attributes.Strength.value * settings.difficulty),
                        })
                    );
                }
            });
        Array(clamp(12, Math.floor(amount / 3), 4))
            .fill(null)
            .forEach(() => {
                const tile = entityStore.getAvailableTile();
                if (tile) {
                    entityStore.addEntity(
                        Vampire({
                            position: entityStore.getAvailableTile().position,
                            maxHealth: Math.round(5 + hero.attributes.Strength.value * 2 * settings.difficulty),
                            damage: Math.round(3 + hero.attributes.Strength.value * 2 * settings.difficulty),
                        })
                    );
                }
            });
    };

    const setupTreasureForLevel = () => {
        const amount = hero.attributes.Intelligence.value * 2;
        Array(clamp(Math.floor(amount), 3, 15))
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
        setupEnemySpawnForLevel();
        setupTreasureForLevel();
        setupPlayerForLevel();
        setupArtifactsForLevel();
        setStopped(false);
        stats.trackRound();
        hero.setTired(false);
    };

    const endDungeonDive = () => {
        if (hero.stamina === 0) {
            hero.setTired(true);
        }

        if (hero.health === 0) {
            hero.setDead(true);
        }

        setStopped(true);
        hero.setup();
        entityStore.clear();
        lootStore.clear();
        cursor.setPosition(null);

        if (artifactStore.collectedArtifacts.length === Object.keys(artifactTable).length) {
            router.navigate({ to: "/game-over" });
        }
    };

    const reset = () => {
        resetTicks();
        coins.reset();
        hero.reset();
        stats.reset();
        startDungeonDive();
    };

    useEffect(() => {
        reset();
    }, []);

    if ((hero.stamina < 1 || hero.health < 1 || hero.dead) && !stopped) {
        endDungeonDive();
    }

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
        endDungeonDive,
        stopped,
        stats,
        settings,
    };

    // Update the entities
    useEffect(() => {
        if (hero.position.match(position(8, 0))) {
            return;
        }

        entityStore.entities.forEach((entity) => entity.update(gameState));
    }, [tick, hero.position]);

    return <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>;
};

export const useGame = () => {
    const ctx = useContext(GameStateContext);

    if (!ctx) {
        throw new Error(`GameState undefined.`);
    }

    return ctx;
};
