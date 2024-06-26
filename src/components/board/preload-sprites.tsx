/** @format */

import React, { PropsWithChildren } from "react";
import { preloadSpriteSheet } from "../../hooks/use-sprite-sheet";
import { useFont } from "@react-three/drei";
import coinSprites from "../../assets/sprites/coin.sprites";
import wizardSprites from "../../assets/sprites/wizard.sprites";
import dungeonSprites from "../../assets/sprites/dungeon.sprites";
import skeletonSprites from "../../assets/sprites/skeleton.sprites";
import lootSprites from "../../assets/sprites/loot.sprites";
import cursorSprite from "../../assets/sprites/cursor.sprite";
import moveTargetSprites from "../../assets/sprites/move-target.sprites";
import vampireSprites from "../../assets/sprites/vampire.sprites";
import treasureSprites from "../../assets/sprites/treasure.sprites";
import artifactsSprites from "../../assets/sprites/artifacts.sprites";
import uiSprites from "../../assets/sprites/ui.sprites";

export const PreloadSprites: React.FC<PropsWithChildren> = ({ children }) => {
    preloadSpriteSheet(dungeonSprites);
    preloadSpriteSheet(wizardSprites);
    preloadSpriteSheet(skeletonSprites);
    preloadSpriteSheet(coinSprites);
    preloadSpriteSheet(lootSprites);
    preloadSpriteSheet(cursorSprite);
    preloadSpriteSheet(moveTargetSprites);
    preloadSpriteSheet(vampireSprites);
    preloadSpriteSheet(treasureSprites);
    preloadSpriteSheet(artifactsSprites);
    preloadSpriteSheet(uiSprites);
    useFont.preload("/fonts/press2play.ttf");

    return children;
};
