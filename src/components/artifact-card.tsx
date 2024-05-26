import React from "react";
import { ArtifactData } from "../hooks/use-artifacts";
import artifactsSprites from "../assets/sprites/artifacts.sprites";
import { useSpriteSheet } from "../hooks/use-sprite-sheet";

export type ArtifactCardProps = {
    artifact: ArtifactData;
};
export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact }) => {
    const sheet = useSpriteSheet(artifactsSprites);

    return (
        <div className="artifact-card stack vertical relaxed center all">
            <img src={sheet.getByKey(artifact.sprite)?.image.src} className="grow" />
            <div className="stack vertical relaxed">
                <span className="text small highlight legible">{artifact.name}</span>
                <p className="text tiny legible">{artifact.lore}</p>
            </div>
        </div>
    );
};
