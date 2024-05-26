import { useCallback, useEffect, useState } from "react";
import { Entity } from "../data/entity";
import dungeonMap from "../assets/maps/dungeon.map";
import { Position } from "../functions/position";
import { rnd } from "../functions/rnd";

export const useEntityCollection = (map: typeof dungeonMap) => {
    const [entities, setEntities] = useState<Entity<{ position: Position }>[]>([]);

    const addEntity = (entity: Entity<{ position: Position }>) => {
        setEntities((e) => [...e, entity]);
    };

    const removeEntity = (entityId: string) => {
        setEntities((e) => [...e.filter(({ id }) => id !== entityId)]);
    };

    const getAvailableTile = useCallback(() => {
        const entityPositions = entities.map(({ props }) => props.get("position"));

        return rnd.entry(
            map.getSpawnTiles().filter((tile) => !entityPositions.find((position) => tile.position.match(position)))
        );
    }, [entities]);

    const getEntityById = useCallback(
        (entityId: string) => {
            return entities.find(({ id }) => id === entityId) ?? null;
        },
        [entities]
    );

    const atPosition = (position: Position) => {
        return entities.find(({ props }) => props.get("position").match(position));
    };

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
        atPosition,
        clear,
    };
};
