import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Board } from "./board";

export const Display: React.FC = () => {
    return (
        <div className="game-board">
            <Canvas>
                <Preload all />
                <ambientLight intensity={1} />
                <pointLight position={[0, 0, -10]} intensity={10} color={"red"} />
                <orthographicCamera position={[0, 0, -7.5]}>
                    <Board />
                </orthographicCamera>
            </Canvas>
        </div>
    );
};
