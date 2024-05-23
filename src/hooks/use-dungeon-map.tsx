/** @format */

import { useState } from 'react';
import { MapDef } from '../data/maps';
import { SpriteSheet } from '../data/sprite-data';

export const useDungeonMap = <T extends SpriteSheet>(maps: MapDef<T>[]) => {
    const [currentMap, setCurrentMap] = useState(maps[0]);

    const setMap = (key: string) => {
        const map = maps.find(({ name }) => name === key);
        if (!map) {
            setCurrentMap(maps[0]);
        }
    };

    return [currentMap, setMap] as const;
};
