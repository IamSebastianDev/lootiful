import React, { ChangeEvent } from "react";
import { useGame } from "../hooks/use-game";
import { HeroAttributes } from "./hero-attributes";
import { LootCard } from "./loot-card";
import { LootData } from "../hooks/use-loot";

export const HeroPanel: React.FC = () => {
    const { hero, lootStore, coins } = useGame();

    const handleNameChange = (event: ChangeEvent) => {
        const name = (event.target as HTMLInputElement).value;
        hero.rename(name);
    };

    const handleSaleClick = ({ id, item }: { id: string; item: LootData<any> }) => {
        coins.addCoins(item.value);
        lootStore.sellCollected(id);
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
            <div className="stack vertical tight loot-list">
                {lootStore.collected.map((loot) => {
                    return (
                        <LootCard key={loot.id} handleOnClick={() => handleSaleClick(loot)} item={loot.item}></LootCard>
                    );
                })}
            </div>
        </aside>
    );
};
