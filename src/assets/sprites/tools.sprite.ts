import { SpriteSheet } from "../../core/sprite-sheet";
import tools from "./tools.png";
export default new SpriteSheet("tools", tools, {
    rows: 6,
    columns: 6,
    width: 96,
    height: 96,
    map: {
        axe1: [0, 3],
    },
});
