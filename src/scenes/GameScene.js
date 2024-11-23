class GameScene extends Phaser.Scene {
    constructor() {
      super({key: "GameScene"});
       //Golpes
      this.golpeFoca1 = null;
      this.golpeFoca2 = null;
    }
    
    preload(){

    }
    create() {
      //Variables
      const acceleration = 50;

      
      // Fondo
      this.add.image(360, 240, "fondo1");

      // Suelo
      const suelo = this.add.rectangle(360, 470, 720, 10, 0x000000, 0); // Color 0x000000, con opacidad 0
      this.physics.add.existing(suelo, true); // 'true' hace el cuerpo estático

      // Foca 1
      this.foca1 = this.physics.add.image(150, 430, "foca1");
      this.foca1.flipX = false;
      this.foca1.setBounce(0);
      this.foca1.body.setSize(50, 40);
      this.foca1.setCollideWorldBounds(true);
      // Controles foca 1
      this.input.keyboard.on("keydown_D", () => {
          this.foca1.setAcceleration(acceleration, 0);
      });
      this.input.keyboard.on("keyup_D", () => {
          this.foca1.setAcceleration(0, 0);
      });
      this.input.keyboard.on("keydown_A", () => {
          this.foca1.setAcceleration(acceleration, 0);
      });
      this.input.keyboard.on("keyup_A", () => {
          this.foca1.setAcceleration(0, 0);
      });

      // Foca 2
      this.foca2 = this.physics.add.image(570, 430, "foca2");
      this.foca2.flipX = false;
      this.foca2.setBounce(0);
      this.foca2.body.setSize(50, 40);
      this.foca2.setCollideWorldBounds(true);

      // Controles foca 2
      this.input.keyboard.on("keydown_RIGHT", () => {
          this.foca2.setAcceleration(acceleration, 0);
      });
      this.input.keyboard.on("keyup_RIGHT", () => {
          this.foca2.setAcceleration(0, 0);
      });
      this.input.keyboard.on("keydown_LEFT", () => {
          this.foca2.setAcceleration(acceleration, 0);
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

      this.physics.add.overlap(this.foca1, this.pelota, this.handle_hit, null, this);
      this.physics.add.overlap(this.foca2, this.pelota, this.handle_hit, null, this);

      // Controles
      this.cursors = this.input.keyboard.createCursorKeys(); // Flechas
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Espacio
      this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Enter
      this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Tecla A
      this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Tecla D
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Tecla W
      this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Tecla E
      this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // Tecla R
      this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O); // Tecla O
      this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Tecla P

    }

    setGolpeFoca(foca, tipoGolpe){
      if(foca === this.foca1){
        this.golpeFoca1 = tipoGolpe
        setTimeout(() => {
          this.golpeFoca1 = null;
          console.log('Golpe Foca 1 reiniciado a null');
        }, 100); 
      }
      if(foca === this.foca2){
        this.golpeFoca2 = tipoGolpe
        setTimeout(() => {
          this.golpeFoca2 = null;
          console.log('Golpe Foca 2 reiniciado a null');
        }, 100);
      }
    }

    handle_hit(foca, pelota){
      let tipoGolpe;
      if (foca === this.foca1){
        tipoGolpe = this.golpeFoca1
        this.golpeFoca1 = null;
      }
      if (foca === this.foca2){
        tipoGolpe = this.golpeFoca2
        this.golpeFoca2 = null;
      }
      if (tipoGolpe === 'normal') {
        pelota.setVelocityX(foca.scaleX * 300); // Rebote aleatorio horizontal
        pelota.setVelocityY(-350); // Empuje hacia arriba
      } 
      else if (tipoGolpe === 'fuerte') {
        pelota.setVelocityX(foca.scaleX * 600); 
        pelota.setVelocityY(-200); 
      }


    }

    update() {
      //Variables
      const jumpForce = 330;
      const speed = 160;

      // Movimiento de la foca 1 (usando A, D y espacio)
      if (this.aKey.isDown) {
        this.foca1.setVelocityX(-speed); // Movimiento hacia la izquierda
        this.foca1.scaleX = -1
      } else if (this.dKey.isDown) {
        this.foca1.setVelocityX(speed); // Movimiento hacia la derecha
        this.foca1.scaleX = 1
      } else {
        this.foca1.setVelocityX(0); // Detenerse si no se presionan las teclas A o D
      }
  
      // Salto para la foca 1 (usando espacio)
      if (Phaser.Input.Keyboard.JustDown(this.wKey) && this.foca1.body.touching.down) {
        this.foca1.setVelocityY(-jumpForce); // Salto para la foca 1
      }

      if(this.eKey.isDown){
        this.setGolpeFoca(this.foca1, "normal")
      } else if (this.rKey.isDown){
        this.setGolpeFoca(this.foca1, "fuerte")
      }
  
      // Movimiento de la foca 2 (usando las flechas)
      if (this.cursors.left.isDown) {
        this.foca2.setVelocityX(-speed); // Movimiento hacia la izquierda
        this.foca2.scaleX = -1
      } else if (this.cursors.right.isDown) {
        this.foca2.setVelocityX(speed); // Movimiento hacia la derecha
        this.foca2.scaleX = 1
      } else {
        this.foca2.setVelocityX(0); // Detenerse si no se presionan las flechas
      }
  
      // Salto para la foca 2 (usando Enter)
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.foca2.body.touching.down) {
        this.foca2.setVelocityY(-jumpForce); // Salto para la foca 2
      }

      if(this.oKey.isDown){
        this.setGolpeFoca(this.foca2, "normal")
      } else if (this.pKey.isDown){
        this.setGolpeFoca(this.foca2, "fuerte")
      }

      }
}

export default GameScene;
