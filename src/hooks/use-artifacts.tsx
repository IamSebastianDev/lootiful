import { useState } from "react";
import artifactsSprites from "../assets/sprites/artifacts.sprites";
import dungeonSprites from "../assets/sprites/dungeon.sprites";
import { useDungeonMap } from "./use-dungeon-map";
import { SpriteSheet } from "./use-sprite-sheet";
import { Artifact } from "../assets/entities/artifact.entity";
import { Position } from "../functions/position";

export type ArtifactData = {
    name: string;
    lore: string;
    rarity: number;
    sprite: keyof (typeof artifactsSprites)["tileMap"];
};

export type ArtifactTable<T extends SpriteSheet> = {
    [K in keyof T["tileMap"]]: ArtifactData;
};
export const artifactTable: ArtifactTable<typeof artifactsSprites> = {
    armor: {
        name: "Aegis of the Eternal Guardian",
        lore: "Forged by the ancient blacksmiths of the shadow realms, this armor is said to have protected the dark knight who walked between worlds. Its surface is etched with runes of protection, glowing faintly in the presence of danger. The armor has endured countless battles, its metal still as impenetrable as the day it was forged.",
        rarity: 0.2,
        sprite: "armor",
    },
    beet: {
        name: "Heartroot of Vitality",
        lore: "This mystical beet pulses with life energy, bestowing great endurance to those who consume it. Cultivated in the sacred gardens of an elven warrior, its vibrant red hue is said to mirror the life force it grants. Consuming the Heartroot fills one with unparalleled vigor, able to run without tiring and fight without falter.",
        rarity: 0.5,
        sprite: "beet",
    },
    bottle: {
        name: "Vessel of Whispered Secrets",
        lore: "Legends speak of this bottle containing the voices of spirits long forgotten, offering guidance to the worthy. Those who listen can hear whispers of ancient lore, forgotten spells, and lost histories. The bottle is a key to the past, revealing truths that even the oldest tomes have forgotten.",
        rarity: 0.8,
        sprite: "bottle",
    },
    crystal: {
        name: "Shard of the Eternal Prism",
        lore: "A fragment of an ancient crystal, it refracts the light of truth and banishes shadows. The Shard's inner light is said to be a fragment of the first dawn, captured and preserved for eternity. Its brilliance can pierce the darkest of places, revealing hidden paths and secret treasures.",
        rarity: 0.4,
        sprite: "crystal",
    },
    flask: {
        name: "Elixir of Endless Resolve",
        lore: "This flask never runs dry, filled with a potion that grants unwavering determination. Crafted by alchemists in the high mountains, the elixir inside fuels the spirit with relentless resolve. Warriors who drink from it face their foes with unyielding courage, never backing down from a challenge.",
        rarity: 0.2,
        sprite: "flask",
    },
    helmet: {
        name: "Helm of the Undaunted",
        lore: "Worn by champions in the darkest battles, this helmet inspires bravery and fortitude. Crafted from the finest steel and enchanted with spells of valor, the Helm of the Undaunted turns fear into strength. Its wearer stands as a beacon of hope, leading allies through the most perilous of trials.",
        rarity: 0.5,
        sprite: "helmet",
    },
    honey: {
        name: "Nectar of the Golden Hive",
        lore: "An elixir made from the honey of legendary bees, said to heal all wounds. The Nectar is collected from hives hidden deep within enchanted forests, guarded by mystical creatures. A single drop can mend broken bones and soothe the deepest of wounds, its golden glow a testament to its miraculous properties.",
        rarity: 0.6,
        sprite: "honey",
    },
    ring: {
        name: "Ring of the Veil Walker",
        lore: "This ring allows its wearer to step between worlds, unseen and unheard. Forged in the fires of Mount Doom, the Ring of the Veil Walker grants the power of invisibility and silence. It is a prized possession for those who tread dangerous paths, enabling them to slip through the shadows unnoticed.",
        rarity: 0.3,
        sprite: "ring",
    },
    slab: {
        name: "Stone of Timeless Rest",
        lore: "A sacred slab that grants peaceful slumber, free from nightmares and disturbance. The Stone of Timeless Rest is carved from the ancient stones of Barrow Downs, its surface cool to the touch. Sleeping upon it brings dreams of tranquility and rejuvenation, restoring both body and soul.",
        rarity: 0.5,
        sprite: "slab",
    },
    steak: {
        name: "Champion's Feast",
        lore: "A cut of meat blessed by the gods, it rejuvenates and empowers those who partake. The Champion's Feast is said to have been served at the legendary banquets of Camelot, infusing knights with the strength of a hundred men. Its flavors are rich and savory, filling one with a divine sense of vigor.",
        rarity: 0.3,
        sprite: "steak",
    },
    strawberry: {
        name: "Everbloom Berry",
        lore: "A strawberry that never decays, holding the essence of eternal spring within. The Everbloom Berry was discovered by a wandering hobbit in the Shire, its sweet taste a reminder of home. It brings warmth and happiness to those who eat it, a small piece of paradise in every bite.",
        rarity: 0.8,
        sprite: "strawberry",
    },
    sword: {
        name: "Blade of the First Light",
        lore: "Forged in the dawn of time, this sword blazes with the power of the sun itself. The Blade of the First Light was wielded by the greatest heroes of old, its edge sharp enough to cut through darkness. It shines with a radiant light, banishing evil and bringing hope to the battlefield.",
        rarity: 0.2,
        sprite: "sword",
    },
    vial: {
        name: "Tears of the Moon",
        lore: "A vial containing the tears of a lunar deity, it possesses unparalleled healing properties. The Tears of the Moon are collected under the light of a full moon, their silver glow soothing and calming. They can heal the gravest of injuries and cure the most stubborn of ailments, a true miracle in a bottle.",
        rarity: 0.9,
        sprite: "vial",
    },
    wood: {
        name: "Whispering Timber",
        lore: "Carved from an ancient tree, this wood speaks of forgotten lore and hidden truths. The Whispering Timber holds the memories of the forest, its voice soft but clear. It shares its secrets with those who listen, revealing ancient knowledge and guiding lost souls on their journey.",
        rarity: 0.5,
        sprite: "wood",
    },
};
export const useArtifacts = () => {
    const [collectedArtifacts, setCollectedArtifacts] = useState<ArtifactData[]>([]);

    const getArtifactByChance = () => {
        const uncollectedArtifacts = Object.values(artifactTable).filter(
            (artifact) => !collectedArtifacts.includes(artifact)
        );

        const totalRarity = uncollectedArtifacts.reduce((total, artifact) => total + (1 - artifact.rarity), 0);

        let randomValue = Math.random() * totalRarity;

        for (const artifact of uncollectedArtifacts) {
            const weight = 1 - artifact.rarity;
            if (randomValue < weight) {
                return artifact;
            }
            randomValue -= weight;
        }

        return null; // In case all artifacts are collected
    };

    const collectArtifact = (artifact: ArtifactData) => {
        setCollectedArtifacts((c) => [...c, artifact]);
    };

    return { collectArtifact, collectedArtifacts, getArtifactByChance };
};
