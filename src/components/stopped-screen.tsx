import React from "react";
import { UiButton } from "./ui-button";
import { useGame } from "../hooks/use-game";
import { applyCharismaModifier } from "../functions/apply-charisma-modifier";
import coin from "../assets/images/coin.png";

export const StoppedScreen: React.FC = () => {
    const { startDungeonDive, lootStore, hero } = useGame();

    const price = lootStore.collected.reduce(
        (prev, curr) => prev + applyCharismaModifier(curr.item.value, hero.attributes.Charisma.value),
        0
    );

    return (
        <div className="loot-display">
            <div className="display-panel stack vertical relaxed">
                <h3 className="text normal highlight center">Your Dungeon Run is over!</h3>
                <p className="text tiny legible">
                    You have {price}
                    <img src={coin} /> worth of loot!
                </p>
                <p className="text tiny legible">Sell your loot and upgrade your attributes!</p>
                <UiButton href="" onClick={() => startDungeonDive()}>
                    <div className="text small">Back into the Dungeon</div>
                </UiButton>
            </div>
        </div>
    );
};
