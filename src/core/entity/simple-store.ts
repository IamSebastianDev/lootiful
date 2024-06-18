export class SimpleStore<T extends Record<PropertyKey, unknown>> {
    private store = new Map();

    set<K extends keyof T>(key: K, value: T[K]) {
        this.store.set(key, value);
    }

    get<K extends keyof T>(key: K): T[K] {
        return this.store.get(key);
    }

    has(key: string) {
        return this.store.has(key);
    }

    remove<K extends keyof T>(key: K) {
        return this.store.delete(key);
    }

    [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]> {
        return this.store[Symbol.iterator]();
    }

    get $(): T {
        return Object.fromEntries(this.store.entries());
    }
}
