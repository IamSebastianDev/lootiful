import { Link } from "@tanstack/react-router";
import React, { PropsWithChildren, ReactNode } from "react";

export type UiButtonProps = PropsWithChildren & {
    onClick?: () => void;
    href: string;
    icon?: ReactNode | string | null;
    layout?: "left" | "center" | "right";
};

export const UiButton: React.FC<UiButtonProps> = ({ children, onClick, href, icon = null, layout = "center" }) => {
    const handleOnClick = () => {
        if (onClick) onClick();
    };

    return (
        <Link to={href} className="ui-button" href={href} onClick={() => handleOnClick()}>
            {icon}
            <span style={{ textAlign: layout }}>{children}</span>
        </Link>
    );
};
