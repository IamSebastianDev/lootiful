import React from "react";
import { useGame } from "../hooks/use-game";
import { Canvas } from "@react-three/fiber";

export const Board: React.FC = () => {
    const state = useGame();

    return (
        <div className="game-board">
            <Canvas>
                <ambientLight intensity={1} />
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial color={"red"} />
                </mesh>
            </Canvas>
        </div>
    );
};
