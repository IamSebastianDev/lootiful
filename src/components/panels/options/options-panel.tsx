import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./options-panel.scss";
export const OptionsPanel = () => {
    const { next } = useScene();

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack options-outer">
                    <div className="options-backdrop" />
                    <div className="options-panel">
                        <h3 className="ui-heading">Options</h3>
                        <div className="ui-divider"></div>
                        <button className="ui-button" onClick={() => next("menu")}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </Html>
    );
};
