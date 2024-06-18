import { SpriteSheet } from "../../core/sprite-sheet";
import grass from "./grass.png";
export default new SpriteSheet("grass", grass, {
    rows: 7,
    columns: 11,
    width: 176,
    height: 112,
    map: {
        "edge-90-left-top": [0, 0],
        "edge-top": [1, 0],
        "edge-90-right-top": [2, 0],
        "edge-left": [0, 1],
        "full-flat": [1, 1],
        "edge-right": [2, 1],
        "edge-90-bottom-left": [0, 2],
        "edge-bottom": [1, 2],
        "edge-90-bottom-right": [2, 2],
    },
});
