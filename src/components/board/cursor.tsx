import React from "react";
import { useGame } from "../../hooks/use-game";
import { useAnimatedSprite } from "../../hooks/use-animated-sprite";
import cursorSprite from "../../assets/sprites/cursor.sprite";
import { Text } from "@react-three/drei";

export const Cursor: React.FC = () => {
    const { cursor } = useGame();
    const { state, tooltip, position } = cursor;

    const frames = { ERROR: ["error1", "error2"], OK: ["ok1", "ok2"], INFO: ["info1", "info2"] } as const;
    const texture = useAnimatedSprite(cursorSprite, { interval: 0.5, frames: frames[state] });

    if (!position) {
        return null;
    }

    const [x, y] = position;

    return (
        <group position={[x, y, 0.2]}>
            <mesh>
                <planeGeometry attach={"geometry"} />
                <meshStandardMaterial transparent map={texture} depthWrite={true} attach="material" />
            </mesh>
            {tooltip && (
                <mesh position={[0.75, 0, 0.2]}>
                    <Text font={"/fonts/press2play.ttf"} anchorX={"left"} fontSize={0.3}>
                        {tooltip}
                    </Text>
                </mesh>
            )}
        </group>
    );
};
