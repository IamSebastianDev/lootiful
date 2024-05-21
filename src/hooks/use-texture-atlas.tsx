import { useEffect, useMemo, useState } from "react";
import { Texture } from "three";

type TextureAtlasOptions = {
    rows: number;
    tile: number;
    columns: number;
    src: string;
};

const createNewTexture = (size: number, image: HTMLImageElement, x: number, y: number) => {
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

export const useTextureAtlas = ({ rows, tile, columns, src }: TextureAtlasOptions) => {
    const image = new Image(columns * tile, rows * tile);

    const [loaded, setLoaded] = useState(false);
    const [atlas, setAtlas] = useState(new Map<string, Texture>());

    useEffect(() => {
        if (loaded) {
            return;
        }

        const handler = () => {
            setLoaded(true);
            const textures: [string, Texture][] = [];

            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < columns; y++) {
                    const key = `${x}:${y}`;
                    const texture = createNewTexture(tile, image, x, y);
                    textures.push([key, texture]);
                }
            }

            setAtlas(new Map(textures));
        };

        image.addEventListener("load", handler);
        image.src = src;

        return () => {
            image.removeEventListener("load", handler);
        };
    }, []);

    const get = (x: number, y: number) => {
        const key = `${x}:${y}`;
        if (!atlas.has(key)) {
            return null;
        }

        return atlas.get(key) as Texture;
    };

    console.log({ atlas });

    return { get, atlas, loaded };
};
