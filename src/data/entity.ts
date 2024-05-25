import React from "react";
import { Position } from "../functions/position";

export type Entity = {
    id: string;
    position: () => Position;
    update: () => void;
    destroy: () => void;
    render: () => React.ReactElement;
};

export type EntityInit = {
    position: Position;
    onRender: (id: string, position: Position) => JSX.Element;
    onUpdate?: (setPosition: (current: Position) => Position) => void;
    onDestroy?: (position: Position) => void;
};

export const createEntity = (ctor: EntityInit) => {
    const { position: initialPosition, onUpdate, onDestroy, onRender } = ctor;
    const id = crypto.randomUUID();
    let currentPosition: Position = initialPosition;

    const getPosition = () => currentPosition;
    const setPosition = (position: Position) => (currentPosition = position);

    const render = () => {
        return onRender(id, getPosition());
    };

    const update = () => {
        onUpdate?.(setPosition);
    };

    const destroy = () => {
        onDestroy?.(getPosition());
    };

    return {
        id,
        update,
        destroy,
        render,
        position: getPosition,
    };
};
