import { nameModifiers } from "../data/name-modifiers";
import { names } from "../data/names";
import { getRandomEntry } from "./get-random-entry";

export const getRandomName = () => {
    return `${getRandomEntry(names)}, ${getRandomEntry(nameModifiers)}`;
};
