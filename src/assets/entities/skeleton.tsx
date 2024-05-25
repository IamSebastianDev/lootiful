import { AnimatedSprite } from "../../components/board/animated-sprite";
import { EntityProps, createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { useEntityCollection } from "../../hooks/use-entity-collection";
import skeletonSprites from "../sprites/skeleton.sprites";

export type LootCtor = {
    position: Position;
    createLoot: (position: Position) => void;
};

export type SkeletonProps = EntityProps & { position: Position; health: number };

export const Skeleton = (ctor: LootCtor) => {
    const { position, createLoot } = ctor;

    const onInit = (_: string, props: Store<SkeletonProps>) => {
        props.set("position", position);
        props.set("health", 3);
    };

    const onRender = (id: string, props: Store<SkeletonProps>) => {
        const [x, y] = props.get("position")!;
        return (
            <AnimatedSprite
                onClick={() => onHit(id, props)}
                key={id}
                position={[x, y, 0.1]}
                sheet={skeletonSprites}
                config={{ interval: 0.5 }}
            />
        );
    };

    const onDestroy = (id: string, props: Store<SkeletonProps>, entities: ReturnType<typeof useEntityCollection>) => {
        const position = props.get("position");
        createLoot(position);
        entities.removeEntity(id);
    };

    const onUpdate = (id: string, props: Store<SkeletonProps>, entities: ReturnType<typeof useEntityCollection>) => {
        const health = props.get("health");
        if (health < 1) {
            entities.getEntityById(id)?.destroy(entities);
        }
    };

    const onHit = (_: string, props: Store<SkeletonProps>) => {
        const health = props.get("health");
        props.set("health", Math.max(0, health - 1));
    };

    return createEntity<SkeletonProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
