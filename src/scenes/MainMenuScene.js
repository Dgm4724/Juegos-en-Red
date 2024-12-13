class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    create() {
        // Fondo
        this.add.image(360, 240, "fondoGenerico");
        
        // Interfaz titulo
        this.interfaz = this.add.image(360, 240, "interfazMainMenu");
        this.interfaz.setScale(1.25);

        // Boton Jugar
        this.botonPlay = this.add.image(360, 250, "botonPlay").setInteractive();
        this.botonPlay.setScale(1.5);

        this.botonPlay.on("pointerdown", () => {
            this.scene.start("GameScene");
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
            this.scene.start("CreditsScene");
        });

        // Texto
        this.add.text(360, 170, "¡Haz clic en el botón verde para empezar a jugar!", {
            fontFamily: "Freckle Face",
            fontSize: "20px",
            color: "#000000",
        }).setOrigin(0.5);
        
        this.adjustScale();
    }
}

export default MainMenuScene;
