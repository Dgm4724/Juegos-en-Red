class bootstrap extends Phaser.Scene {
    constructor() {
        super({key: "Bootstrap"});
    }
    preload() {
        this.load.on("complete", () => {
            this.scene.start("GameScene");
        })

        this.load.image("fondo1", "./assets/images/Fondo1.png");
        this.load.image("foca1", "./assets/images/seal1.png");
        this.load.image("foca2", "./assets/images/seal2.png");
        this.load.image("pelota", "./assets/images/pelota.png");
    }
}

export default bootstrap;
