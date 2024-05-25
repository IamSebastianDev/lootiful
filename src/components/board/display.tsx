/** @format */

import { Preload, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Board } from "./board";

export const Display: React.FC = () => {
    return (
        <div className="game-board">
            <Canvas style={{ background: "var(--lc-canvas)" }}>
                <Preload all />
                <ambientLight intensity={2} />
                <pointLight position={[-7, 7, -5]} intensity={10} />
                <orthographicCamera position={[-7, 7, -5]}>
                    <Board />
                </orthographicCamera>
                {import.meta.env.DEV && <Stats />}
            </Canvas>
        </div>
    );
};
