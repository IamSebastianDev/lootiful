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
                            Use the MOUSE to click around. You can move one space at a time. ENEMIES will only MOVE if
                            you MOVE, and only ATTACK when you ATTACK.
                        </p>
                        <p className="text legible tiny">
                            Each dungeon dive lasts while you have STAMINA and HEALTH, each action drains your STAMINA.
                            When you run out of STAMINA, the dungeon dive ends, and a new one can be started.
                        </p>
                        <p className="text legible tiny">
                            To win the GAME, pickup all 14 ARTIFACTS hidden in the dungeon without DYING.
                        </p>
                        <p className="text legible tiny">
                            Killed ENEMIES will drop LOOT you can sell, which gives you COINS. COINS can be used to
                            enhance your ATTRIBUTES. This will increase your HEALTH and STAMINA, which will give you
                            more chances to find LOOT and lets you stay longer in the dungeon.
                        </p>
                        <UiButton href="/">Back to menu</UiButton>
                    </div>
                </div>
            </Scene>
        );
    },
});
