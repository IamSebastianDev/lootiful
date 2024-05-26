import { AnimatedSprite } from "../../components/board/animated-sprite";
import { EntityProps, createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import wizardSprites from "../sprites/wizard.sprites";

export type PlayerCtor = {
    position: Position;
};

export type PlayerProps = { position: Position; id: string };

export const Player = ({ position }: PlayerCtor) => {
    const onInit = (id: string, props: Store<PlayerProps>) => {
        props.set("position", position);
        props.set("id", id);
    };

    const onRender = (id: string, props: Store<PlayerProps>, _: GameState) => {
        const [x, y] = props.get("position");
        return <AnimatedSprite key={id} position={[x, y, 0.2]} sheet={wizardSprites} config={{ interval: 0.5 }} />;
    };

    const onUpdate = (id: string, props: Store<PlayerProps>, state: GameState) => {
        // Pathfind to next requested tile
        // const [x, y] = props.get("position");
        props.set("position", state.hero.position);

        if (state.hero.health <= 0) {
            // end round -> todo: implement
            const entity = state.entityStore.getEntityById(id);
            entity?.destroy(state);
        }
    };

    const onDestroy = (id: string, _: Store<PlayerProps>, state: GameState) => {
        state.entityStore.removeEntity(id);
    };

    return createEntity<EntityProps & { id: string }>({
        onInit,
        onRender,
        onUpdate,
        onDestroy,
    });
};
