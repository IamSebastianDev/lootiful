import { AnimatedSprite } from "../../components/board/animated-sprite";
import { EntityProps, createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { useEntityCollection } from "../../hooks/use-entity-collection";
import skeletonSprites from "../sprites/skeleton.sprites";

export type LootCtor = {
    position: Position;
    onDestroy: (id: string, props: Store<SkeletonProps>, entities: ReturnType<typeof useEntityCollection>) => void;
    onUpdate: (id: string, props: Store<SkeletonProps>, entities: ReturnType<typeof useEntityCollection>) => void;
    onHit: (id: string, props: Store<SkeletonProps>) => void;
};

export type SkeletonProps = EntityProps & { position: Position; health: number };

export const Skeleton = (ctor: LootCtor) => {
    const { position, onDestroy, onUpdate, onHit } = ctor;

    const onInit = (id: string, props: Store<SkeletonProps>) => {
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

    return createEntity<SkeletonProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
