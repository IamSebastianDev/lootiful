/** @format */

import { FC, PropsWithChildren } from "react";
import { useClassnames as cls } from "../../hooks/use-classnames";
import "./checkbox.scss";

export type CheckboxProps = PropsWithChildren & {
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
    reversed?: boolean;
    size?: "sm" | "md";
};

export const Checkbox: FC<CheckboxProps> = ({ checked, children, onChange, ...props }) => {
    const { reversed = false, disabled = false, size = "sm" } = props;
    return (
        <label {...cls("ui-checkbox", { reversed })}>
            {children && <div>{children}</div>}
            <div {...cls("ui-checkbox-input", { disabled, checked }, size)}>
                <div className="check-mark">&#10004;</div>
            </div>
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => !disabled && onChange(e.target.checked)}
            />
        </label>
    );
};
