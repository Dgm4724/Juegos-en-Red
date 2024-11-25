class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.golpeFoca1 = null;
    this.golpeFoca2 = null;
    this.puntuacion = 0;
  }

  preload() {
    // Carga los recursos necesarios
  }

  create() {
    // Reiniciar puntuación a cero
    this.puntuacion = 0;

    // Fondo
    this.add.image(360, 240, "fondo1");

    // Suelo
    const suelo = this.add.rectangle(360, 470, 720, 10, 0x000000, 0);
    this.physics.add.existing(suelo, true);

    // Crear focas
    this.foca1 = this.createFoca(250, 400, "foca1");
    this.foca1.setScale(0.75);
    this.foca1.setFlipX(false);

    this.foca2 = this.createFoca(470, 400, "foca2");
    this.foca2.setScale(0.75);
    this.foca2.setFlipX(true);

    // Pelota
    this.pelota = this.physics.add.image(360, 150, "pelota");
    this.pelota.setBounce(0.75).setOrigin(0.5, 0.5).setCollideWorldBounds(true);

    // Colisiones
    this.physics.add.collider(this.foca1, suelo);
    this.physics.add.collider(this.foca2, suelo);
    this.physics.add.collider(this.pelota, suelo, this.handlePelotaToqueSuelo, null, this);
    this.physics.add.overlap(this.foca1, this.pelota, this.handleHit, null, this);
    this.physics.add.overlap(this.foca2, this.pelota, this.handleHit, null, this);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    // Palmera
    this.add.image(100, 300, "palmera");

    // Cartel de puntuacion
    const cartelPuntuacion = this.add.image(360, 60, "cartelPuntuacion");
    cartelPuntuacion.setDisplaySize(200, 75);

    // Mostrar puntuación en pantalla (arriba, centrado)
    this.puntajeTexto = this.add.text(360, 50, `Puntos: ${this.puntuacion}`, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 0);  // Centrado horizontalmente
  }

  createFoca(x, y, spriteKey) {
    const foca = this.physics.add.image(x, y, spriteKey);
    foca.setBounce(0).setCollideWorldBounds(true);
    return foca;
  }

  setGolpeFoca(foca, tipoGolpe) {
    if (foca === this.foca1) {
      this.golpeFoca1 = tipoGolpe;
      setTimeout(() => (this.golpeFoca1 = null), 100);
    } else if (foca === this.foca2) {
      this.golpeFoca2 = tipoGolpe;
      setTimeout(() => (this.golpeFoca2 = null), 100);
    }
  }

  handleHit(foca, pelota) {
    let tipoGolpe = foca === this.foca1 ? this.golpeFoca1 : this.golpeFoca2;
    if (!tipoGolpe) return;

    // Verificar si la foca que golpeó la pelota es distinta a la anterior
    if (this.ultimaFocaGolpeadora === foca) {
      return; // Si es la misma foca que la anterior, no se suman puntos
    }

    // Actualizar la última foca que golpeó la pelota
    this.ultimaFocaGolpeadora = foca;

    // Determinar la dirección horizontal en función de la dirección de la foca
    const direccionX = foca.flipX ? -1 : 1;

    // Aplicar la fuerza al golpe (por tipo)
    const fuerzaX = direccionX * (tipoGolpe === "fuerte" ? 1000 : 300); // Dependiendo de si es fuerte o normal
    const fuerzaY = tipoGolpe === "fuerte" ? -200 : -350;

    // Establecer la velocidad de la pelota
    pelota.setVelocity(fuerzaX, fuerzaY);

    // Actualizar puntuación
    if (tipoGolpe === "normal") {
      this.puntuacion += 1;
    } else if (tipoGolpe === "fuerte") {
      this.puntuacion += 2;
    }

    // Actualizar el texto de puntuación en pantalla
    this.puntajeTexto.setText(`Points: ${this.puntuacion}`);
  }

  handlePelotaToqueSuelo() {
    // Cambiar a la escena GameOverScene y pasar la puntuación
    this.scene.start('GameOverScene', { puntuacion: this.puntuacion });
  }

  update() {
    const speed = 160;
    const jumpForce = 330;

    // Movimiento y colisión foca 1
    this.moveFoca(this.foca1, this.aKey, this.dKey, this.wKey, this.eKey, this.rKey, speed, jumpForce);

    // Movimiento y colisión foca 2
    this.moveFoca(this.foca2, this.cursors.left, this.cursors.right, this.cursors.up, this.oKey, this.pKey, speed, jumpForce);
  }

  moveFoca(foca, leftKey, rightKey, jumpKey, normalHitKey, strongHitKey, speed, jumpForce) {
    // Movimiento horizontal
    if (leftKey.isDown) {
        foca.setVelocityX(-speed);
        foca.setFlipX(true); // Voltea la foca a la izquierda
    } else if (rightKey.isDown) {
        foca.setVelocityX(speed);
        foca.setFlipX(false); // Voltea la foca a la derecha
    } else {
        foca.setVelocityX(0); // Detenerse
    }

    // Centrar el collider siempre
    const offsetX = (foca.displayWidth - foca.body.width) / 2; // Offset horizontal centrado
    const offsetY = (foca.displayHeight - foca.body.height) / 2; // Offset vertical centrado

    // Ajustar el collider basado en el flipX
    foca.body.setOffset(foca.flipX ? offsetX : -offsetX, offsetY);

    // Salto
    if (Phaser.Input.Keyboard.JustDown(jumpKey) && foca.body.touching.down) {
        foca.setVelocityY(-jumpForce);
    }

    // Golpes
    if (normalHitKey.isDown) {
        this.setGolpeFoca(foca, "normal");
    } else if (strongHitKey.isDown) {
        this.setGolpeFoca(foca, "fuerte");
    }
  }
}

export default GameScene;


