/** @format */

import React, { useState } from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { Sprite } from "./sprite";
import { AnimatedSprite } from "./animated-sprite";
import { TileRenderer } from "./tile-renderer";
import coinSprites from "../../assets/sprites/coin.sprites";
import wizardSprites from "../../assets/sprites/wizard.sprites";
import dungeonSprites from "../../assets/sprites/dungeon.sprites";
import skeletonSprites from "../../assets/sprites/skeleton.sprites";
export const Board: React.FC = () => {
    const { map, coins } = useGame();
    const [heroPos, setHeroPos] = useState<[number, number, number]>([4, -5, 0.2]);

    return (
        <group>
            <TileRenderer
                map={map}
                renderer={({ id, ...props }) => (
                    <Tile
                        {...props}
                        key={id}
                        onClick={() => {
                            props.tile.textureKey.includes("floor") &&
                                setHeroPos([props.tile.position[0], props.tile.position[1] * -1, 0.2]);
                        }}
                    />
                )}
            />
            <Sprite position={[10, 0, 0.1]} sheet={dungeonSprites} sprite={"flag"} />
            <AnimatedSprite
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
            />
        </group>
    );
};
