/** @format */
import click from '../assets/audio/fx/click.ogg';
import pixelAdventure from '../assets/audio/songs/pixel-adventure.mp3';

export const sfx = {
    menu_click: new Audio(click),
    menu_song: new Audio(pixelAdventure),
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
