/** @format */

import { MeshProps } from "@react-three/fiber";
import { SpriteSheet, useSpriteSheet } from "../../hooks/use-sprite-sheet";

export type SpriteProps<T extends SpriteSheet> = {
    sheet: T;
    sprite: keyof T["tileMap"];
    size?: [number, number];
} & MeshProps;
export const Sprite = <T extends SpriteSheet>({ size, sheet, sprite, ...props }: SpriteProps<T>) => {
    const spriteSheet = useSpriteSheet(sheet);
    const texture = spriteSheet.getByKey(sprite);

    const [width, height] = size ?? [1, 1];

    return (
        <mesh {...props}>
            <planeGeometry args={[width, height]} attach="geometry" />
            <meshBasicMaterial transparent attach="material" map={texture} />
        </mesh>
    );
};
