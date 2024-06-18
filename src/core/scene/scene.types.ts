import { PropsWithChildren, ReactElement } from "react";

export type SceneProps = { id: string };
export type Scene = (props: SceneProps) => ReactElement<PropsWithChildren<SceneProps>>;

export type SceneController = {
    current: string;
    next: (key: string) => void;
    back: () => void;
};
