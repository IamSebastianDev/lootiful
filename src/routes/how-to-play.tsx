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
                        <div className="text highlight legible center large">Credits:</div>
                        <a className="text tiny legible" href="https://pixel-poem.itch.io/dungeon-assetpuck/">
                            Main Spritesheet and Tileset
                        </a>
                        <a className="text tiny legible" href="https://suno.com">
                            Suno.ai for the Music
                        </a>
                        <a className="text tiny legible" href="https://btl-games.itch.io/fantasy-loot-drop-asset-pack">
                            Loot
                        </a>
                        <a className="text tiny legible" href="https://almardev.itch.io/pixel-rpg-icons-16x16">
                            Artifacts
                        </a>
                        <a
                            className="text tiny legible"
                            href="https://opengameart.org/content/gold-treasure-icons-16x16"
                        >
                            Open Game Art for the Treasures
                        </a>
                        <a className="text tiny legible" href="https://chatgpt.com">
                            OpenAi for the Background Image and some textual content
                        </a>
                    </div>
                </div>
            </Scene>
        );
    },
});
