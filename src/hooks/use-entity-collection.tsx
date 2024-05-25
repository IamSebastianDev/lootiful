import { useEffect, useState } from "react";
import { Entity } from "../data/entity";

import dungeonMap from "../assets/maps/dungeon.map";
import { getRandomEntry } from "../functions/get-random-entry";

export const useEntityCollection = (map: typeof dungeonMap) => {
    const [entities, setEntities] = useState<Entity[]>([]);

    const addEntity = (entity: Entity) => {
        setEntities((e) => [...e, entity]);
    };

    const removeEntity = (entityId: string) => {
        setEntities((e) => [...e.filter(({ id }) => id !== entityId)]);
    };

    const getAvailableTile = () => {
        const entityPositions = entities.map(({ position }) => position());

        return getRandomEntry(
            map.getSpawnTiles().filter((tile) => !entityPositions.find((position) => tile.position.match(position)))
        );
    };

    useEffect(() => {
        // Might implement entity caching later
        setEntities([]);
    }, [map]);

    return {
        addEntity,
        removeEntity,
        entities,
        getAvailableTile,
    };
};
