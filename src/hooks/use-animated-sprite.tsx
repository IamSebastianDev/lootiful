/** @format */

import { SpriteSheet } from "../data/sprite-data";
import { useSpriteSheet } from "./use-sprite-sheet";
import { useSpriteClock } from "./use-sprite-clock";

export type AnimatedSpriteConfig<T extends SpriteSheet> = {
    frames?: (keyof T["tileMap"])[];
    interval: number;
};

export const useAnimatedSprite = <T extends SpriteSheet>(sheet: T, { frames, interval }: AnimatedSpriteConfig<T>) => {
    const { getByKey } = useSpriteSheet(sheet);
    const frameList = (frames ?? Object.keys(sheet.tileMap)).map((key) => getByKey(key));

    const frame = useSpriteClock(interval);
    const sprite = frameList[frame % frameList.length];

    return sprite;
};
