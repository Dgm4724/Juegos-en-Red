class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: "CreditsScene" });
  }

  create() {
    // Ocultar chat
    document.getElementById("chat").style.display = "none";

    // Fondo
    const fondo = this.add.image(360, 240, "fondoGenericoAzul");

    // Texto CRÉDITOS
    this.add.text(500, 60, "CRÉDITOS", {
      fontSize: "65px",
      fontFamily: "Barrio",
      color: "#49e797",
    }).setOrigin(0.5);

    // contenido
    this.add.text(260, 250, `DESARROLLADORES:\n\n     Álvaro Codorníu Alonso\n     Diego Gómez Martín\n\nMÚSICA:\n\n     Randy Sharp - Slime Time   (menú de inicio)\n     To Binge - Gorillaz   (nivel 1)\n     Inazuma Eleven 2 - OST 05: Winter Wonderland\n\nSONIDOS:\n\n Pixabay.com`,{
      fontSize: "19px",
      fontFamily: "Freckle Face",
      color: "#4eddc1",
    }).setOrigin(0.5);

    // Botón para volver al menu principal
    this.botonMenu = this.add.image(580, 430, "backButton").setInteractive();

    this.botonMenu.on('pointerover', () => {
      this.botonMenu.setScale(1.09);
      this.botonMenu.setTint(0xd9bfff);
    });
    this.botonMenu.on('pointerout', () => {
      this.botonMenu.setScale(1); // Restaurar el tamaño original
      this.botonMenu.clearTint(); // Eliminar el tinte
    });
    this.botonMenu.on("pointerdown", () => {
      this.fadeToBlack(() => {
        this.scene.start("MainMenuScene");
      });
    });

    // Texto conexión
    this.connectionText = this.add.text(360, 450, "HAS PERDIDO LA CONEXIÓN", {
      fontFamily: "Barrio",
      fontSize: "50px",
      fontStyle: "Bold",
      color: "#b0202b",
    }).setOrigin(0.5);
    this.connectionText.setVisible(false);

    // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
    this.fundido = this.add.rectangle(720/2, 480/2, 720, 480, 'black', 1);
    
    this.fadeFromBlack();
  }

  // Fundido a negro
  fadeToBlack(callback) {
    this.tweens.add({
      targets: this.fundido,
      alpha: 1, // Opaco
      duration: 200,
      ease: 'Cubic.easeInOut',
      onComplete: callback // Ejecutar callback al terminar
    });
  }
  // Desvanecimiento desde negro
  fadeFromBlack() {
    this.fundido.setAlpha(1);
    this.tweens.add({
      targets: this.fundido,
      alpha: 0, // Transparente
      duration: 200,
      ease: 'Cubic.easeInOut'
    });
  }

  update() {
    // MOSTRAR ESTADO DE LA CONEXIÓN
    this.connectionText.setVisible(this.registry.get('connection') === false);
  }
}
  
export default CreditsScene;
