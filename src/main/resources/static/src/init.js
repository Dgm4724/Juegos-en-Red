import Bootstrap from "./Bootstrap.js";
import GameScene from "./scenes/GameScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import CreditsScene from "./scenes/CreditsScene.js";
import LevelSelectorScene from "./scenes/LevelSelectorScene.js";
import GameScene2 from "./scenes/GameScene2.js";

const config = {
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'contenedor',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 720,
        height: 480
    },
    parent: "contenedor",
    physics: {
        default: "arcade",
        arcade: {
            // debug: true,
            gravity: {
                y: 400
            }
        }
    },
    scene: [
        Bootstrap,
        MainMenuScene,
        LevelSelectorScene,
        CreditsScene,
        GameOverScene,
        GameScene,
        GameScene2,
    ],
}

const game = new Phaser.Game(config);