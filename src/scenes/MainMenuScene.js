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

        this.botonPlay.on('pointerover', () => {
            this.botonPlay.setScale(1.07*1.5*this.widthRatio, 1.07*1.5*this.heightRatio);
            this.botonPlay.setTint(0xd0ff8d);
        });
        this.botonPlay.on('pointerout', () => {
            this.botonPlay.setScale(1.5*this.widthRatio, 1.5*this.heightRatio); // Restaurar el tamaño original
            this.botonPlay.clearTint(); // Eliminar el tinte
        });
        this.botonPlay.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.scene.start("LevelSelectorScene");
            });
        });

        // Boton Ajustes
        this.botonA = this.add.image(360, 340, "boton").setInteractive();
        this.botonA.setScale(1, 0.8);
        this.Atxt = this.add.text(360, 340, "Ajustes", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonA.on('pointerover', () => {
            this.botonA.setScale(1.05*this.widthRatio, 1.05*0.8*this.heightRatio);
            this.botonA.setTint(0xffdca1);
            this.Atxt.setFontSize(26);
        });
        this.botonA.on('pointerout', () => {
            this.botonA.setScale(this.widthRatio, 0.8*this.heightRatio); // Restaurar el tamaño original
            this.botonA.clearTint(); // Eliminar el tinte
            this.Atxt.setFontSize(23);
        });

        // Boton Créditos
        this.botonC = this.add.image(360, 390, "boton").setInteractive();
        this.botonC.setScale(1, 0.8);
        this.Ctxt = this.add.text(360, 390, "Créditos", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonC.on('pointerover', () => {
            this.botonC.setScale(1.05*this.widthRatio, 1.05*0.8*this.heightRatio);
            this.botonC.setTint(0xffdca1);
            this.Ctxt.setFontSize(26);
        });
        this.botonC.on('pointerout', () => {
            this.botonC.setScale(this.widthRatio, 0.8*this.heightRatio); // Restaurar el tamaño original
            this.botonC.clearTint(); // Eliminar el tinte
            this.Ctxt.setFontSize(23);
        });
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

        // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
        this.fundido = this.add.rectangle(720/2, 480/2, 720, 480, 'black', 1)
        
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

export default MainMenuScene;
