import { Sprite } from "../../components/board/sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { ArtifactData, artifactTable } from "../../hooks/use-artifacts";
import { GameState } from "../../hooks/use-game";
import artifactsSprites from "../sprites/artifacts.sprites";

export type ArtifactCtor = {
    position: Position;
    type: keyof typeof artifactTable;
};

export type ArtifactProps = { position: Position; artifact: ArtifactData };

export const Artifact = (ctor: ArtifactCtor) => {
    const { position, type } = ctor;
    const artifact = artifactTable[type];

    const onInit = (_: string, props: Store<ArtifactProps>) => {
        props.set("position", position);
        props.set("artifact", artifact);
    };

    const collect = (id: string, props: Store<ArtifactProps>, state: GameState) => {
        const position = props.get("position")!;

        // check if the position to the player is close
        const distance = position.distance(state.hero.position);
        if (distance <= 1) {
            state.sfx.pickup();
            state.entityStore.getEntityById(id)?.destroy(state);
        }
    };

    const onRender = (id: string, props: Store<ArtifactProps>, state: GameState) => {
        const [x, y] = props.get("position");
        const data = props.get("artifact");

        return (
            <group key={id} position={[x, y, 0.2]} onClick={() => collect(id, props, state)}>
                <pointLight position={[0, 0, 0.5]} intensity={2} color={"blue"} />
                <Sprite sheet={artifactsSprites} sprite={data.sprite} scale={0.5} />
            </group>
        );
    };

    const onDestroy = (
        id: string,
        store: Store<ArtifactProps>,
        { entityStore, artifactStore, coins, stats }: GameState
    ) => {
        entityStore.removeEntity(id);
        artifactStore.collectArtifact(store.get("artifact"));
        coins.addCoins(1000);
        stats.trackCoins(1000);
    };

    const onUpdate = () => {};

    return createEntity<ArtifactProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
