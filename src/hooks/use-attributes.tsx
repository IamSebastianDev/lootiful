import { useState } from "react";

export const attributeNames = ["Strength", "Constitution", "Dexterity", "Charisma"] as const;
const attributeShort = ["Str", "Con", "Dex", "Cha"] as const;
export type Attribute = (typeof attributeNames)[number];

export const useAttributes = (initialAttributeValues: Record<Attribute, number>) => {
    const [attributeValues, setAttributeValues] = useState<Record<Attribute, number>>(initialAttributeValues);

    const bumpAttributeByType = (attribute: Attribute) => {
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

    return [derivedValues, bumpAttributeByType, setAttributeValues] as const;
};
