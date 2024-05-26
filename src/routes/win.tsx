import { Navigate, createFileRoute } from "@tanstack/react-router";
import { Scene } from "../components/scene";
import background from "../assets/images/menu-bg.jpg";
import { useGame } from "../hooks/use-game";
import { artifactTable } from "../hooks/use-artifacts";

export const Route = createFileRoute("/win")({
    component: () => {
        const { artifactStore } = useGame();

        if (artifactStore.collectedArtifacts.length < Object.keys(artifactTable).length) {
            Navigate({ to: "/" });
        }

        return <Scene background={background}></Scene>;
    },
});
