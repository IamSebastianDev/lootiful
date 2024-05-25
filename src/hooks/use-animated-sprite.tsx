/** @format */

import { SpriteSheet, useSpriteSheet } from "./use-sprite-sheet";
import { useClock } from "./use-clock";

export type AnimatedSpriteConfig<T extends SpriteSheet> = {
    frames?: readonly (keyof T["tileMap"])[];
    interval: number;
};

export const useAnimatedSprite = <T extends SpriteSheet>(sheet: T, { frames, interval }: AnimatedSpriteConfig<T>) => {
    const { getByKey } = useSpriteSheet(sheet);
    const frameList = (frames ?? Object.keys(sheet.tileMap)).map((key) => getByKey(key));

    const frame = useClock(interval);
    const sprite = frameList[frame % frameList.length];

    return sprite;
};
