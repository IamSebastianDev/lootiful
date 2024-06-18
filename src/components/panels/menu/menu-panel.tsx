import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./menu-panel.scss";
export const MenuPanel = () => {
    const { next } = useScene();

    const buttons = [
        {
            label: "New Game",
            onClick: () => console.log("New Game"),
        },
        {
            label: "Continue",
            onClick: () => console.log("New Game"),
        },
        {
            label: "Options",
            onClick: () => next("options"),
        },
    ];

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack menu-outer">
                    <div className="menu-backdrop" />
                    <div className="menu-panel">
                        <h3 className="ui-heading">Lootiful</h3>
                        <div className="ui-divider"></div>
                        {buttons.map(({ label, onClick }) => (
                            <button className="ui-button" key={label} onClick={onClick}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Html>
    );
};
