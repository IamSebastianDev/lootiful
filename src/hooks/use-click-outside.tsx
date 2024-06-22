import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export type ClickOutsideProps = {
    onClickOutside: (event: Event) => void;
};

export const useClickOutside = <T extends HTMLElement>({
    onClickOutside,
}: ClickOutsideProps): MutableRefObject<T | null> => {
    const ref = useRef<T | null>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside(event);
            }
        },
        [onClickOutside]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return ref;
};
