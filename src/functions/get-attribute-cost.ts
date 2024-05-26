export const getAttributeCost = (level: number) => {
    const base = 100;
    const factor = 100 ** (1 / 19);

    return Math.floor(base * factor ** level);
};
