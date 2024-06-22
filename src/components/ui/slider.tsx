/** @format */

import { FC, PropsWithChildren } from "react";
import { useClassnames as cls } from "../../hooks/use-classnames";
import "./slider.scss";
import { toPercent } from "../../core/math/to-percent";

export type InputRangeProps = PropsWithChildren & {
    disabled?: boolean;
    value: number;
    min: number;
    max: number;
    step?: number;
    reversed?: boolean;
    readValue?: boolean;
    onChange: (value: number) => void;
};

export const Slider: FC<InputRangeProps> = ({ children, value, min, max, onChange, ...props }) => {
    const { reversed = false, disabled = false, step = 1, readValue = false } = props;
    return (
        <label {...cls("ui-slider", { reversed })}>
            {children && <div>{children}</div>}
            <input
                type="range"
                value={value}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                onChange={(e) => !disabled && onChange(Number(e.target.value))}
            />
            {readValue && <span>{Math.floor(toPercent(value, 1))}%</span>}
        </label>
    );
};
