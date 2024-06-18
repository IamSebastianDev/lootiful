import { Texture } from "three";
import { SpriteSheet } from "./sprite-sheet";
import { SpriteMap, UseSpriteSheet } from "./use-sprite-sheet.types";
import { useEffect, useState } from "react";

const cache = new Map<string, HTMLImageElement>();
const atlas = new Map<string, Texture>();

const createNewTextureEntry = (size: number, image: HTMLImageElement, x: number, y: number) => {
    // Create canvas to store new tile image
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    // Draw the tile to the canvas
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, x * size, y * size, size, size, 0, 0, size, size);

    // Create the texture from the created Canvas
    const tile = new Image();
    tile.src = canvas.toDataURL();
    const texture = new Texture(tile);
    texture.needsUpdate = true;

    return texture;
};

const createSpriteSheetTexturesFromData = (spriteSheet: SpriteSheet<any>, image: HTMLImageElement) => {
    const { id, rows, columns, tile } = spriteSheet;
    return new Promise<void>((resolve) => {
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                const key = `${id}@${x}:${y}`;

                if (!atlas.has(key)) {
                    const texture = createNewTextureEntry(tile, image, x, y);
                    atlas.set(key, texture);
                }
            }
        }

        resolve();
    });
};

const useSpriteSheet = (<T extends SpriteMap>(spriteSheet: SpriteSheet<T>) => {
    const { id, resource, map } = spriteSheet;

    let image = new Image();
    if (!cache.has(resource)) {
        console.warn(`Cache miss for Sprite Sheet: ${id}`);
        image.src = resource;
    }

    const [loaded, setLoaded] = useState(image?.complete ?? false);

    const handleImageLoad = () => {
        createSpriteSheetTexturesFromData(spriteSheet, image).then(() => {
            cache.set(resource, image);
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (loaded) {
            return;
        }

        image.addEventListener("load", handleImageLoad);

        return () => {
            image.removeEventListener("load", handleImageLoad);
        };
    }, []);

    const get = (x: number, y: number) => {
        const key = `${id}@${x}:${y}`;
        if (!atlas.has(key)) {
            return null;
        }

        return atlas.get(key) as Texture;
    };

    const getByKey = (key: keyof T) => {
        const tile = map[key];
        if (!tile) return null;
        return get(tile[0], tile[1]);
    };

    return { get, getByKey, loaded, spriteSheet, atlas, cache };
}) as UseSpriteSheet;

// Create the preload function for the sprite sheet data
Object.defineProperty(useSpriteSheet, "preload", {
    value: <T extends SpriteMap>(spriteSheet: SpriteSheet<T>): Promise<void> => {
        return new Promise<void>((resolve) => {
            const { resource, columns, rows, tile } = spriteSheet;
            if (cache.has(resource)) {
                resolve();
            }

            const image = new Image(columns * tile, rows * tile);
            image.src = resource;
            image.addEventListener("load", () => {
                // create sprite data
                createSpriteSheetTexturesFromData(spriteSheet, image).then(() => {
                    cache.set(resource, image);
                    resolve();
                });
            });
        });
    },
});

export { useSpriteSheet };
