import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import coinSprites from "./coin.png";
export default {
    id: "coin",
    src: coinSprites,
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
