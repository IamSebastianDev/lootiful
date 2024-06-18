import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Loadable } from "./loader.types";

export type LoaderProps = PropsWithChildren<{
    data: Array<Loadable>;
    indicator: (loaded: number) => ReactNode;
}>;

export const Loader: FC<LoaderProps> = ({ data, indicator, children }) => {
    const [loaded, setLoaded] = useState(0);

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            await Promise.all(data.map((loader) => loader().then(() => !isCancelled && setLoaded((c) => c + 1))));
        })();

        return () => {
            isCancelled = true;
        };
    }, [data]);

    if (loaded < data.length) {
        return indicator(loaded + 1);
    }

    return children;
};
