/** @format */

import React from "react";
import { useTextureAtlas } from "../../hooks/use-texture-atlas";
import { Tile, TileProps } from "./tile";
import { dungeonTileSet } from "../../data/tile-atlas";
import { useGame } from "../../hooks/use-game";

const tiledMap = () => {};

export const Board: React.FC = () => {
    const { map, coins } = useGame();
    const atlas = useTextureAtlas(dungeonTileSet);

    const tileMap: TileProps[] = [];
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            tileMap.push({
                onClick: () => {},
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
            <Tile position={[2, 2 * -1, 0.1]} onClick={() => coins.addCoins(5000)} texture={atlas.get(8, 0)} />
        </group>
    );
};
