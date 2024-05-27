import React, { useRef } from "react";
import { Mesh } from "three";
import { Html } from "@react-three/drei";

type TagProps = {
    text: string;
    position: [number, number, number];
};

export const Tag: React.FC<TagProps> = ({ text, position }) => {
    const meshRef = useRef<Mesh>(null);

    return (
        <mesh position={position} ref={meshRef}>
            <planeGeometry attach="geometry" args={[0, 0]} />
            <meshBasicMaterial attach="material" transparent />
            <Html distanceFactor={10}>
                <div className="tag text legible normal">{text}</div>
            </Html>
        </mesh>
    );
};
