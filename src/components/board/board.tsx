/** @format */

import React, { useState } from 'react';
import { useSpriteSheet } from '../../hooks/use-sprite-sheet';
import { Tile, TileProps } from './tile';
import { dungeonSprites, heroSprites, skeletonSprites } from '../../data/sprite-data';
import { useGame } from '../../hooks/use-game';
import { useAnimatedSprite } from '../../hooks/use-animated-sprite';
import { Vector3 } from 'three';
import { Sprite } from './sprite';
import { AnimatedSprite } from './animated-sprite';
import { TileRenderer } from './tile-renderer';

export const Board: React.FC = () => {
    const { map, coins } = useGame();
    const [heroPos, setHeroPos] = useState<[number, number, number]>([4, -5, 0.1]);

    return (
        <group>
            <TileRenderer
                map={map}
                renderer={({ key, ...props }) => (
                    <Tile {...props} key={key} onClick={() => setHeroPos(props.position)} />
                )}
            />
            <Sprite position={[10, 0, 0.1]} sheet={dungeonSprites} sprite={'flag'} />
            <AnimatedSprite
                position={[10, -2, 0.1]}
                onClick={() => {}}
                sheet={skeletonSprites}
                config={{ interval: 0.25 }}
            />
            <Sprite
                position={[5, -5, 0.1]}
                sheet={dungeonSprites}
                sprite={'chest'}
                onClick={() => coins.addCoins(5000)}
            />
            <AnimatedSprite
                position={heroPos}
                onClick={() => console.log('Clicked Hero')}
                sheet={heroSprites}
                config={{ interval: 0.25 }}
            />
        </group>
    );
};
