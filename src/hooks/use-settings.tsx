import { PropsWithChildren, createContext, useContext, useState } from "react";

export type Settings = {
    volume: number;
    setVolume: (volume: number) => void;
};

export const SettingsContext = createContext<Settings | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const [volume, setVolume] = useState(0.5);

    const settings: Settings = {
        volume,
        setVolume,
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
