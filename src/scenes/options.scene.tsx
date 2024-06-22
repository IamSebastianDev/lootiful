/** @format */

import { useAspect } from "@react-three/drei";
import { Embers } from "../components/particles/embers/embers";
import { Scene } from "../core/scene";
import options from "../assets/images/options.webp";
import { SettingsPanel } from "../components/panels/settings/settings-panel";
import { useImageTexture } from "../core/image-texture/use-image-texture";

export const Options: Scene = () => {
    const { texture } = useImageTexture(options);
    const size = useAspect(texture.image.width, texture.image.height);

    return (
        <>
            <ambientLight intensity={0.5} />
            <mesh scale={size}>
                <planeGeometry />
                <meshStandardMaterial map={texture} />
            </mesh>
            <Embers />
            <SettingsPanel />
        </>
    );
};
