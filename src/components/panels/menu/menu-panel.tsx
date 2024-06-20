/** @format */

import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./menu-panel.scss";
import { Heading } from "../../ui/heading";
import { Button, ButtonProps } from "../../ui/button";
export const MenuPanel = () => {
    const { next } = useScene();

    const buttons: ButtonProps[] = [
        {
            children: "Continue",
            onClick: () => console.log("New Game"),
            disabled: true,
        },
        {
            children: "New Game",
            onClick: () => console.log("New Game"),
        },
        {
            children: "Settings",
            onClick: () => next("options"),
        },
    ];

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack menu-outer">
                    <div className="menu-backdrop" />
                    <div className="menu-panel">
                        <Heading size="lg">Lootiful</Heading>
                        <div className="ui-divider" />
                        {buttons.map(({ children, ...props }, idx) => (
                            <Button bordered={true} details={true} key={idx} {...props} size={"md"}>
                                {children}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Html>
    );
};
