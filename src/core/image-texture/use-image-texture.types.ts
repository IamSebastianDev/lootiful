import { ImageTexture } from "./image-texture";

export type UseImageTexture = {
    (src: string, onLoad?: () => void): ImageTexture;
    preload: (src: string) => Promise<void>;
};
