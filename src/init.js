import Bootstrap from "./bootstrap.js";
import GameScene from "./scenes/GameScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import CreditsScene from "./scenes/CreditsScene.js";

const ASPECT_RATIO = 3 / 2; // Proporción aspect ratio de imagen original: 720x480 px

Phaser.Scene.prototype.calculateCanvasSize = function() { // para que el tamaño de nuestro juego sea responsivo manteniendo siempre el mismo ASPECT RATIO
    const width = window.innerWidth*0.8; // margen
    const height = window.innerHeight*0.8; // margen

    if (width / height > ASPECT_RATIO) {
        return { width: height * ASPECT_RATIO, height };
    } else {
        return { width, height: width / ASPECT_RATIO };
    }
}

const canvasSize = Phaser.Scene.prototype.calculateCanvasSize();

Phaser.Scene.prototype.adjustScale = function () {
    
    const widthRatio = canvasSize.width / 720; // Relación de ancho
    const heightRatio = canvasSize.height / 480; // Relación de alto

    this.children.list.forEach((child) => {
        // Ajustar escala
        if (child.setScale) {
            const originalScaleX = child.scaleX || 1;
            const originalScaleY = child.scaleY || 1;
            child.setScale(originalScaleX * widthRatio, originalScaleY * heightRatio);
        }

        // Reposicionar elementos
        if (child.x !== undefined && child.y !== undefined) {
            child.x *= widthRatio; // Ajustar posición X
            child.y *= heightRatio; // Ajustar posición Y
        }
    });
};

const config = {
    width: canvasSize.width,
    height: canvasSize.height,
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
        CreditsScene,
        GameOverScene,
        GameScene
    ],
}

const game = new Phaser.Game(config);

