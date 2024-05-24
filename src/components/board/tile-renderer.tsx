/** @format */

import React from 'react';
import { MapDef } from '../../data/maps';
import { SpriteSheet } from '../../data/sprite-data';

export type TileDefinition<T extends SpriteSheet> = {
    position: [x: number, y: number, z: number];
    sheet: T;
    sprite: keyof T['tileMap'];
    key: string;
};
export type TileRendererProps<T extends SpriteSheet> = {
    map: MapDef<T>;
    renderer: (definition: TileDefinition<T>) => React.ReactNode;
};
export const TileRenderer = <T extends SpriteSheet>({ map, renderer }: TileRendererProps<T>) => {
    const tiles: React.ReactNode[] = [];

    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            tiles.push(
                renderer({
                    position: [x, y * -1, 0],
                    sheet: map.spriteSheet,
                    sprite: map.tiles[y * map.width + x],
                    key: `${x}:${y}`,
                })
            );
        }
    }

    return <group>{...tiles}</group>;
};
