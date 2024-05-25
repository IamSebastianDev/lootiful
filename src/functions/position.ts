export const position = (x: number, y: number): Position => {
    const coordinates = [x, y * -1];

    // Add the match function
    Object.defineProperty(coordinates, "match", {
        value: ([x, y]: Position) => {
            return x === coordinates[0] && y === coordinates[1];
        },
    });

    return coordinates as Position;
};

export type Position = [x: number, y: number] & { match: (position: Position) => boolean };
