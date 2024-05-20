import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Scene } from "../components/scene";
import { useGame } from "../hooks/use-game";
import coin from "../assets/images/coin.png";
import { HeroPanel } from "../components/hero-panel";

const GameRoute: React.FC = () => {
    const { coins } = useGame();

    return (
        <Scene background="">
            {/* Top bar */}
            <div className="top-bar stack horizontal center">
                <div className="text small">{coins.current}</div>
                <img className="w-xl h-xl" src={coin}></img>
            </div>
            {/* Hero Panel */}
            <HeroPanel />
        </Scene>
    );
};

export const Route = createFileRoute("/game")({
    component: GameRoute,
});
