import { FC, PropsWithChildren, createContext, useContext } from "react";
import { useClock } from "../core/clock";
import { EntitySystem } from "../core/entity/entity-system";

export type State = {
    clock: ReturnType<typeof useClock>;
};

const ecs = new EntitySystem<State>();
const EntityContext = createContext<EntitySystem<State> | undefined>(undefined);
const TamedContext = createContext<State | undefined>(undefined);

export const TamedStateProvider: FC<PropsWithChildren> = ({ children }) => {
    const clock = useClock(0.25);

    const state: State = {
        clock,
    };

    // ecs.update(state);

    return (
        <TamedContext.Provider value={state}>
            <EntityContext.Provider value={ecs}>{children}</EntityContext.Provider>
        </TamedContext.Provider>
    );
};

export const useSystem = () => {
    const ctx = useContext(EntityContext);

    if (!ctx) {
        throw new Error(`Entity Context is not defined.`);
    }

    return ctx;
};

export const useTamed = () => {
    const ctx = useContext(TamedContext);

    if (!ctx) {
        throw new Error(`Game State is not defined.`);
    }

    return ctx;
};
