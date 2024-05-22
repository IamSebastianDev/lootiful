/** @format */

import React, { useEffect, useRef } from "react";
import { Texture } from "three";
import { Vector3 } from "@react-three/fiber";

export type TileProps = {
    texture: Texture | null;
    position: Vector3;
    onClick: () => void;
};

export const Tile: React.FC<TileProps> = ({ texture, position, onClick }) => {
    const textureRef = useRef<any>();

    useEffect(() => {
        if (texture) {
            textureRef.current.map = texture;
            textureRef.current.needsUpdate = true;
        }
    }, [texture]);

    if (!texture) {
        return null;
    }

    return (
        <mesh position={position} onClick={() => onClick()} receiveShadow castShadow>
            <planeGeometry attach="geometry" args={[1, 1]} />
            <meshBasicMaterial transparent ref={textureRef} attach="material" map={texture} />
        </mesh>
    );
};
