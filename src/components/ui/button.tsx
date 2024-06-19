/** @format */

import { PropsWithChildren } from 'react';
import { useClassnames as cls } from '../../hooks/use-classnames';
import './button.scss';

export type ButtonProps = PropsWithChildren & {
    size?: 'sm' | 'md';
    bordered?: boolean;
    disabled?: boolean;
    details?: boolean;
    onClick: () => void;
};
export const Button = ({ children, ...props }: ButtonProps) => {
    const { size = 'sm', onClick, bordered = false, disabled = false, details = false } = props;

    return (
        <button
            disabled={disabled}
            onClick={() => !disabled && onClick()}
            {...cls('ui-button', size, { bordered, details })}>
            {children}
        </button>
    );
};
