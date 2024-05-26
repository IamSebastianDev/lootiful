import { useState } from "react";
import { Loot } from "../assets/entities/loot.entity";
import lootSprites from "../assets/sprites/loot.sprites";
import { Position } from "../functions/position";
import { SpriteSheet } from "./use-sprite-sheet";
import { Entity } from "../data/entity";
import { useDungeonMap } from "./use-dungeon-map";
import { rnd } from "../functions/rnd";
import dungeonSprites from "../assets/sprites/dungeon.sprites";

export type LootData<T extends SpriteSheet> = {
    sheet: T;
    key: keyof T["tileMap"];
    chance: number;
    value: number;
    lore?: string;
    name?: string;
};
export type LootTable<T extends SpriteSheet> = {
    [K in keyof T["tileMap"]]+?: LootData<T>;
};

export const lootTable: LootTable<typeof lootSprites> = {
    skull1: {
        sheet: lootSprites,
        key: "skull1",
        name: "Broken Skull",
        chance: 0.1,
        value: 50,
        lore: "A broken skull",
    },
    skull2: {
        sheet: lootSprites,
        key: "skull2",
        name: "Simian Skull",
        chance: 0.2,
        value: 50,
        lore: "A seemingly simian skull",
    },
    skull3: {
        sheet: lootSprites,
        key: "skull3",
        name: "Hollow Skull",
        chance: 0.1,
        value: 50,
        lore: "A hollow skull",
    },
    skull4: {
        sheet: lootSprites,
        key: "skull4",
        name: "Perforated Skull",
        chance: 0.25,
        value: 50,
        lore: "A skull with more holes then usual",
    },
    skulls: {
        sheet: lootSprites,
        key: "skulls",
        name: "Bunch of Skulls",
        chance: 0.15,
        value: 50,
        lore: "A whole bunch of skulls",
    },
    unicornHorn: {
        sheet: lootSprites,
        key: "unicornHorn",
        name: "Unicorn Horn",
        chance: 0.15,
        value: 150,
        lore: "A witcher's favorite toy",
    },
    tentacle: {
        sheet: lootSprites,
        key: "tentacle",
        name: "Slimy Tentacle",
        chance: 0.05,
        value: 150,
        lore: "A slimy tentacle",
    },
    slime: {
        sheet: lootSprites,
        key: "slime",
        name: "Slime Remains",
        chance: 0.35,
        value: 20,
        lore: "The remains of a slime",
    },
    skullJar: {
        sheet: lootSprites,
        key: "skullJar",
        name: "Skull in Jar",
        chance: 0.05,
        value: 250,
        lore: "A jar with a skull",
    },
    ring1: {
        sheet: lootSprites,
        key: "ring1",
        name: "Bronze Ring",
        chance: 0.25,
        value: 50,
        lore: "A bronze ring without a gem",
    },
    ring2: {
        sheet: lootSprites,
        key: "ring2",
        name: "Gemmed Bronze Ring",
        chance: 0.25,
        value: 50,
        lore: "A bronze ring with a gem",
    },
    ring3: {
        sheet: lootSprites,
        key: "ring3",
        name: "Bronze Band",
        chance: 0.05,
        value: 150,
        lore: "A bronze band",
    },
    ring4: {
        sheet: lootSprites,
        key: "ring4",
        name: "Silver Gemmed Ring",
        chance: 0.05,
        value: 150,
        lore: "A silver ring with a gem",
    },
    ring5: {
        sheet: lootSprites,
        key: "ring5",
        name: "Gold Ruby Ring",
        chance: 0.05,
        value: 150,
        lore: "A gold ring with a ruby",
    },
    ring6: {
        sheet: lootSprites,
        key: "ring6",
        name: "Black Death Ring",
        chance: 0.005,
        value: 1500,
        lore: "The black death ring",
    },
    ring7: {
        sheet: lootSprites,
        key: "ring7",
        name: "Golden Ring",
        chance: 0.025,
        value: 500,
        lore: "A golden ring with a missing gem slot",
    },
    ring8: {
        sheet: lootSprites,
        key: "ring8",
        name: "The One Ring",
        chance: 0.005,
        value: 2500,
        lore: "The one ring",
    },
    ring9: {
        sheet: lootSprites,
        key: "ring9",
        name: "Lover's Silver Band",
        chance: 0.025,
        value: 1000,
        lore: "A silver band with lover's inscription",
    },
    bag1: {
        sheet: lootSprites,
        key: "bag1",
        name: "Stuffed Bag",
        chance: 0.45,
        value: 50,
        lore: "A bag with stuff in it",
    },
    bag2: {
        sheet: lootSprites,
        key: "bag2",
        name: "Stuffed Sack",
        chance: 0.35,
        value: 100,
        lore: "A sack with stuff in it",
    },
    bag3: {
        sheet: lootSprites,
        key: "bag3",
        name: "Stuffed Pouch",
        chance: 0.25,
        value: 250,
        lore: "A pouch with stuff in it",
    },
    bag4: {
        sheet: lootSprites,
        key: "bag4",
        name: "Stuffed Backpack",
        chance: 0.15,
        value: 500,
        lore: "A backpack with stuff in it",
    },
    boneShards1: {
        sheet: lootSprites,
        key: "boneShards1",
        name: "Bone Shards",
        chance: 0.5,
        value: 25,
        lore: "A bunch of bone shards",
    },
    boneShards2: {
        sheet: lootSprites,
        key: "boneShards2",
        name: "Broken Femur",
        chance: 0.5,
        value: 25,
        lore: "A broken femur",
    },
    bone1: {
        sheet: lootSprites,
        key: "bone1",
        name: "Bone",
        chance: 0.25,
        value: 35,
        lore: "A bone",
    },
    bone2: {
        sheet: lootSprites,
        key: "bone2",
        name: "Skeleton Remains",
        chance: 0.25,
        value: 40,
        lore: "Some skeleton had a really bad day",
    },
    bone3: {
        sheet: lootSprites,
        key: "bone3",
        name: "Dog's Toy",
        chance: 0.25,
        value: 45,
        lore: "A dog's favorite toy",
    },
    brain: {
        sheet: lootSprites,
        key: "brain",
        name: "Brain",
        chance: 0.15,
        value: 90,
        lore: "All brain, no body",
    },
};

