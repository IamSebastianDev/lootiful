export const getMaxStamina = (constitution: number, dexterity: number) => {
    return Math.floor((constitution + dexterity * 2) * Math.PI + (constitution + dexterity / 2));
};
