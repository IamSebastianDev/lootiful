/** @format */

import { MeshProps, ThreeEvent } from "@react-three/fiber";
import { SpriteSheet, useSpriteSheet } from "../../hooks/use-sprite-sheet";
import { useRef } from "react";
import { TileData } from "../../hooks/use-dungeon-map";
import { useGame } from "../../hooks/use-game";

export type TileProps<T extends SpriteSheet> = {
    tile: TileData<T>;
    sheet: T;
    onPlayerInteraction?: (tile: TileData<T>, event: ThreeEvent<MouseEvent>) => void;
} & MeshProps;

export const Tile = <T extends SpriteSheet>({ sheet, tile, onPlayerInteraction, ...props }: TileProps<T>) => {
    const { cursor, map, hero } = useGame();
    const spriteSheet = useSpriteSheet(sheet);
    const texture = spriteSheet.getByKey(tile.textureKey);

    const spriteRef = useRef<any>();
    const { position, isMoveTarget } = tile;
    const [x, y] = position;

    const [width, height] = [1, 1];

    const getCursorState = () => {
        if (map.getAdjacentTiles(hero.position).some((tile) => tile.position.match(position))) {
            return "OK";
        }

        if (isMoveTarget) {
            return "INFO";
        }

        return "ERROR";
    };

    const handlePlayerInteract = (event: ThreeEvent<MouseEvent>) => {
        onPlayerInteraction?.({ ...tile, position }, event);
        props.onClick?.(event);
    };

    const handlePointerEnter = () => {
        cursor.setPosition(tile.position);
        cursor.setState(getCursorState());
    };

    return (
        <mesh
            {...props}
            position={[x, y, 0]}
            onClick={(event) => handlePlayerInteract(event)}
            onPointerEnter={() => handlePointerEnter()}
        >
            <planeGeometry attach="geometry" args={[width, height]} />
            <meshStandardMaterial ref={spriteRef} transparent attach="material" map={texture} />
        </mesh>
    );
};
