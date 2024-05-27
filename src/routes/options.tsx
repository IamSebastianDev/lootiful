import { createFileRoute } from "@tanstack/react-router";
import { useGame } from "../hooks/use-game";
import { Scene } from "../components/scene";
import background from "../assets/images/menu-bg.jpg";
import { UiButton } from "../components/ui-button";

export const Route = createFileRoute("/options")({
    component: () => {
        const { settings, tick } = useGame();

        console.log({ brightness: settings.brightness, difficulty: settings.difficulty });

        return (
            <Scene background={background}>
                <div className="stack vertical relaxed center all full-h full-w">
                    <div className="options-panel stack vertical relaxed">
                        <label className="stack horizontal center loose">
                            <span className="text normal legible grow full-w">Difficulty:</span>
                            <input
                                className="grow ui-input"
                                min="0.5"
                                max="2"
                                step="0.5"
                                type="range"
                                value={settings.difficulty}
                                onChange={(ev) => settings.changeDifficulty(parseFloat(ev.target.value))}
                            />
                        </label>
                        <label className="stack horizontal center loose">
                            <span className="text normal legible grow full-w">Brightness:</span>
                            <input
                                className="ui-input grow"
                                type="range"
                                min="0.5"
                                step="0.1"
                                max="1.5"
                                value={settings.brightness}
                                onChange={(ev) => settings.changeBrightness(parseFloat(ev.target.value))}
                            />
                        </label>
                        <label className="stack horizontal center loose">
                            <span className="text normal legible grow">Mute sound:</span>
                            <input
                                className="ui-input"
                                checked={settings.mute}
                                onChange={(ev) => settings.setMute(ev.target.checked)}
                                type="checkbox"
                            />
                        </label>
                        <UiButton href="/">
                            <span className="text small">Back to menu</span>
                        </UiButton>
                        {tick !== 0 && (
                            <UiButton href="/game">
                                <span className="text small">Back to game</span>
                            </UiButton>
                        )}
                    </div>
                </div>
            </Scene>
        );
    },
});
