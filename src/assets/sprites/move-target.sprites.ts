import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import moveTargetSprites from "./move-target.png";
export default {
    id: "moveTarget",
    src: moveTargetSprites,
    size: 16,
    rows: 1,
    columns: 2,
    tileMap: {
        frame1: [0, 0],
        frame2: [1, 0],
    },
} satisfies SpriteSheet;
