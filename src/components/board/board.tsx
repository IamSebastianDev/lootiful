/** @format */

import React from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { TileRenderer } from "./tile-renderer";

import { Cursor } from "./cursor";
import { MoveTarget } from "./move-target";
import { Sprite } from "./sprite";
import uiSprites from "../../assets/sprites/ui.sprites";
import { router } from "../../main";

export const Board: React.FC = () => {
    const state = useGame();
    const { map, entityStore, lootStore } = state;

    return (
        <group>
            <Cursor />
            <MoveTarget />
            <TileRenderer map={map.currentMap} renderer={({ id, ...props }) => <Tile {...props} key={id} />} />
            {lootStore.loot.map((entity) => entity.render(state))}
            {entityStore.entities.map((entity) => entity.render(state))}
            <group>
                <Sprite
                    position={[12, -13.5, 0.7]}
                    scale={1.1}
                    sheet={uiSprites}
                    sprite={"menu"}
                    onClick={() => router.navigate({ to: "/" })}
                />
                <Sprite
                    position={[13, -13.5, 0.7]}
                    scale={1.1}
                    sheet={uiSprites}
                    sprite={"settings"}
                    onClick={() => router.navigate({ to: "/options" })}
                />
            </group>
        </group>
    );
};
