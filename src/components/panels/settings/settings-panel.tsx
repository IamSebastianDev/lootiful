/** @format */

import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./settings-panel.scss";
import { Heading } from "../../ui/heading";
import { Slider } from "../../ui/slider";

import { Button } from "../../ui/button";
import { useSettings } from "../../../hooks/use-settings";
import { use18n } from "../../../hooks/use-i18n";
export const SettingsPanel = () => {
    const { translate: t } = use18n();
    const { next } = useScene();
    const { setVolume, volume, isFullscreen, setIsFullscreen } = useSettings();

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack options-outer">
                    <div className="options-backdrop" />
                    <div className="options-panel">
                        <div className="row center">
                            <div className="options-back">
                                <Button onClick={() => next("menu")}>{"❮"}</Button>
                            </div>
                            <Heading size="md">{t("menu.settings.heading")}</Heading>
                        </div>
                        <div className="ui-divider"></div>
                        {/* Volume */}
                        <Slider
                            readValue={true}
                            onChange={(event) => setVolume(event)}
                            max={1}
                            min={0}
                            step={0.01}
                            value={volume}
                        >
                            <Heading size="xs">{t("menu.settings.volume.label")}:</Heading>
                        </Slider>
                        {/* Fullscreen */}
                        <label htmlFor="fullscreen" className="row center">
                            {t("menu.settings.fullscreen.label")}:
                            <input
                                id="fullscreen"
                                type="checkbox"
                                checked={isFullscreen}
                                onChange={(event) => setIsFullscreen(event.target.checked)}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </Html>
    );
};
