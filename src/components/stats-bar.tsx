import React, { PropsWithChildren } from "react";
import { classnames } from "../functions/classnames";

export type StatsBarProps = PropsWithChildren & {
    type: "health" | "stamina";
    maximum: number;
    current: number;
};
export const StatsBar: React.FC<StatsBarProps> = ({ children, maximum, current, type }) => {
    return (
        <div className={classnames(type, "stats-bar stack horizontal center")}>
            <div className="text tiny">{children}</div>
            <progress max={maximum} value={current}></progress>
            <span className="stats-popover">
                {current} / {maximum}
            </span>
        </div>
    );
};
