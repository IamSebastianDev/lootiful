export const position = (x: number, y: number): Position => {
    const coordinates = [x, y * -1];

    // Add the match function
    const match = ([x, y]: Position) => {
        return x === coordinates[0] && y === coordinates[1];
    };
    Object.defineProperty(coordinates, "match", { value: match });

    const distance = ([x, y]: Position) => {
        const dx = x - coordinates[0];
        const dy = y - coordinates[1];
        return Math.sqrt(dx * dx + dy * dy);
    };
    Object.defineProperty(coordinates, "distance", { value: distance });

    const closest = (positions: Position[]) => {
        let current = positions[0];
        positions.forEach((position) => {
            if (distance(position) < distance(current)) {
                current = position;
            }
        });
        return current;
    };
    Object.defineProperty(coordinates, "closest", {
        value: closest,
    });

    return coordinates as Position;
};

export type Position = [x: number, y: number] & {
    match: (position: Position) => boolean;
    distance: (position: Position) => number;
    closest: (positions: Position[]) => Position;
};
