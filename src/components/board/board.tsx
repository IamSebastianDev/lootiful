/** @format */

import React from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { TileRenderer } from "./tile-renderer";

export const Board: React.FC = () => {
    const { map, entities } = useGame();
    console.log({ entities: entities.entities });

    return (
        <group>
            <TileRenderer map={map} renderer={({ id, ...props }) => <Tile {...props} key={id} />} />
            {entities.entities.map((entity) => entity.render())}
            {/* <Sprite position={[10, 0, 0.1]} sheet={dungeonSprites} sprite={"flag"} /> */}
            {/* <AnimatedSprite
                position={[10, -2, 0.1]}
                onClick={() => {}}
                sheet={skeletonSprites}
                config={{ interval: 0.25 }}
            />
            <Sprite
                position={[5, -5, 0.1]}
                sheet={dungeonSprites}
                sprite={"chest"}
                onClick={() => coins.addCoins(5000)}
            />
            <AnimatedSprite
                position={heroPos}
                onClick={() => console.log("Clicked Hero")}
                sheet={wizardSprites}
                config={{ interval: 0.25 }}
            />
            <AnimatedSprite
                position={[8, -5, 0.1]}
                onClick={() => coins.addCoins(10)}
                sheet={coinSprites}
                config={{ interval: 0.25 }}
            /> */}
        </group>
    );
};
