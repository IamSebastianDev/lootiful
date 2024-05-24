/** @format */

import { useEffect, useState } from 'react';
import { Texture } from 'three';
import { SpriteSheet } from '../data/sprite-data';

const createNewTexture = (size: number, image: HTMLImageElement, x: number, y: number) => {
    // Create canvas to store new tile image
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    // Draw the tile to the canvas
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, x * size, y * size, size, size, 0, 0, size, size);

    // Create the texture from the created Canvas
    const tile = new Image();
    tile.src = canvas.toDataURL();
    const texture = new Texture(tile);
    texture.needsUpdate = true;

    return texture;
};

const createSprites = ({ rows, size, id, columns }: SpriteSheet, image: HTMLImageElement, onComplete: () => void) => {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            const key = `${id}@${x}:${y}`;

            if (!atlas.has(key)) {
                const texture = createNewTexture(size, image, x, y);
                atlas.set(key, texture);
            }
        }
    }

    onComplete();
};

const cache = new Map<string, HTMLImageElement>();
const atlas = new Map<string, Texture>();

export const useSpriteSheet = <T extends SpriteSheet>(spriteSheet: T) => {
    const { rows, size, columns, src, id, tileMap } = spriteSheet;
    let image: HTMLImageElement | undefined;
    if (!cache.has(src)) {
        image = new Image(columns * size, rows * size);
        image.src = src;
        cache.set(src, image);
    }

    image = cache.get(src);

    if (!image) {
        throw new Error(`Cache miss for spriteSheet: ${src}`);
    }

    const [loaded, setLoaded] = useState(image.complete);

    const processSpriteSheet = () => {
        createSprites(spriteSheet, image, () => {
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (loaded) {
            return;
        }

        image.addEventListener('load', processSpriteSheet);

        return () => {
            image.removeEventListener('load', processSpriteSheet);
        };
    }, []);

    const get = (x: number, y: number) => {
        const key = `${id}@${x}:${y}`;
        if (!atlas.has(key)) {
            return null;
        }

        return atlas.get(key) as Texture;
    };

    const getByKey = (key: keyof T['tileMap']) => {
        const tile = tileMap[key as string];
        if (!tile) return null;
        return get(...tile);
    };

    return { get, getByKey, atlas, loaded };
};

export const preloadSpriteSheet = (spriteSheet: SpriteSheet) => {
    const { src } = spriteSheet;
    const image = new Image();
    image.src = src;
    image.addEventListener('load', () => {
        createSprites(spriteSheet, image, () => {
            console.log(`Preloaded SpriteSheet: ${spriteSheet.id}`);
        });
        cache.set(src, image);
    });
};
