class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
    }
    create() {
        // Fondo
        this.add.image(360, 240, "fondo1");

        // Suelo
        const suelo = this.add.rectangle(360, 470, 720, 10, 0x000000, 0); // Color 0x000000, con opacidad 0
        this.physics.add.existing(suelo, true); // 'true' hace el cuerpo estático

        // Foca 1
        this.foca1 = this.physics.add.image(150, 430, "foca1");
        this.foca1.flipX = true;
        this.foca1.setCollideWorldBounds(true);

        // Foca 2
        this. foca2 = this.physics.add.image(620, 430, "foca2");
        this.foca2.flipX = true;
        this.foca2.setCollideWorldBounds(true);

        // Pelota
        this.pelota = this.physics.add.image(360, 250, "pelota");
        this.pelota.setBounce(0.75);

        // Colisiones
        this.physics.add.collider(this.foca1, suelo);
        this.physics.add.collider(this.foca2, suelo);
        this.physics.add.collider(this.pelota, suelo);
    }
}

export default GameScene;

