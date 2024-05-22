/** @format */

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, OrbitControls, Preload } from '@react-three/drei';
import { Tile } from './tile';

export const Board: React.FC = () => {
    // const state = useGame();

    return (
        <div className="game-board">
            <Canvas>
                <Preload all />
                <ambientLight intensity={1} />
                <orthographicCamera position={[0, 0, -5]}>
                    <Tile textureKey={[0, 0]} position={[0, 0, 0]} />
                    <Tile textureKey={[1, 0]} position={[1, 0, 0]} />
                    <Tile textureKey={[1, 0]} position={[2, 0, 0]} />
                    <Tile textureKey={[0, 0]} position={[0, -1, 0]} />
                    <Tile textureKey={[1, 1]} position={[1, -1, 0]} />
                    <Tile textureKey={[1, 1]} position={[2, -1, 0]} />
                </orthographicCamera>
            </Canvas>
        </div>
    );
};
