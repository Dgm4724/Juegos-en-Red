class CreditsScene extends Phaser.Scene {
    constructor() {
      super({ key: "CreditsScene" });
    }
  
    create() {
      // factores de escala
      this.widthRatio = this.scale.width / 720;
      this.heightRatio = this.scale.height / 480;
  
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
      this.botonMenu = this.add.image(580, 430, "backButton").setInteractive();
  
      this.botonMenu.on('pointerover', () => {
        this.botonMenu.setScale(1.09*this.widthRatio, 1.09*this.heightRatio);
        this.botonMenu.setTint(0xd9bfff);
      });
      this.botonMenu.on('pointerout', () => {
        this.botonMenu.setScale(this.widthRatio, this.heightRatio); // Restaurar el tamaño original
        this.botonMenu.clearTint(); // Eliminar el tinte
      });
      this.botonMenu.on("pointerdown", () => {
        this.fadeToBlack(() => {
          this.scene.start("MainMenuScene");
        });
      });
  
      // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
      this.fundido = this.add.rectangle(720/2, 480/2, 720, 480, 'black', 1);
  
      this.adjustScale();
      
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
  }
    
  export default CreditsScene;