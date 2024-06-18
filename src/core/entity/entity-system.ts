export class EntitySystem<GlobalState> {
    addEntity() {}
    removeEntity() {}

    update(state: GlobalState) {
        console.log({ state });
    }
}
