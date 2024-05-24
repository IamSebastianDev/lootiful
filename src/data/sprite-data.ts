/** @format */
import dungeonSpriteSheet from "../assets/images/sprites/dungeon.png";
import skeletonSpriteSheet from "../assets/images/sprites/skeleton.png";
import wizardSpriteSheet from "../assets/images/sprites/wizard.png";
import coinSpriteSheet from "../assets/images/sprites/coin.png";

export type SpriteSheet = {
    size: number;
    rows: number;
    columns: number;
    id: string;
    src: string;
    tileMap: { [key: string]: [number, number] };
};

export const dungeonSprites = {
    id: "dungeon",
    src: dungeonSpriteSheet,
    size: 16,
    rows: 10,
    columns: 10,
    tileMap: {
        void: [8, 7],
        wall_left_1: [0, 0],
        wall_left_2: [0, 1],
        wall_right_1: [5, 0],
        wall_right_2: [5, 0],
        wall_top_1: [1, 0],
        wall_top_2: [2, 0],
        wall_top_3: [3, 0],
        wall_bottom_1: [1, 4],
        wall_bottom_2: [2, 4],
        wall_corner_l: [0, 4],
        wall_corner_r: [5, 4],
        wall_corner_inner_r: [0, 5],
        wall_corner_inner_l: [3, 5],
        floor_1: [1, 1],
        floor_2: [2, 1],
        floor_3: [1, 2],
        floor_4: [2, 2],
        flag: [4, 7],
        chest: [0, 8],
    },
} satisfies SpriteSheet;

export const skeletonSprites = {
    id: "skeleton",
    src: skeletonSpriteSheet,
    size: 16,
    rows: 1,
    columns: 4,
    tileMap: {
        frame1: [0, 0],
        frame2: [1, 0],
        frame3: [2, 0],
        frame4: [3, 0],
    },
} satisfies SpriteSheet;

export const heroSprites = {
    id: "hero",
    src: wizardSpriteSheet,
    size: 16,
    rows: 1,
    columns: 4,
    tileMap: {
        frame1: [0, 0],
        frame2: [1, 0],
        frame3: [2, 0],
        frame4: [3, 0],
    },
} satisfies SpriteSheet;

export const coinSprites = {
    id: "coin",
    src: coinSpriteSheet,
    size: 16,
    rows: 1,
    columns: 5,
    tileMap: {
        frame1: [0, 0],
        frame2: [1, 0],
        frame3: [2, 0],
        frame4: [3, 0],
    },
} satisfies SpriteSheet;
