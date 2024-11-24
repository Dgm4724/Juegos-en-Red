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
        this.botonPlay = this.add.image(360, 300, "botonPlay").setInteractive();
        this.botonPlay.setScale(1.75);

        // Funcion del boton Jugar
        this.botonPlay.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

        // Texto
        this.add.text(360, 180, "¡Haz clic en 'Jugar' para empezar!", {
            fontSize: "20px",
            color: "#000000",
        }).setOrigin(0.5);
    }
}

export default MainMenuScene;
