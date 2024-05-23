/** @format */

import React from 'react';
import { useSpriteSheet } from '../../hooks/use-sprite-sheet';
import { Tile, TileProps } from './tile';
import { dungeonSprites, heroSprites, skeletonSprites } from '../../data/sprite-data';
import { useGame } from '../../hooks/use-game';
import { useAnimatedSprite } from '../../hooks/use-animated-sprite';

export const Board: React.FC = () => {
    const { map, coins } = useGame();
    const sprites = useSpriteSheet(dungeonSprites);
    const skeleton = useAnimatedSprite(skeletonSprites, { interval: 0.25 });
    const hero = useAnimatedSprite(heroSprites, { interval: 0.25 });

    const tileMap: TileProps[] = [];
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            tileMap.push({
                onClick: () => {},
                texture: sprites.getByKey(map.tiles[y * map.width + x]),
                position: [x, y * -1, 0],
            });
        }
    }

    return (
        <group>
            {tileMap.map((props, idx) => (
                <Tile key={idx} {...props} />
            ))}
            <Tile position={[2, 2 * -1, 0.1]} onClick={() => coins.addCoins(5000)} texture={sprites.get(8, 0)} />
            <Tile position={[10, -2, 0.1]} onClick={() => {}} texture={skeleton} />
            <Tile position={[4, -5, 0.1]} onClick={() => {}} texture={hero} />
        </group>
    );
};
