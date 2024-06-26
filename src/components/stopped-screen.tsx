import React from "react";
import { UiButton } from "./ui-button";
import { useGame } from "../hooks/use-game";
import { applyCharismaModifier } from "../functions/apply-charisma-modifier";
import coin from "../assets/images/coin.png";

export const StoppedScreen: React.FC = () => {
    const { startDungeonDive, lootStore, hero, coins, stats, artifactStore } = useGame();

    const price = lootStore.collected.reduce(
        (prev, curr) => prev + applyCharismaModifier(curr.item.value, hero.attributes.Charisma.value),
        0
    );

    const sellAllLoot = () => {
        lootStore.collected.forEach(({ id, item }) => {
            const value = applyCharismaModifier(item.value, hero.attributes.Charisma.value);
            coins.addCoins(value);
            stats.trackCoins(value);
            lootStore.sellCollected(id);
        });
    };

    return (
        <div className="loot-display">
            {hero.dead ? (
                <div className="display-panel stack vertical relaxed">
                    <h3 className="text normal highlight center">You died! Game over!</h3>
                    <p className="text tiny legible">
                        You have found {artifactStore.collectedArtifacts.length} Artifacts.
                    </p>
                    <p className="text tiny legible">Better luck next time!</p>
                    <UiButton href="/game-over">
                        <div className="text small">Game Over</div>
                    </UiButton>
                </div>
            ) : hero.tired ? (
                <div className="display-panel stack vertical relaxed">
                    <h3 className="text normal highlight">You ran out of breath and left the Dungeon!</h3>
                    <p className="text tiny legible">
                        You have {price}
                        <img src={coin} /> worth of loot!
                    </p>
                    <p className="text tiny legible">Sell your loot and upgrade your attributes!</p>
                    <UiButton href="" onClick={() => startDungeonDive()}>
                        <div className="text small">Back into the Dungeon</div>
                    </UiButton>
                    <UiButton disabled={lootStore.collected.length === 0} href="" onClick={() => sellAllLoot()}>
                        <div className="text small">Sell all Loot</div>
                    </UiButton>
                </div>
            ) : null}
        </div>
    );
};
