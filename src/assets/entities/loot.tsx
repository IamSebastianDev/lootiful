import { Sprite } from "../../components/board/sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
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
    onPickUp: (data: { id: string; position: Position; type: LootKey }) => void;
    onPointerIn?: (data: { id: string; loot: LootData<any>; type: LootKey }) => void;
    onPointerOut?: (data: { id: string; loot: LootData<any>; type: LootKey }) => void;
};

export const Loot = (ctor: LootCtor) => {
    const { position, type, onPickUp, onPointerIn, onPointerOut } = ctor;
    const { sheet, key } = lootTable.loot[type];

    const onRender = (id: string, position: Position) => {
        const loot = lootTable.loot[type];
        const [x, y] = position;
        return (
            <Sprite
                onPointerEnter={() => onPointerIn?.({ id, loot, type })}
                onPointerLeave={() => onPointerOut?.({ id, loot, type })}
                onClick={() => onPickUp({ id, type, position })}
                key={id}
                position={[x, y, 0.1]}
                sheet={sheet}
                sprite={key}
            />
        );
    };

    return createEntity({ position, onRender });
};
