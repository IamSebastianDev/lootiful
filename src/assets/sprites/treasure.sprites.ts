import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import treasureSprites from "./treasure.png";
export default {
    id: "treasure",
    src: treasureSprites,
    size: 16,
    rows: 3,
    columns: 4,
    tileMap: {
        coin: [0, 0],
        coins: [1, 0],
        coins2: [2, 0],
        coins3: [3, 0],
        coins4: [0, 1],
        treasure: [1, 2],
    },
} satisfies SpriteSheet;
