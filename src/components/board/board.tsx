/** @format */

import React from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { TileRenderer } from "./tile-renderer";

import { Cursor } from "./cursor";

export const Board: React.FC = () => {
    const state = useGame();
    const { map, entities, cursor, hero } = state;

    return (
        <group>
            <Cursor />
            <TileRenderer
                map={map}
                renderer={({ id, ...props }) => (
                    <Tile
                        onClick={() => {
                            if (props.tile.isMoveTarget) {
                                hero.setDestination(props.tile.position);
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
            {entities.entities.map((entity) => entity.render(state))}
        </group>
    );
};
