class Bootstrap extends Phaser.Scene {
    constructor() {
        super({key: "Bootstrap"});
    }
    preload() {
        this.load.on("complete", () => {
            this.scene.start("MainMenuScene");
        })

        this.load.image("fondo1", "./assets/images/fondo1.png");
        this.load.image("fondoGenerico", "./assets/images/fondoGenerico.png");
        this.load.image("foca1", "./assets/images/foca1.png");
        this.load.image("foca2", "./assets/images/foca2.png");
        this.load.image("pelota", "./assets/images/pelota.png");
        this.load.image("palmera", "./assets/images/palmera.png");
        this.load.image("cartelPuntuacion", "./assets/images/cartelPuntuacion.png");
        this.load.image("botonPlay", "./assets/images/botonPlay.png");
        this.load.image("boton", "./assets/images/boton.png");
        this.load.image("interfazMainMenu", "./assets/images/interfazMainMenu.png");
        this.load.image("gameOverBackground", "./assets/images/gameOverBackground.png");
        this.load.image("menuButton", "./assets/images/menuButton.png");
        this.load.image("restartButton", "./assets/images/restartButton.png");
    }
}

export default Bootstrap;