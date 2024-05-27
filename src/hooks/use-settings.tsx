import { useState } from "react";

export const useSettings = () => {
    const [difficulty, setDifficulty] = useState<number>(1);
    const [brightness, setBrightness] = useState<number>(0.5);
    const [mute, setMute] = useState(false);

    const changeDifficulty = (value: number) => {
        setDifficulty(value);
    };

    const changeBrightness = (value: number) => {
        setBrightness(value);
    };

    return { difficulty, changeDifficulty, brightness, changeBrightness, mute, setMute };
};
