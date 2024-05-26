import React from "react";
import { useGame } from "../hooks/use-game";
import { Attribute } from "../hooks/use-attributes";
import { getAttributeCost } from "../functions/get-attribute-cost";

export const HeroAttributes: React.FC = () => {
    const { hero, coins, stopped } = useGame();

    const handleAttributeClick = (name: Attribute, value: number) => {
        const cost = getAttributeCost(value);
        coins.spendCoins(cost);
        hero.bumpAttributeByType(name);
    };
    const disableAttribute = (value: number) => {
        return !stopped || getAttributeCost(value) > coins.current;
    };

    return (
        <div className="stack horizontal tight around">
            {Object.values(hero.attributes).map((attr) => {
                return (
                    <div key={attr.name} className="stack vertical tight">
                        <div className="text small">{attr.short}</div>
                        <button
                            disabled={disableAttribute(attr.value)}
                            onClick={() => handleAttributeClick(attr.name, attr.value)}
                        >
                            {attr.value}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
