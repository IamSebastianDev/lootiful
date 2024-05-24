/** @format */

import React from 'react';
import { MapDef, TileData } from '../../data/maps';
import { SpriteSheet } from '../../data/sprite-data';

export type TileDefinition<T extends SpriteSheet> = {
    id: string;
    tile: TileData<T>;
    sheet: T;
};
export type TileRendererProps<T extends SpriteSheet> = {
    map: MapDef<T>;
    renderer: (definition: TileDefinition<T>) => React.ReactNode;
};
export const TileRenderer = <T extends SpriteSheet>({ map, renderer }: TileRendererProps<T>) => {
    return <group>{...map.tiles.map((tile) => renderer({ tile, sheet: map.spriteSheet, id: tile.id }))}</group>;
};
