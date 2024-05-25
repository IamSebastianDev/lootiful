export const makeStore = <T extends Record<PropertyKey, unknown>>() => {
    const store = new Map();
    return {
        get: <K extends keyof T>(key: K): T[K] => store.get(key),
        set: <K extends keyof T>(key: K, value: T[K]) => store.set(key, value),
        has: (key: keyof T) => store.has(key),
    };
};

export type Store<T extends Record<PropertyKey, unknown>> = ReturnType<typeof makeStore<T>>;
