/** @format */

import React, { useState } from 'react';
import { useSpriteSheet } from '../../hooks/use-sprite-sheet';
import { Tile, TileProps } from './tile';
import { dungeonSprites, heroSprites, skeletonSprites } from '../../data/sprite-data';
import { useGame } from '../../hooks/use-game';
import { useAnimatedSprite } from '../../hooks/use-animated-sprite';
import { Vector3 } from 'three';

export const Board: React.FC = () => {
    const { map, coins } = useGame();
    const sprites = useSpriteSheet(dungeonSprites);
    const skeleton = useAnimatedSprite(skeletonSprites, { interval: 0.25 });
    const hero = useAnimatedSprite(heroSprites, { interval: 0.25 });
    const [heroPos, setHeroPos] = useState<Vector3>(new Vector3(4, -5, 1));

    const tileMap: TileProps[] = [];
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            tileMap.push({
                onClick: () => {
                    setHeroPos(new Vector3(x, y * -1, 0));
                },
                texture: sprites.getByKey(map.tiles[y * map.width + x]),
                position: [x, y * -1, 0],
            });
        }
    }

    console.log({ heroPos });

    return (
        <group>
            {tileMap.map((props, idx) => (
                <Tile key={idx} {...props} />
            ))}
            <Tile position={heroPos} onClick={() => {}} texture={hero} />
            <Tile position={[2, 2 * -1, 0.1]} onClick={() => coins.addCoins(5000)} texture={sprites.get(0, 8)} />
            <Tile position={[10, -2, 0.1]} onClick={() => {}} texture={skeleton} />
        </group>
    );
};
