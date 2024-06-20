import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type Settings = {
    volume: number;
    setVolume: (volume: number) => void;
    isFullscreen: boolean;
    setIsFullscreen: (v: boolean) => void;
};

export const SettingsContext = createContext<Settings | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const [volume, setVolume] = useState(0.5);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (isFullscreen) {
            document.documentElement.requestFullscreen();
        }

        if (!isFullscreen) {
            document.exitFullscreen();
        }

        return () => {
            document.exitFullscreen();
        };
    }, [isFullscreen]);

    const settings: Settings = {
        volume,
        setVolume,
        isFullscreen,
        setIsFullscreen,
    };

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);

    if (!ctx) {
        throw new Error(`Outside settings context`);
    }

    return ctx;
};
