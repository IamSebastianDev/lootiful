import React from "react";
import { Store, makeStore } from "../functions/simple-store";
import { Position } from "../functions/position";
import { GameState } from "../hooks/use-game";

export type EntityProps = Record<PropertyKey, unknown> & { position: Position };
export type Entity<T extends EntityProps> = {
    id: string;
    update: (state: GameState) => void;
    destroy: (state: GameState) => void;
    render: (state: GameState) => React.ReactElement;
    props: Store<T>;
};

export type EntityInit<T extends EntityProps> = {
    onInit: (id: string, props: Store<T>) => void;
    onRender: (id: string, props: Store<T>, state: GameState) => JSX.Element;
    onUpdate?: (id: string, props: Store<T>, state: GameState) => void;
    onDestroy?: (id: string, props: Store<T>, state: GameState) => void;
};

export const createEntity = <Props extends EntityProps>(ctor: EntityInit<Props>) => {
    const { onUpdate, onDestroy, onRender, onInit } = ctor;
    const id = crypto.randomUUID();
    let props = makeStore<Props>();

    onInit(id, props);

    const render = (state: GameState) => onRender(id, props, state);
    const update = (state: GameState) => onUpdate?.(id, props, state);
    const destroy = (state: GameState) => onDestroy?.(id, props, state);

    return {
        id,
        props,
        update,
        destroy,
        render,
    };
};
