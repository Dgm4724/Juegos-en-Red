class LevelSelectorScene extends Phaser.Scene {
    constructor() {
        super({ key: "LevelSelectorScene" });
    }

    create() {
        // factores de escala
        this.widthRatio = this.scale.width / 720;
        this.heightRatio = this.scale.height / 480;

        // Fondo
        this.add.image(360, 240, "fondoGenerico");

        // SELECCIONA EL NIVEL
        this.add.text(350, 60, "SELECCIONA EL NIVEL :", {
            fontSize: "50px",
            fontFamily: "Barrio",
            color: "#fad461",
        }).setOrigin(0.5);

        this.MIN1 = this.add.image(720/5, 480/2.5, "miniatura1").setInteractive();
        this.MIN1.setScale(0.25);

        this.MIN2 = this.add.image(720/2, 480/2.5, "miniatura2").setInteractive();
        this.MIN2.setScale(0.25);

        this.MIN3 = this.add.image(720/5*4, 480/2.5, "miniatura3").setInteractive();
        this.MIN3.setScale(0.25);

        // SELECCIONA EL PERSONAJE
        this.add.text(180, 330, "SELECCIONA EL PERSONAJE :", {
            fontSize: "20px",
            fontFamily: "Barrio",
            color: "#dba43d",
        }).setOrigin(0.5);

        // Boton Crear partida
        this.botonCP = this.add.image(500, 390, "boton").setInteractive();
        this.botonCP.setScale(1, 0.8);
        this.CPtxt = this.add.text(500, 390, "Crear partida", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonCP.on('pointerover', () => {
            this.botonCP.setScale(1.05*this.widthRatio, 1.05*0.8*this.heightRatio);
            this.botonCP.setTint(0xffdca1);
            this.CPtxt.setFontSize(26);
        });
        this.botonCP.on('pointerout', () => {
            this.botonCP.setScale(this.widthRatio, 0.8*this.heightRatio); // Restaurar el tamaño original
            this.botonCP.clearTint(); // Eliminar el tinte
            this.CPtxt.setFontSize(23);
        });
        this.botonCP.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

        // Botón para volver al menu principal
        this.botonMenu = this.add.image(640, 430, "backButton").setInteractive();
        this.botonMenu.setTint(0xffe47b);

        this.botonMenu.on('pointerover', () => {
        this.botonMenu.setScale(1.09*this.widthRatio, 1.09*this.heightRatio);
        this.botonMenu.setTint(0xffd42f);
        });
        this.botonMenu.on('pointerout', () => {
        this.botonMenu.setScale(this.widthRatio, this.heightRatio); // Restaurar el tamaño original
        this.botonMenu.setTint(0xffe47b);
        });
        this.botonMenu.on("pointerdown", () => {
            this.scene.start("MainMenuScene");
        });
        
        this.adjustScale();
    }
}

export default LevelSelectorScene;
