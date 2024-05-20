import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/options")({
    component: () => <div>Hello /options!</div>,
});
