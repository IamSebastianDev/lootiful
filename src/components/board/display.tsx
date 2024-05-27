/** @format */

import { Preload, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Board } from "./board";

export type DisplayProps = {
    disablePointer: boolean;
    brightness: number;
};

export const Display: React.FC<DisplayProps> = ({ disablePointer, brightness }) => {
    return (
        <div className="game-board">
            <Canvas style={{ background: "var(--lc-canvas)", pointerEvents: disablePointer ? "none" : "all" }}>
                <Preload all />
                <ambientLight intensity={brightness} />
                <orthographicCamera position={[-7, 7, -5]}>
                    <Board />
                </orthographicCamera>
                {import.meta.env.DEV && <Stats />}
            </Canvas>
        </div>
    );
};
