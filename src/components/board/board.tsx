import React from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Tile } from "./tile";

export const Board: React.FC = () => {
    // const state = useGame();

    return (
        <div className="game-board">
            <Canvas>
                <Preload all />
                <ambientLight intensity={1} />
                <orthographicCamera position={[0, 0, -5]}>
                    <Tile textureKey={""} />
                </orthographicCamera>
            </Canvas>
        </div>
    );
};
