import { Stats } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import React, { PropsWithChildren } from "react";

export type DisplayProps = CanvasProps & {
    enableFPS?: boolean;
};
export const Display: React.FC<PropsWithChildren<DisplayProps>> = ({ children, enableFPS, ...props }) => {
    return (
        <Canvas {...props}>
            {enableFPS && <Stats />}
            {children}
        </Canvas>
    );
};
