/** @format */

import { MeshProps } from '@react-three/fiber';
import { SpriteSheet } from '../../data/sprite-data';
import { AnimatedSpriteConfig, useAnimatedSprite } from '../../hooks/use-animated-sprite';

export type AnimatedSpriteProps<T extends SpriteSheet> = {
    size?: [number, number];
    sheet: T;
    config: AnimatedSpriteConfig<T>;
} & MeshProps;

export const AnimatedSprite = <T extends SpriteSheet>({ size, sheet, config, ...props }: AnimatedSpriteProps<T>) => {
    const texture = useAnimatedSprite(sheet, config);
    const [width, height] = size ?? [1, 1];

    return (
        <mesh {...props}>
            <planeGeometry args={[width, height]} attach="geometry" />
            <meshBasicMaterial transparent attach="material" map={texture} />
        </mesh>
    );
};
