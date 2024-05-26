import React from "react";
import { useGame } from "../../hooks/use-game";
import { AnimatedSprite } from "./animated-sprite";
import moveTargetSprites from "../../assets/sprites/move-target.sprites";

export const MoveTarget: React.FC = () => {
    const { hero, map } = useGame();
    const marked = map.currentMap.getAdjacentTiles(hero.position);

    return (
        <>
            {marked.map(({ id, position }) => {
                const [x, y] = position;
                return (
                    <AnimatedSprite
                        key={id}
                        sheet={moveTargetSprites}
                        config={{ interval: 0.5 }}
                        position={[x, y, 0.05]}
                        onClick={() => hero.move(position)}
                        opacity={0.75}
                    ></AnimatedSprite>
                );
            })}
        </>
    );
};
