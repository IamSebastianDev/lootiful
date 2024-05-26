import { useState } from "react";

export const useCoins = () => {
    const [coins, setCoins] = useState(0);

    const addCoins = (amount: number) => setCoins((c) => c + amount);
    const spendCoins = (amount: number) => setCoins((c) => c - amount);
    const reset = () => setCoins(0);

    return { current: coins, addCoins, spendCoins, reset };
};
