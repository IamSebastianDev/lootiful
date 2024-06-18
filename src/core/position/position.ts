export class Position {
    constructor(public x: number, public y: number, public z: number) {}

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
