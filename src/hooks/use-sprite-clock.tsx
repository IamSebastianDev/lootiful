/** @format */

import { useEffect, useRef, useState } from 'react';

export const useSpriteClock = (interval: number) => {
    const [frame, setFrame] = useState<number>(0);
    const itv = useRef<number>();

    useEffect(() => {
        itv.current = setInterval(() => {
            setFrame((c) => c + 1);
        }, 1000 * interval);

        return () => clearInterval(itv.current);
    }, [interval, frame]);

    return frame;
};
