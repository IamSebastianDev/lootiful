/** @format */

import React from "react";
import { Tile } from "./tile";
import { useGame } from "../../hooks/use-game";
import { TileRenderer } from "./tile-renderer";

import { Cursor } from "./cursor";

export const Board: React.FC = () => {
    const { map, entities, cursor } = useGame();

    return (
        <group>
            <Cursor />
            <TileRenderer
                map={map}
                renderer={({ id, ...props }) => (
                    <Tile
                        onPointerEnter={() => {
                            cursor.setPosition(props.tile.position);
                            cursor.setState(props.tile.isMoveTarget ? "OK" : "ERROR");
                        }}
                        {...props}
                        key={id}
                    />
                )}
            />
            {entities.entities.map((entity) => entity.render())}
        </group>
    );
};
