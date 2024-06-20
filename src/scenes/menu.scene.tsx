import { Scene } from "../core/scene";
import menu from "../assets/images/menu.webp";
import { useAspect, useTexture } from "@react-three/drei";
import { Embers } from "../components/particles/embers/embers";
import { MenuPanel } from "../components/panels/menu/menu-panel";

export const Menu: Scene = () => {
    const texture = useTexture(menu);
    const size = useAspect(texture.image.width, texture.image.height);

    return (
        <>
            <ambientLight intensity={0.5} />

            <mesh scale={size}>
                <planeGeometry />
                <meshStandardMaterial map={texture} />
            </mesh>
            <Embers />
            <MenuPanel />
        </>
    );
};
