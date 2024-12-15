class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    create() {
        // Factores de escala
        this.widthRatio = this.scale.width / 720;
        this.heightRatio = this.scale.height / 480;

        // Fondo
        this.add.image(360, 240, "fondoGenerico");

        // Interfaz título
        this.interfaz = this.add.image(360, 240, "interfazMainMenu");
        this.interfaz.setScale(1.25);

        // Botón Jugar
        this.botonPlay = this.add.image(360, 245, "botonPlay").setInteractive();
        this.botonPlay.setScale(1.5);

        this.botonPlay.on('pointerover', () => {
            this.botonPlay.setScale(1.07 * 1.5 * this.widthRatio, 1.07 * 1.5 * this.heightRatio);
            this.botonPlay.setTint(0xd0ff8d);
        });
        this.botonPlay.on('pointerout', () => {
            this.botonPlay.setScale(1.5 * this.widthRatio, 1.5 * this.heightRatio); // Restaurar el tamaño original
            this.botonPlay.clearTint(); // Eliminar el tinte
        });
        this.botonPlay.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("LevelSelectorScene");
            });
        });

        // Botón Ajustes
        this.botonA = this.add.image(360, 345, "boton").setInteractive();
        this.botonA.setScale(1, 0.8);
        this.Atxt = this.add.text(360, 345, "Ajustes", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonA.on('pointerover', () => {
            this.botonA.setScale(1.05 * this.widthRatio, 1.05 * 0.8 * this.heightRatio);
            this.botonA.setTint(0xffdca1);
            this.Atxt.setFontSize(26);
        });
        this.botonA.on('pointerout', () => {
            this.botonA.setScale(this.widthRatio, 0.8 * this.heightRatio); // Restaurar el tamaño original
            this.botonA.clearTint(); // Eliminar el tinte
            this.Atxt.setFontSize(23);
        });

        // Botón Créditos
        this.botonC = this.add.image(360, 400, "boton").setInteractive();
        this.botonC.setScale(1, 0.8);
        this.Ctxt = this.add.text(360, 400, "Créditos", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonC.on('pointerover', () => {
            this.botonC.setScale(1.05 * this.widthRatio, 1.05 * 0.8 * this.heightRatio);
            this.botonC.setTint(0xffdca1);
            this.Ctxt.setFontSize(26);
        });
        this.botonC.on('pointerout', () => {
            this.botonC.setScale(this.widthRatio, 0.8 * this.heightRatio); // Restaurar el tamaño original
            this.botonC.clearTint(); // Eliminar el tinte
            this.Ctxt.setFontSize(23);
        });
        this.botonC.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("CreditsScene");
            });
        });

        // Texto animado
        this.jugarTexto = this.add.text(360, 170, "¡Haz clic en el botón verde para empezar a jugar!", {
            fontFamily: "Barrio",
            fontSize: "20px",
            color: "#000000",
        }).setOrigin(0.5);

        // Comienza la animación de rotación y escalado en secuencia
        this.startTextAnimation();

        // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
        this.fundido = this.add.rectangle(720 / 2, 480 / 2, 720, 480, 'black', 1);

        this.adjustScale();

        this.fadeFromBlack();
    }

    // Animación del texto (rotación y escalado por separado)
    startTextAnimation() {
        // Rotación a un lado
        this.tweens.add({
            targets: this.jugarTexto,
            scale: 0.99, // Escala sutil
            duration: 750,
            ease: 'Sine.easeInOut',
            yoyo: true, // Regresa al tamaño original
            onComplete: () => {
                // Llamamos de nuevo a la animación para que sea cíclica
                this.startTextAnimation();
            }
        });
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
