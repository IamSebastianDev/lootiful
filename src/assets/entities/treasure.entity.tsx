import { Sprite } from "../../components/board/sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { rnd } from "../../functions/rnd";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import treasureSprites from "../sprites/treasure.sprites";

export const stash: {
    [K in TreasureType]: () => number;
} = {
    coin: () => 1,
    coins: () => rnd.number(2, 4),
    coins2: () => rnd.number(4, 8),
    coins3: () => rnd.number(10, 20),
    coins4: () => rnd.number(25, 38),
    treasure: () => rnd.number(150, 1000),
};

type TreasureType = keyof (typeof treasureSprites)["tileMap"];
export type TreasureCtor = {
    position: Position;
    type: TreasureType;
};

export type TreasureProps = { position: Position; value: number };

export const Treasure = (ctor: TreasureCtor) => {
    const { position, type } = ctor;

    const onInit = (_: string, props: Store<TreasureProps>) => {
        props.set("position", position);
        props.set("value", stash[type]());
    };

    const collect = (id: string, props: Store<TreasureProps>, state: GameState) => {
        const position = props.get("position")!;
        const value = props.get("value");

        // check if the position to the player is close
        const distance = position.distance(state.hero.position);
        if (distance <= 1) {
            state.entityStore.getEntityById(id)?.destroy(state);
            state.coins.addCoins(value);
            state.requestTick();
        }
    };

    const onRender = (id: string, props: Store<TreasureProps>, state: GameState) => {
        const [x, y] = props.get("position")!;

        return (
            <Sprite
                key={id}
                position={[x, y, 0.1]}
                onClick={() => collect(id, props, state)}
                sheet={treasureSprites}
                sprite={type}
            />
        );
    };

    const onDestroy = (id: string, _: Store<TreasureProps>, { entityStore }: GameState) => {
        entityStore.removeEntity(id);
    };

    const onUpdate = () => {};

    return createEntity<TreasureProps>({
        onRender,
        onDestroy,
        onUpdate,
        onInit,
    });
};
