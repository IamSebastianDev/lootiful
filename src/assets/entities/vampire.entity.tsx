import { AnimatedSprite } from "../../components/board/animated-sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { rnd } from "../../functions/rnd";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import vampireSprites from "../sprites/vampire.sprites";

export type LootCtor = {
    position: Position;
};

export type VampireProps = { position: Position; health: number };

export const Vampire = (ctor: LootCtor) => {
    const { position } = ctor;

    const maxHealth = 5;
    const damage = 2;

    const onInit = (_: string, props: Store<VampireProps>) => {
        props.set("position", position);
        props.set("health", maxHealth);
    };

    const onRender = (id: string, props: Store<VampireProps>, state: GameState) => {
        const [x, y] = props.get("position")!;
        const health = props.get("health");

        return (
            <group position={[x, y, 0.1]} key={id}>
                <mesh position={[-0.5 * (1 - health / maxHealth), 0.65, 0.1]}>
                    <planeGeometry attach="geometry" args={[health / maxHealth, 0.1]} />
                    <meshBasicMaterial color="red" />
                </mesh>
                <AnimatedSprite
                    onClick={() => onHit(id, props, state)}
                    sheet={vampireSprites}
                    config={{ interval: 0.5 }}
                />
            </group>
        );
    };

    const onDestroy = (id: string, props: Store<VampireProps>, { entityStore, lootStore }: GameState) => {
        const position = props.get("position");
        lootStore.spawnLootSpread(position);
        entityStore.removeEntity(id);
    };

    const onUpdate = (id: string, props: Store<VampireProps>, state: GameState) => {
        const { hero, map } = state;
        const health = props.get("health");
        const position = props.get("position");
        const distanceToPlayer = hero.position.distance(position);
        const track = rnd.number(1, 2);
        console.log({ track });

        switch (true) {
            // Death
            case health < 1:
                state.entityStore.getEntityById(id)?.destroy(state);
                break;
            // Attack
            case distanceToPlayer <= 1:
                state.hero.hurt(damage);
                break;
            // Move towards player
            case distanceToPlayer >= 1:
            default:
                // Get adjacent tiles to the vampire
                const adjacent = map.getAdjacentTiles(position);
                // Check which tile is closest to the hero position
                const closest = hero.position.closest(adjacent.map(({ position }) => position));
                // Set the closest position as new position
                props.set("position", closest);
                break;
        }
    };

    const onHit = (_: string, props: Store<VampireProps>, { hero }: GameState) => {
        const health = props.get("health");
        props.set("health", Math.max(0, health - 1));
        hero.exhaust(1);
    };

    return createEntity<VampireProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
