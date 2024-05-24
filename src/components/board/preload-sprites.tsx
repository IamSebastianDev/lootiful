/** @format */

import React, { PropsWithChildren } from 'react';
import { preloadSpriteSheet } from '../../hooks/use-sprite-sheet';
import { dungeonSprites, heroSprites, skeletonSprites } from '../../data/sprite-data';

export const PreloadSprites: React.FC<PropsWithChildren> = ({ children }) => {
    preloadSpriteSheet(dungeonSprites);
    preloadSpriteSheet(heroSprites);
    preloadSpriteSheet(skeletonSprites);

    return children;
};