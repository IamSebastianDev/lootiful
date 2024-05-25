import { useCallback, useEffect, useState } from "react";
import { Entity, EntityProps } from "../data/entity";

import dungeonMap from "../assets/maps/dungeon.map";
import { getRandomEntry } from "../functions/get-random-entry";

export const useEntityCollection = (map: typeof dungeonMap) => {
    const [entities, setEntities] = useState<Entity<EntityProps>[]>([]);

    const addEntity = (entity: Entity<EntityProps>) => {
        setEntities((e) => [...e, entity]);
    };

    const removeEntity = (entityId: string) => {
        setEntities((e) => [...e.filter(({ id }) => id !== entityId)]);
    };

    const getAvailableTile = useCallback(() => {
        const entityPositions = entities.map(({ props }) => props.get("position"));

        return getRandomEntry(
            map.getSpawnTiles().filter((tile) => !entityPositions.find((position) => tile.position.match(position)))
        );
    }, [entities]);

    const getEntityById = useCallback(
        (entityId: string) => {
            return entities.find(({ id }) => id === entityId) ?? null;
        },
        [entities]
    );

    const clear = () => setEntities([]);

    useEffect(() => {
        // Might implement entity caching later
        setEntities([]);
    }, [map]);

    return {
        addEntity,
        removeEntity,
        entities,
        getAvailableTile,
        getEntityById,
        clear,
    };
};
