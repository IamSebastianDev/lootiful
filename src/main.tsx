import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.scss";
import "@fontsource/press-start-2p";

// Router
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { GameStateProvider } from "./hooks/use-game";
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GameStateProvider>
            <RouterProvider router={router} />
        </GameStateProvider>
    </React.StrictMode>
);
