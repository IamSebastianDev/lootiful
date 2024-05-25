import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import lootSprite from "./loot.png";

export default {
    id: "loot",
    src: lootSprite,
    size: 16,
    rows: 1,
    columns: 1,
    tileMap: {
        bone: [0, 0],
    },
} satisfies SpriteSheet;
