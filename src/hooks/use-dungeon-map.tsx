/** @format */

import { useState } from "react";
import { SpriteSheet } from "./use-sprite-sheet";

export type TileData<T extends SpriteSheet> = {
    id: string;
    position: [x: number, y: number];
    textureKey: keyof T["tileMap"];
    enableMoveTo: boolean;
    enableSpawn: boolean;
};

export type MapData<T extends SpriteSheet> = {
    name: string;
    width: number;
    height: number;
    sheet: T;
    tiles: TileData<T>[];
};

export const createMap = <T extends SpriteSheet>(map: MapData<T>) => {
    const { name, width, height, sheet, tiles } = map;
    return { name, width, height, sheet, tiles };
};

export const useDungeonMap = <T extends SpriteSheet>(maps: ReturnType<typeof createMap<T>>[]) => {
    const [currentMap, setCurrentMap] = useState(maps[0]);

    const setMap = (key: string) => {
        const map = maps.find(({ name }) => name === key);
        if (!map) {
            setCurrentMap(maps[0]);
        }
    };

    return [currentMap, setMap] as const;
};
