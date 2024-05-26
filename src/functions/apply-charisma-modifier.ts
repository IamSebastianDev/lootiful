export const applyCharismaModifier = (value: number, charisma: number) => Math.round(value + (charisma / 20) * value);
