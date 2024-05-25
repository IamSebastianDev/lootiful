import { useState } from "react";
import { Position } from "../functions/position";

export const useCursor = () => {
    const [position, setPosition] = useState<Position | null>(null);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const [state, setState] = useState<"OK" | "ERROR" | "INFO">("INFO");

    return { position, setPosition, tooltip, setTooltip, state, setState } as const;
};
