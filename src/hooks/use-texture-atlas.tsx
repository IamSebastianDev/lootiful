import { useEffect, useState } from "react";
import { Texture } from "three";
import { TileAtlas } from "../data/tile-atlas";

const createNewTexture = (size: number, image: HTMLImageElement, x: number, y: number) => {
    // Create canvas to store new tile image
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    // Draw the tile to the canvas
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, y * size, x * size, size, size, 0, 0, size, size);

    // Create the texture from the created Canvas
    const tile = new Image();
    tile.src = canvas.toDataURL();
    const texture = new Texture(tile);
    texture.needsUpdate = true;

    return texture;
};

const atlas = new Map<string, Texture>();

export const useTextureAtlas = <T extends TileAtlas>({ rows, size, columns, src, id, tileMap }: T) => {
    const image = new Image(columns * size, rows * size);
    image.src = src;

    const [loaded, setLoaded] = useState(false);

    const load = () => {
        setLoaded(true);

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                const key = `${id}@${x}:${y}`;

                if (!atlas.has(key)) {
                    const texture = createNewTexture(size, image, x, y);
                    atlas.set(key, texture);
                }
            }
        }
    };

    useEffect(() => {
        if (loaded) {
            return;
        }

        image.addEventListener("load", load);

        return () => {
            image.removeEventListener("load", load);
        };
    }, []);

    const get = (x: number, y: number) => {
        const key = `${id}@${x}:${y}`;
        if (!atlas.has(key)) {
            return null;
        }

        return atlas.get(key) as Texture;
    };

    const getByKey = (key: keyof T["tileMap"]) => {
        const tile = tileMap[key as string];
        if (!tile) return null;
        return get(...tile);
    };

    return { get, getByKey, atlas, loaded };
};
