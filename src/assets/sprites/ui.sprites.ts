import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import uiSprites from "./ui.png";
export default {
    id: "ui",
    src: uiSprites,
    size: 128,
    rows: 9,
    columns: 10,
    tileMap: {
        menu: [1, 0],
        settings: [5, 2],
    },
} satisfies SpriteSheet;
