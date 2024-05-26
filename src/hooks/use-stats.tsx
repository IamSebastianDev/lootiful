import { useReducer } from "react";

export type Stats = {
    coins: number;
    rounds: number;
};

type Action =
    | { type: "incrementCoins"; payload: number }
    | { type: "incrementRounds"; payload: number }
    | { type: "reset"; payload?: undefined };

const reducer = (state: Stats, action: Action): Stats => {
    switch (action.type) {
        case "incrementCoins":
            return { ...state, coins: state.coins + action.payload };
        case "incrementRounds":
            return { ...state, rounds: state.rounds + action.payload };
        case "reset":
            return { rounds: 0, coins: 0 };
        default:
            throw new Error("Unknown action type");
    }
};

export const useStats = () => {
    const [state, dispatch] = useReducer(reducer, { coins: 0, rounds: 0 });

    const trackCoins = (amount: number) => dispatch({ type: "incrementCoins", payload: amount });
    const trackRound = () => dispatch({ type: "incrementRounds", payload: 1 });
    const reset = () => dispatch({ type: "reset" });

    return { state, trackCoins, trackRound, reset };
};
