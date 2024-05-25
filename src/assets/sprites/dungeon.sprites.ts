import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import dungeonSprite from "./dungeon.png";

export default {
    id: "dungeon",
    src: dungeonSprite,
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
        ladder: [9, 3],
    },
} satisfies SpriteSheet;
