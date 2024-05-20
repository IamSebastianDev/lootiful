import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => (
        <div id="game">
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </div>
    ),
});
