import { useAspect, useTexture } from "@react-three/drei";
import { Embers } from "../components/particles/embers/embers";
import { Scene } from "../core/scene";
import options from "../assets/images/options.webp";
import { OptionsPanel } from "../components/panels/options/options-panel";

export const Options: Scene = () => {
    const texture = useTexture(options);
    const size = useAspect(texture.image.width, texture.image.height);

    return (
        <>
            <ambientLight intensity={0.5} />
            <mesh scale={size}>
                <planeGeometry />
                <meshStandardMaterial map={texture} />
            </mesh>
            <Embers />
            <OptionsPanel />
        </>
    );
};
