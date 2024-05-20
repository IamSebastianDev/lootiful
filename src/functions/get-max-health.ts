export const getMaxHealth = (strength: number, constitution: number) => {
    return Math.floor((strength + constitution * 2) * Math.E + (strength + constitution / 2));
};
