class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: "GameOverScene" });
    }
  
    init(data) {
      // Puntuacion recibida desde GameScene
      this.puntuacion = data.puntuacion || 0;  // Si no se pasa puntuación, asigna 0
    }
  
    create() {
      // Fondo
      this.add.image(360, 240, "fondoGenerico");
  
      // Texto Game Over
      this.add.text(360, 120, "¡Fin del Juego!", {
        fontSize: "50px",
        fontFamily: "Freckle Face",
        color: "#fad461",
      }).setOrigin(0.5);
  
      // Puntuacion
      this.add.text(360, 200, `Puntuación final: ${this.puntuacion}`, {
        fontSize: "30px",
        fontFamily: "Freckle Face",
        color: "#dba43d",
      }).setOrigin(0.5);
  
      // Botón para volver al menu principal
      const botonMenu = this.add.image(360, 300, "boton").setInteractive();
      botonMenu.on("pointerdown", () => {
        this.scene.start("MainMenuScene");
      });
      botonMenu.setDisplaySize(250, botonMenu.height);

      this.add.text(360, 300, "Menú Principal", {
        fontSize: "24px",
        fontFamily: "Barrio",
        fontStyle: "Bold",
        color: "black",
        align: 'center'
      }).setOrigin(0.5);
  
      // Botón para reiniciar la partida
      const botonReinicio = this.add.image(360, 380, "boton").setInteractive();
      botonReinicio.on("pointerdown", () => {
        this.scene.start("GameScene");
      });
      botonReinicio.setDisplaySize(250, botonReinicio.height);

      this.add.text(360, 380, "Reiniciar", {
        fontSize: "24px",
        fontFamily: "Barrio",
        fontStyle: "Bold",
        color: "black",
        align: 'center'
      }).setOrigin(0.5);
      this.adjustScale();
    }
  }
  
  export default GameOverScene;
