export type TileAtlas = {
    size: number;
    rows: number;
    columns: number;
    id: string;
    src: string;
    tileMap: { [key: string]: [number, number] };
};

import dungeonTiles from "../assets/images/tileset.png";
export const dungeonTileSet = {
    id: "dungeon",
    src: dungeonTiles,
    size: 16,
    rows: 10,
    columns: 10,
    tileMap: {
        wall_left_1: [0, 0],
        wall_left_2: [1, 0],
        wall_right_1: [0, 5],
        wall_right_2: [1, 5],
        wall_top_1: [0, 1],
        wall_top_2: [0, 2],
        wall_top_3: [0, 3],
        wall_bottom_1: [4, 1],
        wall_bottom_2: [4, 2],
        wall_corner_l: [4, 0],
        wall_corner_r: [4, 5],
        floor_1: [1, 1],
        floor_2: [1, 2],
        floor_3: [2, 1],
        floor_4: [2, 2],
    },
} satisfies TileAtlas;
