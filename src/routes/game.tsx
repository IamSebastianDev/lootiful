/** @format */

import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { Scene } from "../components/scene";
import { HeroPanel } from "../components/hero-panel";
import { HeroStats } from "../components/hero-stats";
import { Display } from "../components/board/display";
import { useGame } from "../hooks/use-game";
import { StoppedScreen } from "../components/stopped-screen";
import { useSFX } from "../hooks/use-sfx";

const GameRoute: React.FC = () => {
    const { stopped, settings } = useGame();
    const music = useSFX("menu_song", settings, true);
    useEffect(() => {
        music.start();
        return () => {
            music.stop();
        };
    }, []);

    return (
        <Scene background="">
            <div className="stack horizontal full-h">
                <HeroPanel />
                <div className="stack vertical full-h" style={{ flexGrow: 3, background: "var(--lc-canvas)" }}>
                    <HeroStats />
                    {stopped && <StoppedScreen />}
                    <Display disablePointer={stopped} brightness={settings.brightness} />
                </div>
            </div>
        </Scene>
    );
};

export const Route = createFileRoute("/game")({
    component: GameRoute,
});
