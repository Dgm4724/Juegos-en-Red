class CreditsScene extends Phaser.Scene {
    constructor() {
      super({ key: "CreditsScene" });
    }

    create() {
      // Fondo
      const fondo = this.add.image(360, 240, "fondoGenericoAzul");
  
      // Texto CRÉDITOS
      this.add.text(360, 60, "CRÉDITOS", {
        fontSize: "70px",
        fontFamily: "Barrio",
        color: "#49e797",
      }).setOrigin(0.5);
  
      // contenido
      this.add.text(260, 250, `DESARROLLADORES:\n\n - Álvaro Codorníu Alonso\n - Tarso da Costa da Silva\n - Diego Gómez Martín\n - Juan Carlos Mauricio Orejón\n\nMÚSICA:\n\n     Randy Sharp - Slime Time   (menú de inicio)\n     To Binge - Gorillaz   (nivel 1)`, {
        fontSize: "20px",
        fontFamily: "Freckle Face",
        color: "#4eddc1",
      }).setOrigin(0.5);
  
      // Botón para volver al menu principal
      const botonMenu = this.add.image(580, 430, "backButton").setInteractive();
      botonMenu.on("pointerdown", () => {
        this.scene.start("MainMenuScene");
      });
      botonMenu.setScale(1.5);

      this.adjustScale();
    }
  }
  
  export default CreditsScene;
