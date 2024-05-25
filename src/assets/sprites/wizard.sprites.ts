import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import wizardSpriteSheet from "./wizard.png";
export default {
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
