import React, { ChangeEvent } from "react";
import { useGame } from "../hooks/use-game";
import { HeroAttributes } from "./hero-attributes";
import { Loot, lootTable } from "../assets/entities/loot";

// Name
// Attributes (clickable when enough money exists)
// Loot list

export const HeroPanel: React.FC = () => {
    const { hero, entities, coins } = useGame();
    const handleNameChange = (event: ChangeEvent) => {
        const name = (event.target as HTMLInputElement).value;
        hero.changeName(name);
    };

    console.log({ hero });

    const addLoot = () => {
        const entry = lootTable.getRandom();
        const position = entities.getAvailableTile()?.position;
        if (position && entry) {
            entities.addEntity(
                Loot({
                    position,
                    type: entry.key,
                    onPickUp: ({ id }) => {
                        entities.removeEntity(id);
                        coins.addCoins(entry.value);
                    },
                })
            );
        }
    };

    return (
        <aside className="hero-panel stack vertical relaxed container full-h">
            <input
                type="text"
                className="text small"
                value={hero.name ?? ""}
                placeholder="Give your Hero a name!"
                onChange={(event) => handleNameChange(event)}
            />
            <HeroAttributes />
            <hr />
            <button onClick={() => hero.damageHero(10)}>Hurt Hero</button>
            <button onClick={() => addLoot()}>Add Loot</button>
        </aside>
    );
};
