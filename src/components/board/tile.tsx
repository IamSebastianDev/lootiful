/** @format */

import { MeshProps, useFrame } from '@react-three/fiber';
import { SpriteSheet } from '../../data/sprite-data';
import { useSpriteSheet } from '../../hooks/use-sprite-sheet';
import { useRef } from 'react';
import { TileData } from '../../data/maps';

export type TileProps<T extends SpriteSheet> = {
    tile: TileData<T>;
    sheet: T;
} & MeshProps;

export const Tile = <T extends SpriteSheet>({ sheet, tile, ...props }: TileProps<T>) => {
    const spriteRef = useRef<any>();
    const [width, height] = [1, 1];
    const [x, y] = tile.position;
    const spriteSheet = useSpriteSheet(sheet);
    const texture = spriteSheet.getByKey(tile.textureKey);

    return (
        <mesh {...props} position={[x, y * -1, 0]}>
            <planeGeometry attach="geometry" args={[width, height]} />
            <meshBasicMaterial ref={spriteRef} transparent attach="material" map={texture} />
        </mesh>
    );
};
