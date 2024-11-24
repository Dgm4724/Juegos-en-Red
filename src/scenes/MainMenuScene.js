class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    preload() {
        // Load any assets specific to the menu if needed
        this.load.image("menuBackground", "./assets/images/menuBackground.png");
        this.load.image("playButton", "./assets/images/playButton.png");
    }

    create() {
        // Background image
        this.add.image(360, 240, "fondo1");

        // Title text
        this.add.text(360, 100, "Seal Ball Game", {
            fontSize: "40px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Play button
        const playButton = this.add.image(360, 300, "playButton").setInteractive();

        // Start the GameScene when the button is clicked
        playButton.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

        // Instruction text
        this.add.text(360, 400, "Haz clic en 'Jugar' para empezar!", {
            fontSize: "20px",
            color: "#ffffff",
        }).setOrigin(0.5);
    }
}

export default MainMenuScene;