export const useLoot = (map: ReturnType<typeof useDungeonMap<typeof dungeonSprites>>) => {
    const [loot, setLoot] = useState<Entity<{ position: Position; loot: LootData<any> }>[]>([]);
    const [collected, setCollected] = useState<{ id: string; item: LootData<any> }[]>([]);

    const addLoot = (loot: Entity<{ position: Position; loot: LootData<any> }>) => {
        setLoot((c) => [...c, loot]);
    };

    const getLootByChance = () => {
        const lootArray = Object.values(lootTable);
        const totalChance = lootArray.reduce((sum, item) => sum + item.chance, 0);
        const randomChance = Math.random() * totalChance;

        let accumulatedChance = 0;
        for (const loot of lootArray) {
            accumulatedChance += loot.chance;
            if (randomChance < accumulatedChance) {
                return loot;
            }
        }
        return lootArray[lootArray.length - 1]; // Fallback in case of rounding issues
    };

    const spawnLoot = (position: Position) => {
        const entry = getLootByChance();
        if (position && entry) {
            addLoot(Loot({ position, type: entry.key }));
        }
    };

    const spawnLootSpread = (position: Position) => {
        const spread = map.getAdjacentTiles(position);
        const num = rnd.number(1, spread.length);
        const tiles = rnd.entries(spread, num);
        tiles.forEach((tile) => {
            const { position } = tile;
            const entry = getLootByChance();
            addLoot(Loot({ position, type: entry.key }));
        });
    };

    const collect = (lootId: string) => {
        const [{ props }] = [...loot].filter(({ id }) => id === lootId);
        const data = props.get("loot");
        setCollected((c) => [...c, { id: lootId, item: data }]);
        setLoot((c) => [...c.filter(({ id }) => id !== lootId)]);
    };

    const atPosition = (position: Position) => {
        return loot.find(({ props }) => props.get("position").match(position));
    };

    const sellCollected = (lootId: string) => {
        setCollected((c) => [...c.filter(({ id }) => id !== lootId)]);
    };

    const clear = () => {
        setLoot([]);
    };

    return {
        getLootByChance,
        spawnLoot,
        spawnLootSpread,
        loot,
        collect,
        atPosition,
        collected,
        clear,
        sellCollected,
    };
};
