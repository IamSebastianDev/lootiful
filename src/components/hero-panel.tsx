import React, { ChangeEvent, useState } from "react";
import { useGame } from "../hooks/use-game";
import { HeroAttributes } from "./hero-attributes";
import { LootCard } from "./loot-card";
import { LootData } from "../hooks/use-loot";
import { useSFX } from "../hooks/use-sfx";
import { artifactTable } from "../hooks/use-artifacts";
import { UiButton } from "./ui-button";
import { ArtifactCard } from "./artifact-card";

export const HeroPanel: React.FC = () => {
    const { hero, lootStore, coins, artifactStore, stats } = useGame();
    const sellSfx = useSFX("sold");
    const [showArtifactPanel, setShowArtifactPanel] = useState(false);

    const handleNameChange = (event: ChangeEvent) => {
        const name = (event.target as HTMLInputElement).value;
        hero.rename(name);
    };

    const handleSaleClick = ({ id, item }: { id: string; item: LootData<any> }) => {
        coins.addCoins(item.value);
        stats.trackCoins(item.value);
        lootStore.sellCollected(id);
        sellSfx.trigger();
    };

    return showArtifactPanel ? (
        <aside className="hero-panel stack vertical relaxed container full-h">
            <div className="stack horizontal tight between center auto-w-link">
                <span className="text highlight legible small center ">
                    Artifacts: {artifactStore.collectedArtifacts.length} / {Object.keys(artifactTable).length}
                </span>
                <UiButton href="" onClick={() => setShowArtifactPanel(false)}>
                    <span className="text tiny">Close</span>
                </UiButton>
            </div>
            <hr />
            <div className="stack vertical tight artifact-list">
                {artifactStore.collectedArtifacts.map((artifact, idx) => (
                    <ArtifactCard artifact={artifact} key={idx} />
                ))}
            </div>
        </aside>
    ) : (
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
            <div className="stack horizontal tight between center auto-w-link">
                <span className="text highlight legible small center ">
                    Artifacts: {artifactStore.collectedArtifacts.length} / {Object.keys(artifactTable).length}
                </span>
                <UiButton href="" onClick={() => setShowArtifactPanel(true)}>
                    <span className="text small">Show</span>
                </UiButton>
            </div>
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
