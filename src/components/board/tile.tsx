/** @format */

import { MeshProps, useFrame } from '@react-three/fiber';
import { SpriteSheet } from '../../data/sprite-data';
import { useSpriteSheet } from '../../hooks/use-sprite-sheet';
import { useRef } from 'react';

export type TileProps<T extends SpriteSheet> = {
    size?: [width: number, height: number];
    sheet: T;
    sprite: keyof T['tileMap'];
} & MeshProps;

export const Tile = <T extends SpriteSheet>({ size, sheet, sprite, ...props }: TileProps<T>) => {
    const spriteRef = useRef<any>();
    const [width, height] = size ?? [1, 1];
    const spriteSheet = useSpriteSheet(sheet);
    const texture = spriteSheet.getByKey(sprite);

    useFrame(() => {
        if (spriteRef.current) {
            spriteRef.current.texture = texture;
            spriteRef.current.needsUpdate = true;
        }
    });

    return (
        <mesh {...props}>
            <planeGeometry attach="geometry" args={[width, height]} />
            <meshBasicMaterial ref={spriteRef} transparent attach="material" map={texture} />
        </mesh>
    );
};
