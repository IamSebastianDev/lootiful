import { AnimatedSprite } from "../../components/board/animated-sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { rnd } from "../../functions/rnd";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import skeletonSprites from "../sprites/skeleton.sprites";

export type LootCtor = {
    position: Position;
    maxHealth: number;
};

export type SkeletonProps = { position: Position; health: number };

export const Skeleton = (ctor: LootCtor) => {
    const { position, maxHealth = 3 } = ctor;

    const damage = 1;

    const onInit = (_: string, props: Store<SkeletonProps>) => {
        props.set("position", position);
        props.set("health", maxHealth);
    };

    const onRender = (id: string, props: Store<SkeletonProps>, state: GameState) => {
        const [x, y] = props.get("position")!;
        const health = props.get("health");

        return (
            <group position={[x, y, 0.1]} key={id}>
                <mesh position={[-0.5 * (1 - health / maxHealth), 0.65, 0.2]}>
                    <planeGeometry attach="geometry" args={[health / maxHealth, 0.1]} />
                    <meshBasicMaterial color="red" />
                </mesh>
                <AnimatedSprite
                    onClick={() => onHit(id, props, state)}
                    sheet={skeletonSprites}
                    config={{ interval: 0.5 }}
                />
            </group>
        );
    };

    const onDestroy = (id: string, props: Store<SkeletonProps>, { entityStore, lootStore }: GameState) => {
        const position = props.get("position");
        lootStore.spawnLootSpread(position);
        entityStore.removeEntity(id);
    };

    const onUpdate = (id: string, props: Store<SkeletonProps>, state: GameState) => {
        const { entityStore, hero, stats } = state;
        const health = props.get("health");
        const position = props.get("position");
        const distanceToPlayer = hero.position.distance(position);

        switch (true) {
            // Death
            case health < 1:
                entityStore.getEntityById(id)?.destroy(state);
                stats.trackKill("skeleton");
                break;
            // Attack
            case distanceToPlayer <= 1:
                state.hero.hurt(damage);
                break;
            // Move
            default:
                const adjacent = state.map.getAdjacentTiles(position);
                if (adjacent && adjacent.length > 0) {
                    const { position } = rnd.entry(adjacent);
                    props.set("position", position);
                }
                break;
        }
    };

    const onHit = (_: string, props: Store<SkeletonProps>, state: GameState) => {
        const { hero } = state;

        const position = props.get("position");
        const distanceToPlayer = hero.position.distance(position);

        if (distanceToPlayer <= 1) {
            const health = props.get("health");
            props.set("health", Math.max(0, health - state.hero.damage));
            hero.exhaust(1);
        }
    };

    return createEntity<SkeletonProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
