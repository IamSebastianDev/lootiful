import { useState } from "react";
import { getRandomEntry } from "../functions/get-random-entry";
import { names } from "../data/names";
import { Attribute, attributeNames, useAttributes } from "./use-attributes";
import { getMaxHealth } from "../functions/get-max-health";
import { getMaxStamina } from "../functions/get-max-stamina";
import { Position, position } from "../functions/position";

export const initialAttributeValues = () => {
    return Object.fromEntries(attributeNames.map((name) => [name, 1])) as Record<Attribute, number>;
};

export const useHero = () => {
    const [name, setName] = useState<string>(getRandomEntry(names));
    const [attributes, bumpAttributeByType, setAttributeValues] = useAttributes(initialAttributeValues());
    const [takenDamage, setTakenDamage] = useState(0);
    const [usedStamina, setUsedStamina] = useState(0);
    const [coordinates, setCoordinates] = useState<Position>(position(8, 0));

    // Derived attributes
    const maxHealth = getMaxHealth(attributes.Strength.value, attributes.Constitution.value);
    const maxStamina = getMaxStamina(attributes.Constitution.value, attributes.Dexterity.value);
    const damage = attributes.Strength.value * 2 + attributes.Dexterity.value;
    const stamina = Math.max(maxStamina - usedStamina, 0);
    const health = Math.max(maxHealth - takenDamage, 0);

    const reset = () => {
        setAttributeValues(initialAttributeValues());
        setName(getRandomEntry(names));
        setTakenDamage(0);
        setUsedStamina(0);
        setCoordinates(position(8, 0));
    };

    const setup = () => {
        setTakenDamage(0);
        setUsedStamina(0);
        setCoordinates(position(8, 0));
    };

    const rename = (name: string) => {
        setName(name);
    };

    const hurt = (amount: number = 1) => {
        setTakenDamage((c) => c + amount);
    };
    const heal = (amount: number = 1) => {
        setTakenDamage((c) => c - amount);
    };

    const move = (position: Position) => {
        setUsedStamina((c) => c + 1);
        setCoordinates(position);
    };

    return {
        name,
        rename,
        attributes,
        bumpAttributeByType,
        position: coordinates,
        maxHealth,
        maxStamina,
        damage,
        health,
        stamina,
        hurt,
        heal,
        move,
        reset,
        setup,
    };
};
