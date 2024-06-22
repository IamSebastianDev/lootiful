import cowSprite from "./assets/sprites/cow.sprite";
import toolsSprite from "./assets/sprites/tools.sprite";
import { Loader } from "./core/loader/loader";
import { useSpriteSheet } from "./core/sprite-sheet";
import waterSprite from "./assets/sprites/water.sprite";
import grassSprite from "./assets/sprites/grass.sprite";
import { SceneManager } from "./core/scene";
import { Menu } from "./scenes/menu.scene";
import { Options } from "./scenes/options.scene";
import { TamedStateProvider } from "./hooks/use-tamed";
import { Display } from "./core/display";
import { SettingsProvider } from "./hooks/use-settings";
import { LanguageProvider } from "./hooks/use-i18n";
import { Game } from "./scenes/game.scene";
import { loader } from "./components/ui/loader";
import menu from "./assets/images/menu.webp";
import settings from "./assets/images/options.webp";
import { useImageTexture } from "./core/image-texture/use-image-texture";

export const App: React.FC = () => {
    const data = [
        () => useSpriteSheet.preload(toolsSprite),
        () => useSpriteSheet.preload(cowSprite),
        () => useSpriteSheet.preload(waterSprite),
        () => useSpriteSheet.preload(grassSprite),
        () => useImageTexture.preload(menu),
        () => useImageTexture.preload(settings),
        () => useImageTexture.preload(menu),
        () => useImageTexture.preload(settings),
    ];

    return (
        <Display enableFPS={import.meta.env.DEV}>
            <Loader data={data} indicator={loader(data.length)}>
                <LanguageProvider>
                    <SettingsProvider>
                        <TamedStateProvider>
                            <SceneManager>
                                <Menu id="menu" />
                                <Options id="options" />
                                <Game id="game" />
                            </SceneManager>
                        </TamedStateProvider>
                    </SettingsProvider>
                </LanguageProvider>
            </Loader>
        </Display>
    );
};

useImageTexture.preload(menu);
useImageTexture.preload(settings);
