import { AUTO, Game } from 'phaser';
import {ForestScene} from "./scenes/ForestScene/ForestScene.ts";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    parent: 'game-container',
    backgroundColor: '#028af8',
    // eh
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: [
        ForestScene,
    ]
};

const StartGame = (parent: string) => {
    const parentElement = document.getElementById(parent);
    if (!parentElement) {
        throw new Error("Parent element not found");
    }

    // Set dimensions based on the parent element
    config.width = parentElement.offsetWidth;
    config.height = parentElement.offsetHeight;
    return new Game({ ...config, parent });

}

export default StartGame;
