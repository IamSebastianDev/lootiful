import { createFileRoute } from "@tanstack/react-router";
import { Scene } from "../components/scene";
import React from "react";
import { UiButton, UiButtonProps } from "../components/ui-button";
import background from "../assets/images/menu-bg.jpg";

const IndexRoute: React.FC = () => {
    const links: UiButtonProps[] = [
        { children: "New Game", href: "/game" },
        { children: "Continue Game", href: "/game?restore" },
        { children: "Options", href: "/options" },
    ];

    return (
        <Scene background={background}>
            <div className="container stack vertical tight between full-h">
                <div></div>
                <h1 className="text center large highlight">Lootiful</h1>
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
                    <a href="https://github.com/iamsebastiandev" target="_blank" rel="noreferrer nofollow noopener">
                        Sebastian
                    </a>{" "}
                    for{" "}
                    <a href="https://reactjam.com/" target="_blank" rel="noreferrer nofollow noopener">
                        ReactJam 2024
                    </a>
                    .
                </div>
            </div>
        </Scene>
    );
};

export const Route = createFileRoute("/")({
    component: IndexRoute,
});