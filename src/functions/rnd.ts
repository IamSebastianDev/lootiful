export const rnd = {
    entries: <T>([...arr]: T[], length: number = 1) =>
        Array(length)
            .fill(null)
            .flatMap(() => arr.splice(Math.floor(Math.random() * arr.length), 1)),
    entry: <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)],
    number: (min: number = 0, max: number = 1) => Math.round(Math.random() * (max - min) + min),
};
