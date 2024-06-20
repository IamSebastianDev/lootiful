/** @format */

import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./settings-panel.scss";
import { Heading } from "../../ui/heading";
import { Slider } from "../../ui/slider";
import { useState } from "react";
export const SettingsPanel = () => {
    const { next } = useScene();
    const [value, setValue] = useState(0);

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack options-outer">
                    <div className="options-backdrop" />
                    <div className="options-panel">
                        <Heading size="md">Settings</Heading>
                        <div className="ui-divider"></div>
                        <button className="ui-button" onClick={() => next("menu")}>
                            Back
                        </button>
                        <Slider
                            onChange={(event) => {
                                setValue(event);
                                console.log({ event });
                            }}
                            max={10}
                            min={5}
                            step={0.1}
                            value={value}
                        >
                            Volume
                        </Slider>
                    </div>
                </div>
            </div>
        </Html>
    );
};
