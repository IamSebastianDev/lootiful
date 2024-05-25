import { Sprite } from "../../components/board/sprite";
import { createEntity } from "../../data/entity";
import { Position } from "../../functions/position";
import { SpriteSheet } from "../../hooks/use-sprite-sheet";
import lootSprites from "../sprites/loot.sprites";

export type LootData<T extends SpriteSheet> = { sheet: T; key: keyof T["tileMap"] };
export const lootTypes = {
    bone: { sheet: lootSprites, key: "bone" } as LootData<typeof lootSprites>,
};
export type LootKey = keyof typeof lootTypes;

export type LootCtor = {
    position: Position;
    type: LootKey;
    onPickUp: (data: { id: string; position: Position; type: LootKey }) => void;
};

export const Loot = (ctor: LootCtor) => {
    const { position, type, onPickUp } = ctor;
    const { sheet, key } = lootTypes[type];

    const onRender = (id: string, position: Position) => {
        const [x, y] = position;
        return (
            <Sprite
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
