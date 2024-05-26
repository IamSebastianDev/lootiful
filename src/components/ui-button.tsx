import { Link } from "@tanstack/react-router";
import React, { PropsWithChildren, ReactNode } from "react";
import { classnames } from "../functions/classnames";

export type UiButtonProps = PropsWithChildren & {
    onClick?: () => void;
    href: string;
    icon?: ReactNode | string | null;
    layout?: "left" | "center" | "right";
    disabled?: boolean;
};

export const UiButton: React.FC<UiButtonProps> = ({
    children,
    disabled = false,
    onClick,
    href,
    icon = null,
    layout = "center",
}) => {
    const handleOnClick = () => {
        if (onClick && !disabled) onClick();
    };

    return (
        <Link
            disabled={disabled}
            to={href}
            className={classnames("ui-button", disabled ? "disabled" : "")}
            href={href}
            onClick={() => handleOnClick()}
        >
            {icon}
            <span style={{ textAlign: layout }}>{children}</span>
        </Link>
    );
};
