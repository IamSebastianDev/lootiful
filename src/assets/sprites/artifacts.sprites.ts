import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import artifactSprites from "./artifacts.png";
export default {
    id: "artifact",
    src: artifactSprites,
    size: 16,
    rows: 4,
    columns: 4,
    tileMap: {
        sword: [0, 0],
        armor: [1, 0],
        ring: [2, 0],
        helmet: [3, 0],
        flask: [0, 1],
        vial: [1, 1],
        bottle: [2, 1],
        strawberry: [0, 2],
        beet: [2, 2],
        steak: [3, 2],
        slab: [0, 3],
        wood: [1, 3],
        honey: [2, 3],
        crystal: [3, 3],
    },
} satisfies SpriteSheet;
