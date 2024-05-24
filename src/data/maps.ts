/** @format */

import { SpriteSheet, dungeonSprites } from './sprite-data';

export type TileData<T extends SpriteSheet> = {
    id: string;
    position: [x: number, y: number];
    textureKey: keyof T['tileMap'];
};
export type MapDef<T extends SpriteSheet> = {
    name: string;
    width: number;
    height: number;
    spriteSheet: T;
    tiles: TileData<T>[];
};

export const dungeonMap: MapDef<typeof dungeonSprites> = {
    name: 'dungeon',
    width: 15,
    height: 15,
    spriteSheet: dungeonSprites,
    // prettier-ignore
    tiles: [
        {
            id: crypto.randomUUID(),
            position: [0, 0], 
            textureKey: 'wall_left_1'
        },
        {
            id: crypto.randomUUID(),
            position: [1, 0], 
            textureKey: 'wall_top_2'
        },
        {
            id: crypto.randomUUID(),
            position: [2, 0], 
            textureKey: 'wall_top_2'
        },
        {
            id: crypto.randomUUID(),
            position: [3, 0], 
            textureKey: 'wall_top_3'
        },
        {
            id: crypto.randomUUID(),
            position: [4, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [5, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [6, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [7, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [8, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [9, 0], 
            textureKey: 'wall_top_2'
        },
        {
            id: crypto.randomUUID(),
            position: [10, 0], 
            textureKey: 'wall_top_2'
        },
        {
            id: crypto.randomUUID(),
            position: [11, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [12, 0], 
            textureKey: 'wall_top_1'
        },
        {
            id: crypto.randomUUID(),
            position: [13, 0], 
            textureKey: 'wall_top_2'
        },
        {
            id: crypto.randomUUID(),
            position: [14, 0], 
            textureKey: 'wall_right_2'
        },
    ],
};
