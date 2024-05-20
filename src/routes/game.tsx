import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Scene } from "../components/scene";
import { useGame } from "../hooks/use-game";
import coin from "../assets/images/coin.png";
import { useKeyDown } from "../hooks/use-key-down";
import { router } from "../main";

const GameRoute: React.FC = () => {
    const { coins } = useGame();
    useKeyDown(["Escape"], () => router.navigate({ to: "/" }));

    return (
        <Scene background="">
            {/* Top bar */}
            <div className="top-bar stack horizontal center">
                <div className="text small">{coins.current}</div>
                <img className="w-xl h-xl" src={coin}></img>
            </div>
        </Scene>
    );
};

export const Route = createFileRoute("/game")({
    component: GameRoute,
});
