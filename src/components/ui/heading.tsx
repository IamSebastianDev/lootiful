/** @format */

import { PropsWithChildren } from 'react';
import { useClassnames as cls } from '../../hooks/use-classnames';
import './heading.scss';

export type HeadingProps = PropsWithChildren & {
    size: 'sm' | 'md' | 'lg';
};
export const Heading = ({ size = 'sm', children }: HeadingProps) => {
    return <div {...cls('ui-heading', size)}>{children}</div>;
};
