import React from "react";
import { Store, makeStore } from "../functions/simple-store";
import { Position } from "../functions/position";
import { useEntityCollection } from "../hooks/use-entity-collection";

export type EntityProps = Record<PropertyKey, unknown> & { position: Position };
export type Entity<T extends EntityProps> = {
    id: string;
    update: (entities: ReturnType<typeof useEntityCollection>) => void;
    destroy: (entities: ReturnType<typeof useEntityCollection>) => void;
    render: () => React.ReactElement;
    props: Store<T>;
};

export type EntityInit<T extends EntityProps> = {
    onInit: (id: string, props: Store<T>) => void;
    onRender: (id: string, props: Store<T>) => JSX.Element;
    onUpdate?: (id: string, props: Store<T>, entities: ReturnType<typeof useEntityCollection>) => void;
    onDestroy?: (id: string, props: Store<T>, entities: ReturnType<typeof useEntityCollection>) => void;
};

export const createEntity = <Props extends EntityProps>(ctor: EntityInit<Props>) => {
    const { onUpdate, onDestroy, onRender, onInit } = ctor;
    const id = crypto.randomUUID();
    let props = makeStore<Props>();

    onInit(id, props);

    const render = () => onRender(id, props);
    const update = (entities: ReturnType<typeof useEntityCollection>) => onUpdate?.(id, props, entities);
    const destroy = (entities: ReturnType<typeof useEntityCollection>) => onDestroy?.(id, props, entities);

    return {
        id,
        props,
        update,
        destroy,
        render,
    };
};
