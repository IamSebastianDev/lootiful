import { AnimatedSprite } from "../../components/board/animated-sprite";
import { createEntity } from "../../data/entity";
import { getRandomEntry } from "../../functions/get-random-entry";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import vampireSprites from "../sprites/vampire.sprites";

export type LootCtor = {
    position: Position;
    createLoot: (position: Position) => void;
};

export type VampireProps = { position: Position; health: number };

export const Vampire = (ctor: LootCtor) => {
    const { position, createLoot } = ctor;

    const maxHealth = 6;

    const onInit = (_: string, props: Store<VampireProps>) => {
        props.set("position", position);
        props.set("health", maxHealth);
    };

    const onRender = (id: string, props: Store<VampireProps>) => {
        const [x, y] = props.get("position")!;
        const health = props.get("health");

        return (
            <group position={[x, y, 0.1]} key={id}>
                <mesh position={[-0.5 * (1 - health / maxHealth), 0.65, 0.1]}>
                    <planeGeometry attach="geometry" args={[health / maxHealth, 0.1]} />
                    <meshBasicMaterial color="red" />
                </mesh>
                <AnimatedSprite onClick={() => onHit(id, props)} sheet={vampireSprites} config={{ interval: 0.5 }} />
            </group>
        );
    };

    const onDestroy = (id: string, props: Store<VampireProps>, { entityStore }: GameState) => {
        const position = props.get("position");
        createLoot(position);
        entityStore.removeEntity(id);
    };

    const onUpdate = (id: string, props: Store<VampireProps>, state: GameState) => {
        const health = props.get("health");
        const position = props.get("position");

        if (health < 1) {
            state.entityStore.getEntityById(id)?.destroy(state);
            return;
        }

        // calculate movement
        const adjacent = state.map.getAdjacentTiles(position);
        if (adjacent && adjacent.length > 0) {
            const { position } = getRandomEntry(adjacent);
            props.set("position", position);
        }
    };

    const onHit = (_: string, props: Store<VampireProps>) => {
        const health = props.get("health");
        props.set("health", Math.max(0, health - 1));
    };

    return createEntity<VampireProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
