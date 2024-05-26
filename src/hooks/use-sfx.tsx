/** @format */
import click from "../assets/audio/fx/click.ogg";
import pixelAdventure from "../assets/audio/songs/pixel-adventure.mp3";
import sold from "../assets/audio/fx/sold.wav";
import walk from "../assets/audio/fx/walk.wav";

export const sfx = {
    menu_click: new Audio(click),
    menu_song: new Audio(pixelAdventure),
    sold: new Audio(sold),
    walk: new Audio(walk),
};

export const useSFX = (key: keyof typeof sfx) => {
    const file = sfx[key];

    const start = () => {
        file.play();
    };
    const trigger = () => {
        file.play();
    };
    const stop = () => {};

    return { trigger, start };
};
