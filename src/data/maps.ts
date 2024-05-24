/** @format */

import { SpriteSheet, dungeonSprites } from './sprite-data';
export type MapDef<T extends SpriteSheet> = {
    name: string;
    width: number;
    height: number;
    spriteSheet: T;
    tiles: (keyof T['tileMap'])[];
};

export const dungeonMap: MapDef<typeof dungeonSprites> = {
    name: 'dungeon',
    width: 15,
    height: 15,
    spriteSheet: dungeonSprites,
    // prettier-ignore
    tiles: [
        "wall_left_1",      "wall_top_2",       "wall_top_1",       "wall_top_3",       "wall_top_2",       "wall_top_3","wall_top_1",       "wall_top_3",       "wall_top_2","wall_top_1",       "wall_top_1",       "wall_top_3",
        "wall_top_1",       "wall_top_2",       "wall_right_1",
        
        "wall_left_1",      "floor_2",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_3",          "floor_3", "floor_3",          "floor_3",          "floor_3", "floor_2",          "floor_3",          "wall_right_1",

        "wall_left_1",      "floor_2",          "floor_2",          "floor_2",          "floor_3",          "floor_1", "floor_1",          "floor_2",          "floor_2", "floor_3",          "floor_3",          "floor_2", "floor_2",          "floor_1",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",

        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",
        
        "wall_left_1",      "floor_1",          "floor_2",          "floor_2",          "floor_2",          "floor_1", "floor_1",          "floor_1",          "floor_1", "floor_1",          "floor_1",          "floor_2", "floor_2",          "floor_2",          "wall_right_1",
        
        "wall_corner_l",    "wall_bottom_1",    "wall_bottom_1",          "wall_bottom_1",    "wall_bottom_1",    "wall_bottom_1", "wall_bottom_1",    "wall_bottom_1",    "wall_bottom_1", "wall_bottom_1",    "wall_bottom_1",    "wall_bottom_1", "wall_bottom_1",    "wall_bottom_1",    "wall_corner_r",
        
       
    ],
};
