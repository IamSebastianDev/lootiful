import { SpriteMap, SpriteSheetData } from "./use-sprite-sheet.types";

export class SpriteSheet<T extends SpriteMap> {
    constructor(
        public readonly id: string,
        public readonly resource: string,
        public readonly data: SpriteSheetData<T>
    ) {}

    get columns() {
        return this.data.columns;
    }

    get rows() {
        return this.data.rows;
    }

    get map() {
        return this.data.map;
    }

    get width() {
        return this.data.width;
    }

    get height() {
        return this.data.height;
    }

    get tile(): number {
        const tileWidth = this.data.width / this.columns;
        const tileHeight = this.data.height / this.rows;

        if (tileWidth !== tileHeight) {
            console.warn(`Sprite Sheet: "${this.id}" has a non-uniform tile size of ${tileWidth} / ${tileHeight}`);
        }

        return tileWidth;
    }
}
