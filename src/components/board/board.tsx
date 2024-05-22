/** @format */

import React from "react";
import { useTextureAtlas } from "../../hooks/use-texture-atlas";
import { Tile, TileProps } from "./tile";
import { useDungeonMap } from "../../hooks/use-dungeon-map";
import { dungeon } from "../../data/tile-atlas";

export const Board: React.FC = () => {
    // const state = useGame();
    const map = useDungeonMap();
    const atlas = useTextureAtlas(dungeon);

    const tileMap: TileProps[] = [];
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            tileMap.push({
                onClick: () => {
                    console.log({ x, y });
                },
                texture: atlas.getByKey(map.tiles[y * map.width + x]),
                position: [x, y * -1, 0],
            });
        }
    }

    return (
        <group>
            {tileMap.map((props, idx) => (
                <Tile key={idx} {...props} />
            ))}
            <Tile
                position={[2, 2 * -1, 0.1]}
                onClick={() => {
                    console.log("Got Chest");
                }}
                texture={atlas.get(8, 0)}
            />
        </group>
    );
};
