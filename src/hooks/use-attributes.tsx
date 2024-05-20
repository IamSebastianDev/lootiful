import { useState } from "react";

const attributeNames = ["Strength", "Constitution", "Dexterity", "Intelligence", "Charisma"] as const;
const attributeShort = ["Str", "Con", "Dex", "Int", "Cha"] as const;
export type Attribute = (typeof attributeNames)[number];

const initialAttributeValues = () => {
    return Object.fromEntries(attributeNames.map((name) => [name, 8])) as Record<Attribute, number>;
};
export const useAttributes = () => {
    const [attributeValues, setAttributeValues] = useState<Record<Attribute, number>>(initialAttributeValues());

    const setAttributeByType = (attribute: Attribute) => {
        setAttributeValues((values) => ({ ...values, [attribute]: values[attribute] + 1 }));
    };

    const derivedValues = Object.fromEntries(
        Object.entries(attributeValues).map(([name, value]: [string, number]) => {
            const attrDesc = { value, name, short: attributeShort[attributeNames.indexOf(name as Attribute)] };
            return [name, attrDesc];
        })
    ) as {
        [K in keyof typeof attributeValues]: { value: number; name: K; short: string };
    };

    return [derivedValues, setAttributeByType] as const;
};
