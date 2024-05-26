export const toPercent = (value: number, base: number) => {
    return (value / Math.max(base, 1)) * 100;
};
