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
    tiles: [
        {
            id: crypto.randomUUID(),
            position: [0, 0],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 0],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 0],
            textureKey: 'wall_left_1',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 0],
            textureKey: 'wall_top_3',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 0],
            textureKey: 'wall_top_2',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 0],
            textureKey: 'wall_top_2',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 0],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 0],
            textureKey: 'wall_top_2',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 0],
            textureKey: 'wall_right_2',
        },
        // Y1
        {
            id: crypto.randomUUID(),
            position: [0, 1],
            textureKey: 'wall_left_1',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 1],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 1],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 1],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 1],
            textureKey: 'wall_right_2',
        },
        // Y2
        {
            id: crypto.randomUUID(),
            position: [0, 2],
            textureKey: 'wall_left_1',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 2],
            textureKey: 'floor_2',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 2],
            textureKey: 'floor_2',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 2],
            textureKey: 'floor_3',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 2],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 2],
            textureKey: 'wall_right_2',
        },
        // Y3
        {
            id: crypto.randomUUID(),
            position: [0, 3],
            textureKey: 'wall_left_2',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 3],
            textureKey: 'floor_3',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 3],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 3],
            textureKey: 'wall_right_1',
        },
        // Y4
        {
            id: crypto.randomUUID(),
            position: [0, 4],
            textureKey: 'wall_left_2',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 4],
            textureKey: 'floor_3',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 4],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 4],
            textureKey: 'wall_right_1',
        },
        // Y5
        {
            id: crypto.randomUUID(),
            position: [0, 5],
            textureKey: 'wall_left_1',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 5],
            textureKey: 'floor_1',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 5],
            textureKey: 'floor_1',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 5],
            textureKey: 'floor_1',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 5],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 5],
            textureKey: 'wall_right_2',
        },
        // Y6
        {
            id: crypto.randomUUID(),
            position: [0, 6],
            textureKey: 'wall_left_1',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 6],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 6],
            textureKey: 'wall_corner_inner_r',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 6],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 6],
            textureKey: 'wall_bottom_2',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 6],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 6],
            textureKey: 'wall_corner_r',
        },
        // Y7
        {
            id: crypto.randomUUID(),
            position: [0, 7],
            textureKey: 'wall_left_1',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 7],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 7],
            textureKey: 'wall_right_1',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 7],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 7],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 7],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 7],
            textureKey: 'void',
        },
        // Y8
        {
            id: crypto.randomUUID(),
            position: [0, 8],
            textureKey: 'wall_corner_l',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 8],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 8],
            textureKey: 'wall_corner_inner_l',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 8],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 8],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 8],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 8],
            textureKey: 'floor_2',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 8],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 8],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 8],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 8],
            textureKey: 'wall_right_1',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 8],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 8],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 8],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 8],
            textureKey: 'void',
        },
        // Y9
        {
            id: crypto.randomUUID(),
            position: [0, 9],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 9],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 9],
            textureKey: 'wall_left_2',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 9],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 9],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 9],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 9],
            textureKey: 'floor_3',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 9],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 9],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 9],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 9],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 9],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 9],
            textureKey: 'wall_top_1',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 9],
            textureKey: 'wall_right_2',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 9],
            textureKey: 'void',
        },
        // Y10
        {
            id: crypto.randomUUID(),
            position: [0, 10],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 10],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 10],
            textureKey: 'wall_left_2',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 10],
            textureKey: 'floor_1',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 10],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 10],
            textureKey: 'wall_right_2',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 10],
            textureKey: 'void',
        },
        // Y11
        {
            id: crypto.randomUUID(),
            position: [0, 11],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 11],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 11],
            textureKey: 'wall_left_2',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 11],
            textureKey: 'floor_2',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 11],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 11],
            textureKey: 'wall_right_2',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 11],
            textureKey: 'void',
        },
        // Y12
        {
            id: crypto.randomUUID(),
            position: [0, 12],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 12],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 12],
            textureKey: 'wall_left_2',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 12],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 12],
            textureKey: 'wall_right_2',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 12],
            textureKey: 'void',
        },
        // Y13
        {
            id: crypto.randomUUID(),
            position: [0, 13],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 13],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 13],
            textureKey: 'wall_corner_l',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 13],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 13],
            textureKey: 'wall_bottom_2',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 13],
            textureKey: 'wall_corner_inner_l',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 13],
            textureKey: 'floor_4',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 13],
            textureKey: 'wall_right_2',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 13],
            textureKey: 'void',
        },
        // Y14
        {
            id: crypto.randomUUID(),
            position: [0, 14],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [1, 14],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [2, 14],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [3, 14],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [4, 14],
            textureKey: 'void',
        },
        {
            id: crypto.randomUUID(),
            position: [5, 14],
            textureKey: 'wall_corner_l',
        },
        {
            id: crypto.randomUUID(),
            position: [6, 14],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [7, 14],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [8, 14],
            textureKey: 'wall_bottom_2',
        },
        {
            id: crypto.randomUUID(),
            position: [9, 14],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [10, 14],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [11, 14],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [12, 14],
            textureKey: 'wall_bottom_1',
        },
        {
            id: crypto.randomUUID(),
            position: [13, 14],
            textureKey: 'wall_corner_r',
        },
        {
            id: crypto.randomUUID(),
            position: [14, 14],
            textureKey: 'void',
        },
    ],
};
