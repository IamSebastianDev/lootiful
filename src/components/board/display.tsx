/** @format */

import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Board } from './board';

export const Display: React.FC = () => {
    return (
        <div className="game-board">
            <Canvas style={{ background: 'var(--lc-canvas)' }}>
                <Preload all />
                <orthographicCamera position={[-7, 7, -5]}>
                    <Board />
                </orthographicCamera>
            </Canvas>
        </div>
    );
};
