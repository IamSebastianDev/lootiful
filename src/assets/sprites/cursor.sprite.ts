import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import cursorSprite from "./cursor.png";

export default {
    id: "cursor",
    src: cursorSprite,
    size: 16,
    rows: 3,
    columns: 2,
    tileMap: {
        info1: [0, 0],
        info2: [1, 0],
        error1: [0, 1],
        error2: [1, 1],
        ok1: [0, 2],
        ok2: [1, 2],
    },
} satisfies SpriteSheet;
