import { useState } from "react";

export const useSettings = () => {
    const [difficulty, setDifficulty] = useState<number>(1);

    const changeDifficulty = (value: number) => {
        setDifficulty(value);
    };

    return { difficulty, changeDifficulty };
};
