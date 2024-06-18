import { Texture } from "three";
import { SpriteSheet } from "./sprite-sheet";

export type SpriteMap = Record<string, [column: number, row: number]>;

export type SpriteSheetData<T extends SpriteMap> = {
    width: number;
    height: number;
    columns: number;
    rows: number;
    map: T;
};

export type SpriteSheetHook<T extends SpriteMap> = {
    get: (x: number, y: number) => Texture | null;
    getByKey: (key: keyof T) => Texture | null;
    loaded: boolean;
    spriteSheet: SpriteSheet<T>;
    atlas: Map<string, Texture>;
    cache: Map<string, HTMLImageElement>;
};

export type UseSpriteSheet = {
    <T extends SpriteMap>(spriteSheet: SpriteSheet<T>): SpriteSheetHook<T>;
    preload: (spriteSheet: SpriteSheet<any>) => Promise<void>;
};
