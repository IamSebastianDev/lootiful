/** @format */

import { useState, PropsWithChildren } from "react";
import { useClassnames as cls } from "../../hooks/use-classnames";
import "./dropdown.scss";
import { useClickOutside } from "../../hooks/use-click-outside";

export type DropDownOption<Values> = {
    value: Values;
    label: string;
    disabled?: boolean;
};
export type DropDownProps<Value> = PropsWithChildren & {
    options: DropDownOption<Value>[];
    onChange: (value: Value) => void;
    value: Value;
    size?: "sm" | "md";
    placeholder?: string;
    onOpen?: () => void;
    reversed?: boolean;
};

export const Dropdown = <Value,>({ options, children, onChange, value, ...props }: DropDownProps<Value>) => {
    const { placeholder, size = "sm", onOpen, reversed = false } = props;
    const selected = options.find(({ value: v }) => v === value) ?? null;
    const [open, setOpen] = useState(false);

    const handleOpenClick = () => {
        setOpen((open) => !open);
        onOpen && onOpen();
    };

    const ref = useClickOutside<HTMLDivElement>({
        onClickOutside: () => setOpen(false),
    });

    return (
        <div {...cls("ui-dropdown", size, { reversed })}>
            {children && <div>{children}</div>}
            <div ref={ref} {...cls("ui-dropdown-selector", size)}>
                <button onClick={() => handleOpenClick()} className="ui-dropdown-value">
                    {selected?.label ?? placeholder ?? null}
                </button>
                {open && (
                    <div className="ui-dropdown-panel">
                        {options.map(({ label, value, disabled }) => (
                            <button
                                {...cls({ selected: value === selected?.value })}
                                disabled={disabled}
                                key={label}
                                onClick={() => {
                                    onChange(value);
                                    setOpen(false);
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
