import React, { PropsWithChildren } from "react";
import { useKeyDown } from "../hooks/use-key-down";
import { router } from "../main";

export const KeyMap: React.FC<PropsWithChildren> = ({ children }) => {
    useKeyDown(["Escape"], () => router.navigate({ to: "/" }));

    return children;
};
