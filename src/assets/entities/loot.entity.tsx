import { Sprite } from "../../components/board/sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import { LootData, lootTable } from "../../hooks/use-loot";

export type LootKey = keyof typeof lootTable;

export type LootCtor = {
    position: Position;
    type: LootKey;
    tooltip?: boolean;
};

export type LootProps = { position: Position; loot: LootData<any>; type: LootKey };

export const Loot = (ctor: LootCtor) => {
    const { position, type, tooltip = true } = ctor;
    const loot = lootTable[type]!;

    const onInit = (_: string, props: Store<LootProps>) => {
        props.set("position", position);
        props.set("loot", loot);
        props.set("type", type);
    };

    const onPickUp = (id: string, props: Store<LootProps>, { cursor, lootStore, hero, stats }: GameState) => {
        const position = props.get("position");

        // check if the position to the player is close
        const distance = position.distance(hero.position);
        if (distance <= 1) {
            lootStore.collect(id);
            cursor.setTooltip(null);
            stats.trackLoot();
        }
    };

    const onPointerIn = (_: string, props: Store<LootProps>, { cursor }: GameState) => {
        const { value, name } = props.get("loot");
        cursor.setTooltip(`${name}: ${value}`);
    };
    const onPointerOut = (_: string, __: Store<LootProps>, { cursor }: GameState) => {
        cursor.setTooltip(null);
    };

    const onRender = (id: string, props: Store<LootProps>, state: GameState) => {
        const loot = lootTable[type]!;
        const [x, y] = props.get("position");
        return (
            <Sprite
                onPointerEnter={() => tooltip && onPointerIn(id, props, state)}
                onPointerLeave={() => tooltip && onPointerOut(id, props, state)}
                onClick={() => onPickUp(id, props, state)}
                key={id}
                position={[x, y, 0.1]}
                sheet={loot.sheet}
                sprite={loot.key}
            />
        );
    };

    return createEntity<LootProps>({ onRender, onInit });
};
