/** @format */

import { PropsWithChildren } from 'react';
import { useClassnames } from '../../hooks/use-classnames';
import './heading.scss';

export type HeadingProps = PropsWithChildren & {
    size: 'sm' | 'md' | 'lg';
};
export const Heading = ({ size = 'sm', children }: HeadingProps) => {
    return <div className={useClassnames('ui-heading', size)}>{children}</div>;
};
