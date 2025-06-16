class Bootstrap extends Phaser.Scene {
    constructor() {
        super({key: "Bootstrap"});
    }
    preload() {
        this.load.on("complete", () => {
            this.scene.start("MainMenuScene");
        })
        
        // IMÁGENES
        this.load.image("fondo1", "./assets/images/fondo1.png");
        this.load.image("fondoGlaciar", "./assets/images/glaciar.png");
        this.load.image("bloqueHielo", "./assets/images/bloque-hielo.png");
        this.load.image("fondoGenerico", "./assets/images/fondoGenerico.png");        
        this.load.image("fondoGenericoAzul", "./assets/images/fondoGEN_azul.png");
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
        this.load.image("backButton", "./assets/images/volver_button.png");
        this.load.image("miniatura1", "./assets/images/miniatura-nivel1.png");
        this.load.image("miniatura2", "./assets/images/miniatura-nivel2.png");
        this.load.image("miniatura3", "./assets/images/miniatura-nivel3.png");

        //AUDIO
        this.load.audio("buttonOver", "./assets/sounds/buttonOver.mp3");
        this.load.audio("buttonOn", "./assets/sounds/buttonOn.mp3");
        this.load.audio("bgMenuMusic", "./assets/sounds/Slime Time.mp3");
        this.load.audio("bgLevel1", "./assets/sounds/To Binge (Instrumental).mp3");
        this.load.audio("bgLevel2", "./assets/sounds/Inazuma Eleven 2 Firestorm_Blizzard - OST 05_Winter Wonderland - Hokkaido.mp3");

        // FUENTES
        this.load.font("Barrio", "./assets/fonts/Barrio-Regular.ttf");
        this.load.font("Freckle Face", "./assets/fonts/FreckleFace-Regular.ttf");
    }
}

export default Bootstrap;
