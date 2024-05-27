import { useState } from "react";

export const useTick = () => {
    const [tick, setTick] = useState<number>(0);

    const requestTick = () => {
        setTick((c) => c + 1);
    };

    const reset = () => {
        setTick(0);
    };

    return { tick, requestTick, reset };
};
