import { AnimatedSprite } from "../../components/board/animated-sprite";
import { EntityProps, createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import skeletonSprites from "../sprites/skeleton.sprites";

export type LootCtor = {
    position: Position;
    createLoot: (position: Position) => void;
};

export type SkeletonProps = { position: Position; health: number };

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

    const onDestroy = (id: string, props: Store<SkeletonProps>, { entityStore }: GameState) => {
        const position = props.get("position");
        createLoot(position);
        entityStore.removeEntity(id);
    };

    const onUpdate = (id: string, props: Store<SkeletonProps>, state: GameState) => {
        const health = props.get("health");
        if (health < 1) {
            state.entityStore.getEntityById(id)?.destroy(state);
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
