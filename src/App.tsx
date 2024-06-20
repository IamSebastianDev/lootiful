import cowSprite from "./assets/sprites/cow.sprite";
import toolsSprite from "./assets/sprites/tools.sprite";
import { Loader } from "./core/loader/loader";
import { useSpriteSheet } from "./core/sprite-sheet";
import waterSprite from "./assets/sprites/water.sprite";
import grassSprite from "./assets/sprites/grass.sprite";
import { SceneManager } from "./core/scene";
import { Menu } from "./scenes/menu.scene";
import { loader } from "./components/loader";
import { Options } from "./scenes/options.scene";
import { TamedStateProvider } from "./hooks/use-tamed";
import { Display } from "./core/display";
import { SettingsProvider } from "./hooks/use-settings";

export const App: React.FC = () => {
    const data = [
        () => useSpriteSheet.preload(toolsSprite),
        () => useSpriteSheet.preload(cowSprite),
        () => useSpriteSheet.preload(waterSprite),
        () => useSpriteSheet.preload(grassSprite),
    ];

    return (
        <Loader data={data} indicator={loader(data.length)}>
            <SettingsProvider>
                <TamedStateProvider>
                    <Display enableFPS={import.meta.env.DEV}>
                        <SceneManager>
                            <Menu id="menu" />
                            <Options id="options" />
                        </SceneManager>
                    </Display>
                </TamedStateProvider>
            </SettingsProvider>
        </Loader>
    );
};
