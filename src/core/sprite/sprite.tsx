import { MeshProps } from "@react-three/fiber";
import { SpriteSheet, useSpriteSheet } from "../sprite-sheet";
import { SpriteMap } from "../sprite-sheet/use-sprite-sheet.types";

export type SpriteProps<T extends SpriteMap> = MeshProps & {
    sheet: SpriteSheet<T>;
    sprite: keyof T;
};
export const Sprite = <T extends SpriteMap>({ sheet, sprite, ...props }: SpriteProps<T>) => {
    const texture = useSpriteSheet(sheet).getByKey(sprite);

    return (
        <mesh {...props}>
            <planeGeometry />
            <meshStandardMaterial transparent map={texture} />
        </mesh>
    );
};
