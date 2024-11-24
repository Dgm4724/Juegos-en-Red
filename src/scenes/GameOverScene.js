class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: "GameOverScene" });
    }
  
    init(data) {
      // Pasar la puntuación recibida desde GameScene
      this.puntuacion = data.puntuacion || 0;  // Si no se pasa puntuación, asigna 0
    }
  
    create() {
      // Fondo
      this.add.image(360, 240, "fondo1");
  
      // Texto de Fin del Juego
      this.add.text(360, 120, "¡Fin del Juego!", {
        fontSize: "50px",
        color: "#ffffff",
      }).setOrigin(0.5);
  
      // Texto con la puntuación obtenida
      this.add.text(360, 200, `Puntuación final: ${this.puntuacion}`, {
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
