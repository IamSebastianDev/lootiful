import React from "react";
import { LootData } from "../hooks/use-loot";
import { UiButton } from "./ui-button";
import coin from "../assets/images/coin.png";

export type LootCardProps = {
    item: LootData<any>;
    handleOnClick: () => void;
};
export const LootCard: React.FC<LootCardProps> = ({ item, handleOnClick }) => {
    return (
        <div className="loot-card stack horizontal loose center">
            <div className="stack vertical tight grow center">
                <div title={item.name} className="text tiny legible inline highlight stack horizontal relaxed center">
                    <span>{item.name}</span>
                    <span className="text tiny stack horizontal center">
                        {item.value}
                        <img src={coin} />
                    </span>
                </div>
                <div className="text tiny legible">{item.lore}</div>
            </div>
            <UiButton href="" onClick={() => handleOnClick()}>
                <span className="text tiny">Sell</span>
            </UiButton>
        </div>
    );
};
