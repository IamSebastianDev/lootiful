import React, { ChangeEvent, useCallback } from "react";
import { useGame } from "../hooks/use-game";
import { HeroAttributes } from "./hero-attributes";
import { Loot, lootTable } from "../assets/entities/loot";
import { Skeleton } from "../assets/entities/skeleton";
import { Position } from "../functions/position";

// Name
// Attributes (clickable when enough money exists)
// Loot list

export const HeroPanel: React.FC = () => {
    const { hero, entities, coins, cursor } = useGame();
    const handleNameChange = (event: ChangeEvent) => {
        const name = (event.target as HTMLInputElement).value;
        hero.changeName(name);
    };

    const addLoot = useCallback(
        (pos?: Position) => {
            const entry = lootTable.getRandom();
            const position = pos ?? entities.getAvailableTile()?.position;
            if (position && entry) {
                entities.addEntity(
                    Loot({
                        position,
                        type: entry.key,
                        onPickUp: ({ id }) => {
                            entities.removeEntity(id);
                            coins.addCoins(entry.value);
                            cursor.setTooltip(null);
                        },
                        onPointerIn: ({ type, loot }) => cursor.setTooltip(`${type}: ${loot.value}`),
                        onPointerOut: () => cursor.setTooltip(null),
                    })
                );
            }
        },
        [entities.entities]
    );

    const addEnemy = useCallback(() => {
        const position = entities.getAvailableTile()?.position;

        if (position) {
            entities.addEntity(
                Skeleton({
                    position,
                    onDestroy: (id, props, entities) => {
                        const position = props.get("position");
                        entities.removeEntity(id);
                        addLoot(position);
                    },
                    onUpdate: (id, props, entities) => {
                        const health = props.get("health");
                        if (health < 1) {
                            entities.getEntityById(id)?.destroy(entities);
                        }
                    },
                    onHit: (_, props) => {
                        const health = props.get("health");
                        props.set("health", Math.max(0, health - 1));
                    },
                })
            );
        }
    }, [entities]);

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
            <button onClick={() => addEnemy()}>Add Skeleton</button>
        </aside>
    );
};
