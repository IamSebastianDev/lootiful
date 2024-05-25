/** @format */

import React, { PropsWithChildren } from "react";
import { preloadSpriteSheet } from "../../hooks/use-sprite-sheet";
import coinSprites from "../../assets/sprites/coin.sprites";
import wizardSprites from "../../assets/sprites/wizard.sprites";
import dungeonSprites from "../../assets/sprites/dungeon.sprites";
import skeletonSprites from "../../assets/sprites/skeleton.sprites";
import lootSprites from "../../assets/sprites/loot.sprites";
export const PreloadSprites: React.FC<PropsWithChildren> = ({ children }) => {
    preloadSpriteSheet(dungeonSprites);
    preloadSpriteSheet(wizardSprites);
    preloadSpriteSheet(skeletonSprites);
    preloadSpriteSheet(coinSprites);
    preloadSpriteSheet(lootSprites);

    return children;
};
