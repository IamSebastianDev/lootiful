import React, { useEffect, useRef } from "react";
import { useTextureAtlas } from "../../hooks/use-texture-atlas";
import tiles from "../../assets/images/tileset.jpg";

export type TileProps = {
    textureKey: string;
};

export const Tile: React.FC<TileProps> = ({ textureKey }) => {
    const atlas = useTextureAtlas({ rows: 10, tile: 16, columns: 10, src: tiles });
    const texture = atlas.get(9, 9);

    const textureRef = useRef<any>();
    useEffect(() => {
        console.log({ texture });
        textureRef.current.map = texture;
        textureRef.current.needsUpdate = true;
    }, [texture]);

    return (
        <mesh>
            <planeGeometry attach="geometry" args={[1, 1]} />
            <meshBasicMaterial ref={textureRef} attach="material" map={texture} />
        </mesh>
    );
};
