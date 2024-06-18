import { SpriteSheet } from "../../core/sprite-sheet";
import water from "./water.png";
export default new SpriteSheet("water", water, {
    columns: 4,
    rows: 1,
    width: 64,
    height: 16,
    map: {
        1: [0, 0],
        2: [1, 0],
        3: [2, 0],
        4: [3, 0],
    },
});
