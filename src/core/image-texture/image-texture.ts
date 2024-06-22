import { Texture } from "three";

export class ImageTexture {
    static Textures = new Map<string, Texture>();
    image = new Image();
    loaded: boolean = false;
    private _texture: Texture | null = null;
    constructor(public src: string) {}

    public load(callback: () => void) {
        const loaded = ImageTexture.Textures.get(this.src);
        if (loaded) {
            this._texture = loaded;
            this._texture.needsUpdate = true;
            return callback();
        }

        this.image.src = this.src;
        this.image.addEventListener("load", () => {
            this._texture = new Texture(this.image);
            ImageTexture.Textures.set(this.src, this._texture);
            this.loaded = true;
            callback();
        });
    }

    get texture() {
        if (this._texture === null) {
            throw new Error("Texture needs to be loaded before accessing");
        }

        return this._texture;
    }
}
