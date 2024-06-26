/** @format */

import { MeshProps } from "@react-three/fiber";
import { AnimatedSpriteConfig, useAnimatedSprite } from "../../hooks/use-animated-sprite";
import { SpriteSheet } from "../../hooks/use-sprite-sheet";

export type AnimatedSpriteProps<T extends SpriteSheet> = {
    size?: [number, number];
    sheet: T;
    config: AnimatedSpriteConfig<T>;
    opacity?: number;
} & MeshProps;

export const AnimatedSprite = <T extends SpriteSheet>({ size, sheet, config, ...props }: AnimatedSpriteProps<T>) => {
    const texture = useAnimatedSprite(sheet, config);
    const [width, height] = size ?? [1, 1];

    return (
        <mesh receiveShadow castShadow {...props}>
            <planeGeometry args={[width, height]} attach="geometry" />
            <meshStandardMaterial transparent attach="material" map={texture} opacity={props.opacity} />
        </mesh>
    );
};
