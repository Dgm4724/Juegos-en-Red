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
        this.foca1.setBounce(0);
        this.foca1.body.setSize(50, 40);
        this.foca1.setCollideWorldBounds(true);
        // Controles foca 1
        this.input.keyboard.on("keydown_D", () => {
            this.foca1.setAcceleration(50, 0);
        });
        this.input.keyboard.on("keyup_D", () => {
            this.foca1.setAcceleration(0, 0);
        });
        this.input.keyboard.on("keydown_A", () => {
            this.foca1.setAcceleration(50, 0);
        });
        this.input.keyboard.on("keyup_A", () => {
            this.foca1.setAcceleration(0, 0);
        });

        // Foca 2
        this. foca2 = this.physics.add.image(570, 430, "foca2");
        this.foca2.flipX = true;
        this.foca2.setBounce(0);
        this.foca2.body.setSize(50, 40);
        this.foca2.setCollideWorldBounds(true);
        // Controles foca 2
        this.input.keyboard.on("keydown_RIGHT", () => {
            this.foca2.setAcceleration(50, 0);
        });
        this.input.keyboard.on("keyup_RIGHT", () => {
            this.foca2.setAcceleration(0, 0);
        });
        this.input.keyboard.on("keydown_LEFT", () => {
            this.foca2.setAcceleration(50, 0);
        });
        this.input.keyboard.on("keyup_LEFT", () => {
            this.foca2.setAcceleration(0, 0);
        });

        // Pelota
        this.pelota = this.physics.add.image(360, 250, "pelota");
        this.pelota.setBounce(0.75);
        this.pelota.setOrigin(0.5, 0.5);
        this.pelota.setCollideWorldBounds(true);

        // Colisiones
        this.physics.add.collider(this.foca1, suelo);
        this.physics.add.collider(this.foca2, suelo);
        this.physics.add.collider(this.pelota, suelo);

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys(); // Flechas
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Espacio
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Tecla A
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Tecla D
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Enter
    }

    update() {
        // Movimiento de la foca 1 (usando A, D y espacio)
        if (this.AKey.isDown) {
          this.foca1.setVelocityX(-160); // Movimiento hacia la izquierda
        } else if (this.DKey.isDown) {
          this.foca1.setVelocityX(160); // Movimiento hacia la derecha
        } else {
          this.foca1.setVelocityX(0); // Detenerse si no se presionan las teclas A o D
        }
    
        // Salto para la foca 1 (usando espacio)
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.foca1.body.touching.down) {
          this.foca1.setVelocityY(-330); // Salto para la foca 1
        }
    
        // Movimiento de la foca 2 (usando las flechas)
        if (this.cursors.left.isDown) {
          this.foca2.setVelocityX(-160); // Movimiento hacia la izquierda
        } else if (this.cursors.right.isDown) {
          this.foca2.setVelocityX(160); // Movimiento hacia la derecha
        } else {
          this.foca2.setVelocityX(0); // Detenerse si no se presionan las flechas
        }
    
        // Salto para la foca 2 (usando Enter)
        if (Phaser.Input.Keyboard.JustDown(this.enterKey) && this.foca2.body.touching.down) {
          this.foca2.setVelocityY(-330); // Salto para la foca 2
        }
      }
}

export default GameScene;
