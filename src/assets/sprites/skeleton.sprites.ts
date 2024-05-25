import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import skeletonSprites from "./skeleton.png";
export default {
    id: "skeleton",
    src: skeletonSprites,
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
