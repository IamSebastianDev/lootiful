import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { emberShaderMaterial } from "./embers.shader";

// Helper function to generate particle positions and speeds
const generateParticles = (numParticles: number) => {
    const positions = new Float32Array(numParticles * 3);
    const speeds = new Float32Array(numParticles);

    for (let i = 0; i < numParticles; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = -5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        speeds[i] = 0.005 + Math.random() * 0.01;
    }

    return { positions, speeds };
};

export const Embers: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => generateParticles(100), []);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            const { positions, speeds } = particles;
            for (let i = 0; i < positions.length / 3; i++) {
                positions[i * 3 + 1] += speeds[i] * delta * 50;
                if (positions[i * 3 + 1] > 5) {
                    positions[i * 3 + 1] = -5;
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    array={particles.positions}
                    itemSize={3}
                    count={particles.positions.length / 3}
                />
            </bufferGeometry>
            <primitive attach="material" object={emberShaderMaterial} />
        </points>
    );
};
