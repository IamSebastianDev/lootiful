import React from "react";
import { UiButton } from "./ui-button";
import { useGame } from "../hooks/use-game";

export const StoppedScreen: React.FC = () => {
    const { startDungeonDive } = useGame();

    return (
        <div className="display">
            <div className="display-panel">
                <UiButton href="" onClick={() => startDungeonDive()}>
                    <div className="text small">Back into the Dungeon</div>
                </UiButton>
            </div>
        </div>
    );
};
