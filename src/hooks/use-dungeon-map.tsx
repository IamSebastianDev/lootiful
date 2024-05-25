/** @format */

import { useState } from "react";
import { SpriteSheet } from "./use-sprite-sheet";
import { Position } from "../functions/position";

export type TileData<T extends SpriteSheet> = {
    id: string;
    position: Position;
    textureKey: keyof T["tileMap"];
    isMoveTarget: boolean;
    isSpawnTile: boolean;
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

    const getSpawnTiles = () => tiles.filter((tile) => tile.isSpawnTile);

    return { name, width, height, sheet, tiles, getSpawnTiles };
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
