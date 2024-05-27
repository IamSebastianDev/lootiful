import { Navigate, createFileRoute } from "@tanstack/react-router";
import { Scene } from "../components/scene";
import background from "../assets/images/menu-bg.jpg";
import { useGame } from "../hooks/use-game";
import { artifactTable } from "../hooks/use-artifacts";
import { UiButton } from "../components/ui-button";

export const Route = createFileRoute("/game-over")({
    component: () => {
        const { artifactStore, stats, hero } = useGame();

        if (!hero.dead && artifactStore.collectedArtifacts.length < Object.keys(artifactTable).length) {
            Navigate({ to: "/game" });
        }

        const score = Math.floor(
            (stats.state.rounds / Math.max(artifactStore.collectedArtifacts.length, 1)) *
                (stats.state.coins +
                    stats.state.skeletonsKilled +
                    stats.state.vampiresKilled +
                    stats.state.treasuresCollected * 4)
        );

        return (
            <Scene background={background}>
                <div className="stack vertical relaxed center all full-h full-w">
                    <div className="stats-panel stack vertical tight">
                        <div className="text highlight large legible center">
                            {hero.dead ? "You died!" : "You won!"}
                        </div>
                        <div className="text tiny legible">During your adventure, you made the following progress:</div>
                        <div className="text tiny legible">
                            You collected {artifactStore.collectedArtifacts.length} Artifacts!
                        </div>
                        <div className="text tiny legible">You collected and earned {stats.state.coins} Coins!</div>
                        <div className="text tiny legible">You dove {stats.state.rounds} times into the dungeon!</div>
                        <div className="text tiny legible">You found {stats.state.treasuresCollected} treasures!</div>
                        <div className="text tiny legible">
                            You killed {stats.state.skeletonsKilled} Skeletons and {stats.state.vampiresKilled}{" "}
                            Vampires!
                        </div>
                        <div className="text tiny legible highlight">Your overall score is {score}!</div>
                        <UiButton href="/">
                            <span className="text small">Back to menu</span>
                        </UiButton>
                    </div>
                </div>
            </Scene>
        );
    },
});
