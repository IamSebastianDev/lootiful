import React from "react";
import { useGame } from "../../hooks/use-game";
import { AnimatedSprite } from "./animated-sprite";
import moveTargetSprites from "../../assets/sprites/move-target.sprites";
import { Position } from "../../functions/position";

export const MoveTarget: React.FC = () => {
    const { hero, map, entityStore, lootStore, requestTick, cursor } = useGame();
    const marked = map.getAdjacentTiles(hero.position);

    const handleClickToMove = (position: Position) => {
        const entity = entityStore.atPosition(position);
        const loot = lootStore.atPosition(position);

        requestTick();

        if (!!entity || !!loot) {
            hero.exhaust(1);
            return;
        }

        if (!entity && !loot) {
            hero.move(position);
            return;
        }
    };

    if (cursor.position === null) {
        return null;
    }

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
                        onClick={() => handleClickToMove(position)}
                        opacity={0.65}
                    ></AnimatedSprite>
                );
            })}
        </>
    );
};
