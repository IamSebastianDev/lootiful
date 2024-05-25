/** @format */

import React from "react";
import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import { TileData, createMap } from "../../hooks/use-dungeon-map";

export type TileDefinition<T extends SpriteSheet> = {
    id: string;
    tile: TileData<T>;
    sheet: T;
};
export type TileRendererProps<T extends SpriteSheet> = {
    map: ReturnType<typeof createMap<T>>;
    renderer: (definition: TileDefinition<T>) => React.ReactNode;
};
export const TileRenderer = <T extends SpriteSheet>({ map, renderer }: TileRendererProps<T>) => {
    return <group>{...map.tiles.map((tile) => renderer({ tile, sheet: map.sheet, id: tile.id }))}</group>;
};
