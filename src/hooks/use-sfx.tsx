/** @format */
import click from "../assets/audio/fx/click.ogg";
import pixelAdventure from "../assets/audio/songs/pixel-adventure.mp3";
import sold from "../assets/audio/fx/sold.wav";
import walk from "../assets/audio/fx/walk.wav";
import shadowsLament from "../assets/audio/songs/shadows-lament.mp3";
import { useGame } from "./use-game";
import { useEffect } from "react";

export const sfx = {
    menu_click: new Audio(click),
    menu_song: new Audio(pixelAdventure),
    game_song: new Audio(shadowsLament),
    sold: new Audio(sold),
    walk: new Audio(walk),
};

export const useSFX = (key: keyof typeof sfx, loop: boolean = false) => {
    const { settings } = useGame();
    const file = sfx[key];
    file.loop = loop;

    useEffect(() => {
        file.muted = settings.mute;
    }, [settings.mute]);

    const start = () => {
        file.play();
    };
    const trigger = () => {
        file.play();
    };

    const stop = () => {
        file.pause();
        file.load();
    };

    const pause = () => {
        file.pause();
    };

    return { trigger, start, stop, pause };
};
