class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" });
    }

    init(data) {
        // Pasar datos como puntuación o estado final si es necesario
        this.winner = data.winner || "Nadie"; // Ejemplo: ganador del juego
    }

    preload() {
        // Cargar cualquier recurso para esta escena
        this.load.image("gameOverBackground", "./assets/images/gameOverBackground.png");
        this.load.image("menuButton", "./assets/images/menuButton.png");
        this.load.image("restartButton", "./assets/images/restartButton.png");
    }

    create() {
        // Fondo
        this.add.image(360, 240, "gameOverBackground");

        // Texto de Fin del Juego
        this.add.text(360, 120, "¡Fin del Juego!", {
            fontSize: "50px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Texto con el ganador o el estado final
        this.add.text(360, 200, `${this.winner} ha ganado!`, {
            fontSize: "30px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Botón para volver al menú principal
        const menuButton = this.add.image(360, 300, "menuButton").setInteractive();
        menuButton.on("pointerdown", () => {
            this.scene.start("MainMenu"); // Volver al menú principal
        });

        // Botón para reiniciar la partida
        const restartButton = this.add.image(360, 380, "restartButton").setInteractive();
        restartButton.on("pointerdown", () => {
            this.scene.start("GameScene"); // Reiniciar el juego
        });
    }
}

export default GameOverScene;
