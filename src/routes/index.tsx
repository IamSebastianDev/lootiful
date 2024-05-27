/** @format */

import { createFileRoute } from "@tanstack/react-router";
import { Scene } from "../components/scene";
import React, { useEffect, useRef } from "react";
import { UiButton, UiButtonProps } from "../components/ui-button";
import background from "../assets/images/menu-bg.jpg";
import { useGame } from "../hooks/use-game";
import { useSFX } from "../hooks/use-sfx";

let started = false;

const IndexRoute: React.FC = () => {
    const { reset, tick, settings } = useGame();
    const { trigger } = useSFX("menu_click", settings);
    const music = useSFX("shadows_lament", settings, true);

    useEffect(() => {
        if (started) {
            music.start();
        }

        return () => {
            music.stop();
        };
    }, [started]);

    const links: UiButtonProps[] = [
        {
            children: "New Game",
            href: "/game",
            onClick: () => {
                trigger();
                reset();
            },
        },
        {
            children: "Continue Game",
            href: "/game?restore",
            disabled: tick === 0,
            onClick: () => {
                trigger();
            },
        },
        {
            children: "How to play",
            href: "/how-to-play",
            onClick: () => {
                trigger();
            },
        },
        {
            children: "Options",
            href: "/options",
            onClick: () => {
                trigger();
            },
        },
    ];

    return (
        <Scene background={background}>
            <div className="social-links">
                <UiButton href="https://github.com/iamsebastiandev">
                    <svg width={24} height={24} viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </UiButton>
            </div>
            <div className="container stack vertical tight between full-h">
                {started ? (
                    <>
                        <div></div>
                        <h1 className="text center highlight">Lootiful</h1>
                        <div className="list-container">
                            <ul>
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <UiButton {...link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text right tiny menu-text">
                            Made by{" "}
                            <a
                                href="https://github.com/iamsebastiandev"
                                target="_blank"
                                rel="noreferrer nofollow noopener"
                            >
                                Sebastian
                            </a>{" "}
                            for{" "}
                            <a href="https://reactjam.com/" target="_blank" rel="noreferrer nofollow noopener">
                                ReactJam 2024
                            </a>
                            .
                        </div>
                    </>
                ) : (
                    <>
                        <div></div>
                        <div className="list-container claim-left claim-right">
                            <UiButton href="" onClick={() => (started = true)}>
                                Start Game
                            </UiButton>
                        </div>
                        <div></div>
                    </>
                )}
            </div>
        </Scene>
    );
};

export const Route = createFileRoute("/")({
    component: IndexRoute,
});
