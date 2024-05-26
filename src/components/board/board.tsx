/** @format */

import React from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { TileRenderer } from "./tile-renderer";

import { Cursor } from "./cursor";
import { MoveTarget } from "./move-target";

export const Board: React.FC = () => {
    const state = useGame();
    const { map, entityStore, cursor, hero } = state;

    return (
        <group>
            <Cursor />
            <MoveTarget />
            <TileRenderer map={map.currentMap} renderer={({ id, ...props }) => <Tile {...props} key={id} />} />
            {entityStore.entities.map((entity) => entity.render(state))}
        </group>
    );
};
