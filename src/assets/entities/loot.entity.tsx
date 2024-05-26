import { Sprite } from "../../components/board/sprite";
import { EntityProps, createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { Store } from "../../functions/simple-store";
import { GameState } from "../../hooks/use-game";
import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import lootSprites from "../sprites/loot.sprites";

export type LootData<T extends SpriteSheet> = { sheet: T; key: keyof T["tileMap"]; chance: number; value: number };
export const lootTable = {
    loot: {
        skull1: { sheet: lootSprites, key: "skull1", chance: 0.1, value: 50 } satisfies LootData<typeof lootSprites>,
        skull2: { sheet: lootSprites, key: "skull2", chance: 0.2, value: 50 } satisfies LootData<typeof lootSprites>,
        skull3: { sheet: lootSprites, key: "skull3", chance: 0.1, value: 50 } satisfies LootData<typeof lootSprites>,
        skull4: { sheet: lootSprites, key: "skull4", chance: 0.25, value: 50 } satisfies LootData<typeof lootSprites>,
        skulls: { sheet: lootSprites, key: "skulls", chance: 0.15, value: 50 } satisfies LootData<typeof lootSprites>,
        unicornHorn: { sheet: lootSprites, key: "unicornHorn", chance: 0.15, value: 150 } satisfies LootData<
            typeof lootSprites
        >,
        tentacle: { sheet: lootSprites, key: "tentacle", chance: 0.05, value: 150 } satisfies LootData<
            typeof lootSprites
        >,
        slime: { sheet: lootSprites, key: "slime", chance: 0.35, value: 20 } satisfies LootData<typeof lootSprites>,
        skullJar: { sheet: lootSprites, key: "skullJar", chance: 0.05, value: 250 } satisfies LootData<
            typeof lootSprites
        >,
        ring1: { sheet: lootSprites, key: "ring1", chance: 0.25, value: 50 } satisfies LootData<typeof lootSprites>,
        ring2: { sheet: lootSprites, key: "ring2", chance: 0.25, value: 50 } satisfies LootData<typeof lootSprites>,
        ring3: { sheet: lootSprites, key: "ring3", chance: 0.05, value: 150 } satisfies LootData<typeof lootSprites>,
        ring4: { sheet: lootSprites, key: "ring4", chance: 0.05, value: 150 } satisfies LootData<typeof lootSprites>,
        ring5: { sheet: lootSprites, key: "ring5", chance: 0.05, value: 150 } satisfies LootData<typeof lootSprites>,
        ring6: { sheet: lootSprites, key: "ring6", chance: 0.025, value: 500 } satisfies LootData<typeof lootSprites>,
        ring7: { sheet: lootSprites, key: "ring7", chance: 0.025, value: 500 } satisfies LootData<typeof lootSprites>,
        ring8: { sheet: lootSprites, key: "ring8", chance: 0.025, value: 500 } satisfies LootData<typeof lootSprites>,
        ring9: { sheet: lootSprites, key: "ring9", chance: 0.025, value: 1000 } satisfies LootData<typeof lootSprites>,
        bag1: { sheet: lootSprites, key: "bag1", chance: 0.45, value: 50 } satisfies LootData<typeof lootSprites>,
        bag2: { sheet: lootSprites, key: "bag2", chance: 0.35, value: 100 } satisfies LootData<typeof lootSprites>,
        bag3: { sheet: lootSprites, key: "bag3", chance: 0.25, value: 250 } satisfies LootData<typeof lootSprites>,
        bag4: { sheet: lootSprites, key: "bag4", chance: 0.15, value: 500 } satisfies LootData<typeof lootSprites>,
        boneShards1: { sheet: lootSprites, key: "boneShards1", chance: 0.5, value: 25 } satisfies LootData<
            typeof lootSprites
        >,
        boneShards2: { sheet: lootSprites, key: "boneShards2", chance: 0.5, value: 25 } satisfies LootData<
            typeof lootSprites
        >,
        bone1: { sheet: lootSprites, key: "bone1", chance: 0.25, value: 35 } satisfies LootData<typeof lootSprites>,
        bone2: { sheet: lootSprites, key: "bone2", chance: 0.25, value: 40 } satisfies LootData<typeof lootSprites>,
        bone3: { sheet: lootSprites, key: "bone3", chance: 0.25, value: 45 } satisfies LootData<typeof lootSprites>,
        brain: { sheet: lootSprites, key: "brain", chance: 0.15, value: 90 } satisfies LootData<typeof lootSprites>,
    },
    getRandom() {
        const lootEntries = Object.entries(this.loot);
        const totalChance = lootEntries.reduce((acc, [, loot]) => acc + loot.chance, 0);

        let random = Math.random() * totalChance;

        for (const [key, loot] of lootEntries) {
            if (random < loot.chance) {
                return { ...loot, key: key as LootKey };
            }
            random -= loot.chance;
        }
    },
};
export type LootKey = keyof (typeof lootTable)["loot"];

export type LootCtor = {
    position: Position;
    type: LootKey;
    tooltip?: boolean;
};

export type LootProps = { position: Position; loot: LootData<any>; type: LootKey };

export const Loot = (ctor: LootCtor) => {
    const { position, type, tooltip = true } = ctor;
    const loot = lootTable.loot[type];

    const onInit = (_: string, props: Store<LootProps>) => {
        props.set("position", position);
        props.set("loot", loot);
        props.set("type", type);
    };

    const onPickUp = (id: string, props: Store<LootProps>, { entityStore, coins, cursor }: GameState) => {
        const { value } = props.get("loot");
        entityStore.removeEntity(id);
        coins.addCoins(value);
        cursor.setTooltip(null);
    };
    const onPointerIn = (_: string, props: Store<LootProps>, { cursor }: GameState) => {
        const type = props.get("type");
        const { value } = props.get("loot");
        cursor.setTooltip(`${type}: ${value}`);
    };
    const onPointerOut = (_: string, __: Store<LootProps>, { cursor }: GameState) => {
        cursor.setTooltip(null);
    };

    const onRender = (id: string, props: Store<LootProps>, state: GameState) => {
        const loot = lootTable.loot[type];
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
