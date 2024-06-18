/** @format */

import { MeshProps } from "@react-three/fiber";
import { SpriteMap, SpriteSheet } from "../sprite-sheet";
import { AnimatedSpriteConfig, useAnimatedSprite } from "./use-animated-sprite";

export type AnimatedSpriteProps<T extends SpriteMap> = {
    size?: [number, number];
    sheet: SpriteSheet<T>;
    config: AnimatedSpriteConfig<T>;
    opacity?: number;
} & MeshProps;

export const AnimatedSprite = <T extends SpriteMap>({ size, sheet, config, ...props }: AnimatedSpriteProps<T>) => {
    const texture = useAnimatedSprite(sheet, config);
    const [width, height] = size ?? [1, 1];

    return (
        <mesh receiveShadow castShadow {...props}>
            <planeGeometry args={[width, height]} attach="geometry" />
            <meshStandardMaterial transparent attach="material" map={texture} opacity={props.opacity ?? 1} />
        </mesh>
    );
};
