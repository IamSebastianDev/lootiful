import { useReducer } from "react";

export type Stats = {
    coins: number;
    rounds: number;
    skeletonsKilled: number;
    vampiresKilled: number;
    treasuresCollected: number;
    lootCollected: number;
};

type Action =
    | { type: "incrementCoins"; payload: number }
    | { type: "incrementRounds"; payload: number }
    | { type: "addKill"; payload: "vampire" | "skeleton" }
    | { type: "treasureCollected"; payload: undefined }
    | { type: "reset"; payload: undefined }
    | { type: "lootCollected"; payload: undefined };

const initialState = {
    rounds: 0,
    coins: 0,
    vampiresKilled: 0,
    skeletonsKilled: 0,
    treasuresCollected: 0,
    lootCollected: 0,
};

const reducer = (state: Stats, action: Action): Stats => {
    switch (action.type) {
        case "incrementCoins":
            return { ...state, coins: state.coins + action.payload };
        case "incrementRounds":
            return { ...state, rounds: state.rounds + action.payload };
        case "treasureCollected":
            return { ...state, treasuresCollected: state.treasuresCollected + 1 };
        case "lootCollected":
            return { ...state, lootCollected: state.lootCollected + 1 };
        case "addKill":
            return {
                ...state,
                ...(action.payload === "skeleton"
                    ? { skeletonsKilled: state.skeletonsKilled + 1 }
                    : { vampiresKilled: state.vampiresKilled + 1 }),
            };
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
    const trackKill = (type: "skeleton" | "vampire") => dispatch({ type: "addKill", payload: type });
    const trackTreasure = () => dispatch({ type: "treasureCollected", payload: undefined });
    const trackLoot = () => dispatch({ type: "lootCollected", payload: undefined });
    const reset = () => dispatch({ type: "reset", payload: undefined });

    return { state, trackCoins, trackRound, trackKill, trackTreasure, trackLoot, reset };
};
