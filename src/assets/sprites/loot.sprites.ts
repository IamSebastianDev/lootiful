import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import lootSprite from "./loot.png";

export default {
    id: "loot",
    src: lootSprite,
    size: 16,
    rows: 11,
    columns: 11,
    tileMap: {
        skull1: [0, 0],
        skull2: [1, 1],
        skull3: [2, 1],
        skull4: [3, 1],
        skulls: [0, 1],
        unicornHorn: [3, 0],
        tentacle: [0, 6],
        slime: [9, 0],
        skullJar: [0, 10],
        ring1: [1, 2],
        ring2: [2, 2],
        ring3: [3, 2],
        ring4: [4, 2],
        ring5: [5, 2],
        ring6: [6, 2],
        ring7: [7, 2],
        ring8: [8, 2],
        ring9: [9, 2],
        bag1: [0, 10],
        bag2: [1, 10],
        bag3: [2, 10],
        bag4: [3, 10],
        boneShards1: [6, 9],
        boneShards2: [7, 9],
        bone1: [8, 9],
        bone2: [9, 9],
        bone3: [10, 9],
        brain: [10, 8],
    },
} satisfies SpriteSheet;