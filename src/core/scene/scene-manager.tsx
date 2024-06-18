import { ReactElement, createContext, useContext, useRef, useState } from "react";
import { SceneController, SceneProps } from "./scene.types";

export type SceneManagerProps = {
    children: ReactElement<SceneProps>[] | ReactElement<SceneProps>;
};

const SceneContext = createContext<SceneController | null>(null);

export const SceneManager = ({ children }: SceneManagerProps) => {
    const nodes = [children].flat();
    const last = useRef<string>(nodes[0].props.id);
    const [current, setCurrent] = useState<string>(nodes[0].props.id);

    const next = (key: string) => {
        last.current = current;
        setCurrent(key);
    };

    const back = () => next(last.current);

    const controller = { current, next, back };

    const currentScene = [children].flat().find(({ props }) => props.id === current);

    if (!currentScene) {
        throw new Error(`No scene with key ${current} available`);
    }

    return <SceneContext.Provider value={controller}>{currentScene}</SceneContext.Provider>;
};

export const useScene = () => {
    const controller = useContext(SceneContext);
    if (!controller) {
        throw new Error(`No scene controller available`);
    }

    return controller;
};
