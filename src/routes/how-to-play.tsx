import { createFileRoute } from "@tanstack/react-router";
import { Scene } from "../components/scene";
import { UiButton } from "../components/ui-button";

export const Route = createFileRoute("/how-to-play")({
    component: () => {
        return (
            <Scene background={""}>
                <div className="stack vertical relaxed center all full-h full-w">
                    <div className="stack vertical instructions-panel relaxed">
                        <div className="text highlight legible center large">HOW TO PLAY!</div>
                        <p className="text legible tiny">
                            Use the mouse to click around. You can move one space at a time. Enemies will only move if
                            you move, and only attack when you attack.
                        </p>
                        <p className="text legible tiny">
                            Each dungeon dive last's while you have stamina, each action drains your stamina. When you
                            run out of stamina, the dungeon dive ends, and a new one can be started.
                        </p>
                        <p className="text legible tiny">
                            To win the game, pickup all 14 Artifacts hidden in the dungeon without dying.
                        </p>
                        <p className="text legible tiny">
                            Killed enemies will drop loot you can sell, which gives you coins. Coins can be used to
                            enhance your stats. This will increase your health and your stamina, which will give you
                            more chances to find loot and let's you stay longer in the dungeon.
                        </p>
                        <UiButton href="/">Back to menu</UiButton>
                    </div>
                </div>
            </Scene>
        );
    },
});
