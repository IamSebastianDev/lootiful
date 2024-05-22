/** @format */

import React, { useEffect, useRef } from 'react';
import { useTextureAtlas } from '../../hooks/use-texture-atlas';
import tiles from '../../assets/images/tileset.jpg';

export type TileProps = {
    textureKey: [number, number];
    position: [number, number, number];
};

export const Tile: React.FC<TileProps> = ({ textureKey, position }) => {
    const atlas = useTextureAtlas({ rows: 10, tile: 16, columns: 10, src: tiles });
    const texture = atlas.get(...textureKey);

    const textureRef = useRef<any>();
    useEffect(() => {
        textureRef.current.map = texture;
        textureRef.current.needsUpdate = true;
    }, [texture]);

    return (
        <mesh position={position}>
            <planeGeometry attach="geometry" args={[1, 1]} />
            <meshBasicMaterial ref={textureRef} attach="material" map={texture} />
        </mesh>
    );
};
