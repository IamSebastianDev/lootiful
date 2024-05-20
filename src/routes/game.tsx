import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Scene } from "../components/scene";

import { HeroPanel } from "../components/hero-panel";
import { HeroStats } from "../components/hero-stats";

const GameRoute: React.FC = () => {
    return (
        <Scene background="">
            <div className="stack horizontal full-h">
                <HeroPanel />
                <div className="stack vertical full-h full-w">
                    <HeroStats />
                </div>
            </div>
        </Scene>
    );
};

export const Route = createFileRoute("/game")({
    component: GameRoute,
});
