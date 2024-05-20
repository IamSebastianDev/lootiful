import { useEffect } from "react";

export const useKeyDown = (keys: string[], handler: (event: KeyboardEvent) => void) => {
    const onKeyDown = (event: KeyboardEvent) => {
        if (keys.some((key) => event.key.toLocaleLowerCase() === key.toLocaleLowerCase())) {
            event.preventDefault();
            handler(event);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);
};
