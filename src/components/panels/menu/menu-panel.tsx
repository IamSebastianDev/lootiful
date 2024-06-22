/** @format */

import { Html } from "@react-three/drei";
import { useScene } from "../../../core/scene";
import "./menu-panel.scss";
import { Heading } from "../../ui/heading";
import { Button, ButtonProps } from "../../ui/button";
import { use18n } from "../../../hooks/use-i18n";
export const MenuPanel = () => {
    const { next } = useScene();
    const { translate: t } = use18n();

    const buttons: ButtonProps[] = [
        {
            children: t("menu.main.continue.label"),
            onClick: () => next("game"),
            disabled: true,
        },
        {
            children: t("menu.main.new.label"),
            onClick: () => {
                next("game");
            },
        },
        {
            children: t("menu.main.settings.label"),
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
