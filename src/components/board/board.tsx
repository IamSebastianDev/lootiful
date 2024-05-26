/** @format */

import React from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { TileRenderer } from "./tile-renderer";

import { Cursor } from "./cursor";

export const Board: React.FC = () => {
    const state = useGame();
    const { map, entityStore, cursor, hero } = state;

    return (
        <group>
            <Cursor />
            <TileRenderer
                map={map.currentMap}
                renderer={({ id, ...props }) => (
                    <Tile
                        onClick={() => {
                            if (props.tile.isMoveTarget) {
                                hero.move(props.tile.position);
                            }
                        }}
                        onPointerEnter={() => {
                            cursor.setPosition(props.tile.position);
                            cursor.setState(props.tile.isMoveTarget ? "OK" : "ERROR");
                        }}
                        {...props}
                        key={id}
                    />
                )}
            />
            {entityStore.entities.map((entity) => entity.render(state))}
        </group>
    );
};
