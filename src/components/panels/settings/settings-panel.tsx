/** @format */

import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./settings-panel.scss";
import { Heading } from "../../ui/heading";
import { Slider } from "../../ui/slider";

import { Button } from "../../ui/button";
import { useSettings } from "../../../hooks/use-settings";
import { use18n } from "../../../hooks/use-i18n";

import { Checkbox } from "../../ui/checkbox";
import { DropDownOption, Dropdown } from "../../ui/dropdown";
import { ISO639Code } from "@vayjs/vay";
export const SettingsPanel = () => {
    const { translate: t, language, setLanguage } = use18n();
    const { next } = useScene();
    const { setVolume, volume, isFullscreen, setIsFullscreen } = useSettings();

    const options: DropDownOption<ISO639Code>[] = [
        {
            value: "en",
            label: t("menu.settings.language.options.en"),
        },
        {
            value: "de",
            label: t("menu.settings.language.options.de"),
        },
    ];

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
                        <Checkbox checked={isFullscreen} onChange={(checked) => setIsFullscreen(checked)}>
                            <Heading size="xs">{t("menu.settings.fullscreen.label")}:</Heading>
                        </Checkbox>
                        {/* Language */}
                        <Dropdown value={language} options={options} onChange={(value) => setLanguage(value)}>
                            <Heading size="xs">{t("menu.settings.language.label")}:</Heading>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Html>
    );
};
