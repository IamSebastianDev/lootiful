import { useReducer } from "react";

export type Stats = {
    coins: number;
    rounds: number;
    skeletonsKilled: number;
    vampiresKilled: number;
    treasuresCollected: number;
    died: number;
};

type Action =
    | { type: "incrementCoins"; payload: number }
    | { type: "incrementRounds"; payload: number }
    | { type: "addKill"; payload: "vampire" | "skeleton" | "player" }
    | { type: "treasureCollected"; payload?: undefined }
    | { type: "reset"; payload?: undefined };

const initialState = { rounds: 0, coins: 0, vampiresKilled: 0, skeletonsKilled: 0, treasuresCollected: 0, died: 0 };

const reducer = (state: Stats, action: Action): Stats => {
    switch (action.type) {
        case "incrementCoins":
            return { ...state, coins: state.coins + action.payload };
        case "incrementRounds":
            return { ...state, rounds: state.rounds + action.payload };
        case "reset":
            return { ...initialState };
        default:
            throw new Error("Unknown action type");
    }
};

export const useStats = () => {
    const [state, dispatch] = useReducer(reducer, { ...initialState });

    const trackCoins = (amount: number) => dispatch({ type: "incrementCoins", payload: amount });
    const trackRound = () => dispatch({ type: "incrementRounds", payload: 1 });
    const trackDeath = () => dispatch({ type: "addKill", payload: "player" });
    const trackKill = (type: "skeleton" | "vampire") => dispatch({ type: "addKill", payload: type });
    const reset = () => dispatch({ type: "reset" });

    return { state, trackCoins, trackRound, trackDeath, trackKill, reset };
};
