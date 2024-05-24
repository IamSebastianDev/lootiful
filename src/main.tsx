/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.scss';
import '@fontsource/press-start-2p';

// Router
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { GameStateProvider } from './hooks/use-game';
import { KeyMap } from './components/keymap';
import { PreloadSprites } from './components/board/preload-sprites';
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GameStateProvider>
            <PreloadSprites>
                <KeyMap>
                    <RouterProvider router={router} />
                </KeyMap>
            </PreloadSprites>
        </GameStateProvider>
    </React.StrictMode>
);
