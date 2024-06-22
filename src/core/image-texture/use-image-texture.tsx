import { useEffect, useState } from "react";
import { ImageTexture } from "./image-texture";
import { UseImageTexture } from "./use-image-texture.types";

const cache = new Map<string, ImageTexture>();

export const useImageTexture = ((src: string, onLoad?: () => void) => {
    const [loaded, setLoaded] = useState(false);
    const imageTexture = new ImageTexture(src);
    imageTexture.load(onLoad ?? (() => {}));

    // useEffect(() => {
    //     if (!loaded) {
    //         if (imageTexture.loaded) {
    //             setLoaded(true);
    //         }
    //     }

    //     imageTexture.texture.needsUpdate = true;
    // }, [loaded]);

    return imageTexture;
}) as UseImageTexture;

// Create the preload function for the sprite sheet data
Object.defineProperty(useImageTexture, "preload", {
    value: (src: string): Promise<void> => {
        return new Promise<void>((resolve) => {
            if (cache.has(src)) {
                resolve();
            }

            const texture = new ImageTexture(src);
            texture.load(() => {
                cache.set(src, texture);
                resolve();
            });
        });
    },
});
