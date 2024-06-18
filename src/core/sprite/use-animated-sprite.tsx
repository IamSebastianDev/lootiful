import { useClock } from "../clock";
import { SpriteMap, SpriteSheet, useSpriteSheet } from "../sprite-sheet";

export type AnimatedSpriteConfig<T extends SpriteMap> = {
    frames?: readonly (keyof T)[];
    interval: number;
};

export const useAnimatedSprite = <T extends SpriteMap>(
    sheet: SpriteSheet<T>,
    { frames, interval }: AnimatedSpriteConfig<T>
) => {
    const { getByKey } = useSpriteSheet(sheet);
    const frameList = (frames ?? Object.keys(sheet.map)).map((key) => getByKey(key));

    const frame = useClock(interval);
    const sprite = frameList[frame % frameList.length];

    return sprite;
};
