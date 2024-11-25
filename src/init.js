import Bootstrap from "./bootstrap.js";
import GameScene from "./scenes/GameScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import GameOverScene from "./scenes/GameOverScene.js";

const config = {
    width: 720,
    height: 480,
    parent: "contenedor",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 400
            }
        }
    },
    scene: [
        Bootstrap,
        MainMenuScene,
        GameOverScene,
        GameScene
    ]
}

new Phaser.Game(config);

