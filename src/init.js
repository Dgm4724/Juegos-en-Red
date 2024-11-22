import Bootstrap from "./bootstrap.js";
import GameScene from "./scenes/GameScene.js";

const config = {
    width: 720,
    height: 480,
    parent: "contenedor",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 500
            }
        }
    },
    scene: [
        Bootstrap,
        GameScene
    ]
}

new Phaser.Game(config);

