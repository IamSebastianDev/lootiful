/** @format */
import click from "../assets/audio/fx/click.ogg";
import pixelAdventure from "../assets/audio/songs/pixel-adventure.mp3";
import sold from "../assets/audio/fx/sold.wav";
import walk from "../assets/audio/fx/walk.wav";
import shadowsLament from "../assets/audio/songs/shadows-lament.mp3";
import echoesOfTheAbyss from "../assets/audio/songs/echoes-of-the-abyss.mp3";
import attack from "../assets/audio/fx/attack.mp3";
import { useEffect } from "react";
import pickup from "../assets/audio/fx/pickup.mp3";
import { useSettings } from "./use-settings";

export const sfx = {
    menu_click: new Audio(click),
    menu_song: new Audio(pixelAdventure),
    shadows_lament: new Audio(shadowsLament),
    sold: new Audio(sold),
    walk: new Audio(walk),
    attack: new Audio(attack),
    echoes_of_the_abyss: new Audio(echoesOfTheAbyss),
    pickup: new Audio(pickup),
};

export const useSFX = (key: keyof typeof sfx, settings: ReturnType<typeof useSettings>, loop: boolean = false) => {
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
