export const getAttributeCost = (level: number) => {
    const base = 1000;
    const factor = 100 ** (1 / 19);

    return Math.floor(base * factor ** level);
};
