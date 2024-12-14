class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    create() {
        // factores de escala
        this.widthRatio = this.scale.width / 720;
        this.heightRatio = this.scale.height / 480;

        // Fondo
        this.add.image(360, 240, "fondoGenerico");
        
        // Interfaz titulo
        this.interfaz = this.add.image(360, 240, "interfazMainMenu");
        this.interfaz.setScale(1.25);

        // Boton Jugar
        this.botonPlay = this.add.image(360, 250, "botonPlay").setInteractive();
        this.botonPlay.setScale(1.5);

        this.botonPlay.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("GameScene");
            });
        });

        // Boton Ajustes
        this.botonA = this.add.image(360, 340, "boton").setInteractive();
        this.botonA.setScale(1, 0.8);
        this.add.text(360, 340, "Ajustes", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        // Boton Créditos
        this.botonC = this.add.image(360, 390, "boton").setInteractive();
        this.botonC.setScale(1, 0.8);
        this.add.text(360, 390, "Créditos", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonC.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("CreditsScene");
            });
        });

        // Texto
        this.add.text(360, 170, "¡Haz clic en el botón verde para empezar a jugar!", {
            fontFamily: "Freckle Face",
            fontSize: "20px",
            color: "#000000",
        }).setOrigin(0.5);
        
        this.adjustScale();

        // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
        this.fundido = this.add.rectangle(720 * this.widthRatio/2, 480 * this.heightRatio/2, 720 * this.widthRatio, 480 * this.heightRatio, 'black', 1);
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

export default MainMenuScene;
