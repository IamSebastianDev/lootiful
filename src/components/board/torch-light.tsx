import React, { useRef } from "react";
import { useClock } from "../../hooks/use-clock";
import { GroupProps } from "@react-three/fiber";
import { rnd } from "../../functions/rnd";

export type TorchProps = GroupProps & {
    intensity: number;
    interval: number;
};
export const TorchLight: React.FC<TorchProps> = ({ intensity, interval, ...props }) => {
    const clock = useClock(interval);
    const intensityRef = useRef<number[]>(
        Array(20)
            .fill(null)
            .map(() => rnd.number(intensity / 2, intensity * 2))
    );

    return (
        <>
            <pointLight
                position={props.position}
                intensity={intensityRef.current[clock % 20]}
                color="orange"
                castShadow
            ></pointLight>
            <pointLight
                position={props.position}
                intensity={intensityRef.current[(clock + 4) % 20] / 2}
                color="white"
                castShadow
            ></pointLight>
        </>
    );
};
