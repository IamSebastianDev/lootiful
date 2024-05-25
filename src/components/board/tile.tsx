/** @format */

import { MeshProps, ThreeEvent } from "@react-three/fiber";
import { SpriteSheet, useSpriteSheet } from "../../hooks/use-sprite-sheet";
import { useRef } from "react";
import { TileData } from "../../hooks/use-dungeon-map";

export type TileProps<T extends SpriteSheet> = {
    tile: TileData<T>;
    sheet: T;
    onPlayerInteraction?: (tile: TileData<T>, event: ThreeEvent<MouseEvent>) => void;
} & MeshProps;

export const Tile = <T extends SpriteSheet>({ sheet, tile, onPlayerInteraction, ...props }: TileProps<T>) => {
    const spriteRef = useRef<any>();
    const [width, height] = [1, 1];
    const [x, y] = tile.position;
    const spriteSheet = useSpriteSheet(sheet);
    const texture = spriteSheet.getByKey(tile.textureKey);

    const handlePlayerInteract = (event: ThreeEvent<MouseEvent>) => {
        onPlayerInteraction?.({ ...tile, position: [x, y * -1] }, event);
        props.onClick?.(event);
    };

    return (
        <mesh {...props} position={[x, y * -1, 0]} onClick={(event) => handlePlayerInteract(event)}>
            <planeGeometry attach="geometry" args={[width, height]} />
            <meshBasicMaterial ref={spriteRef} transparent attach="material" map={texture} />
        </mesh>
    );
};
