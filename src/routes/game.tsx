import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Scene } from "../components/scene";

const GameRoute: React.FC = () => {
    return (
        <Scene background="">
            <div></div>
        </Scene>
    );
};

export const Route = createFileRoute("/game")({
    component: GameRoute,
});
