class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    create() {
        // Fondo
        this.add.image(360, 240, "fondoGenerico");

        // Interfaz título
        this.interfaz = this.add.image(360, 240, "interfazMainMenu");
        this.interfaz.setScale(1.25);

        // Botón Jugar
        this.botonPlay = this.add.image(360, 255, "botonPlay").setInteractive();
        this.botonPlay.setScale(1.5);

        this.botonPlay.on('pointerover', () => {
            this.botonPlay.setScale(1.6);
            this.botonPlay.setTint(0xffdca1);
        });

        this.botonPlay.on('pointerout', () => {
            this.botonPlay.setScale(1.5); // Restaurar el tamaño original
            this.botonPlay.clearTint(); // Eliminar el tinte
        });

        this.botonPlay.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("LevelSelectorScene");
            });
        });

        // Botón Login
        this.botonLogin = this.add.image(625, 50, "boton").setInteractive();
        this.botonLogin.setScale(0.8, 0.64);
        this.Ltxt = this.add.text(625, 50, "Iniciar Sesión", {
            fontFamily: "Barrio",
            fontSize: "19px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonLogin.on('pointerover', () => {
            this.botonLogin.setScale(0.8 * 1.05, 0.64 * 1.05);
            this.botonLogin.setTint(0xffdca1);
            this.Ltxt.setFontSize(20);
        });
        this.botonLogin.on('pointerout', () => {
            this.botonLogin.setScale(0.8, 0.64); // Restaurar el tamaño original
            this.botonLogin.clearTint(); // Eliminar el tinte
            this.Ltxt.setFontSize(19);
        });
        this.botonLogin.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("LoginScene");
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
            this.botonA.setScale(1.05, 1.05 * 0.8);
            this.botonA.setTint(0xffdca1);
            this.Atxt.setFontSize(26);
        });
        this.botonA.on('pointerout', () => {
            this.botonA.setScale(1, 0.8); // Restaurar el tamaño original
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
            this.botonC.setScale(1.05, 1.05 * 0.8);
            this.botonC.setTint(0xffdca1);
            this.Ctxt.setFontSize(26);
        });
        this.botonC.on('pointerout', () => {
            this.botonC.setScale(1, 0.8); // Restaurar el tamaño original
            this.botonC.clearTint(); // Eliminar el tinte
            this.Ctxt.setFontSize(23);
        });
        this.botonC.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("CreditsScene");
            });
        });

        // Texto animado
        this.jugarTexto = this.add.text(360, 175, "¡Haz clic en 'Jugar' para empezar el juego!", {
            fontFamily: "Freckle Face",
            fontSize: "20px",
            color: "#000000",
        }).setOrigin(0.5);

        // Comienza la animación de escalado en secuencia
        this.startTextAnimation();

        // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
        this.fundido = this.add.rectangle(720 / 2, 480 / 2, 720, 480, 'black', 1);

        this.fadeFromBlack();
    }

    // Animación del texto (rotación y escalado por separado)
    startTextAnimation() {
        // Rotación a un lado
        this.tweens.add({
            targets: this.jugarTexto,
            scale: 0.97, // Escala sutil
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
