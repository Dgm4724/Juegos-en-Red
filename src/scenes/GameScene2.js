class GameScene2 extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene2" });
    this.golpeFoca1 = null;
    this.golpeFoca2 = null;
    this.puntuacion = 0;
    this.isPaused = false;
  }

  preload() {
  }

  create() {
    // Reiniciar puntuación a cero
    this.puntuacion = 0;

    // juego no pausado
    this.isPaused = false;

    // Fondo del nivel seleccionado
    this.add.image(360, 240, "fondoGlaciar");

    // Suelo
    const suelo = this.add.rectangle( 360, 445, 720, 10, 0x000000, 0);
    this.physics.add.existing(suelo, true);
    this.suelo = suelo;
    
    // bloques de hielo
    this.hielo1 = this.physics.add.staticSprite(720/4, 330, "bloqueHielo");
    this.hielo2 = this.physics.add.staticSprite(720/4*3, 330, "bloqueHielo");

    // Crear focas
    this.foca1 = this.createFoca(250, 380, "foca1");
    this.foca1.setScale(0.75);
    this.foca1.setFlipX(false);

    this.foca2 = this.createFoca(470, 380, "foca2");
    this.foca2.setScale(0.75);
    this.foca2.setFlipX(true);

    // Pelota (inicialmente estática)
    this.pelota = this.physics.add.image(360, 150, "pelota");
    this.pelota.setBounce(0.75).setOrigin(0.5, 0.5).setCollideWorldBounds(true);
    this.pelota.body.setAllowGravity(false); // Desactivar gravedad inicialmente

    // Colisiones
    this.physics.add.collider(this.foca1, suelo);
    this.physics.add.collider(this.foca2, suelo);
    this.physics.add.collider(this.pelota, suelo, this.handlePelotaToqueSuelo, null, this);
    this.physics.add.overlap(this.foca1, this.pelota, this.handleHit, null, this);
    this.physics.add.overlap(this.foca2, this.pelota, this.handleHit, null, this);

    this.physics.add.collider(this.foca1, this.hielo1, null, (foca1, hielo1) => {
      // Verificar si el jugador está cayendo
      return this.foca1.body.velocity.y > 0;
    }, this);
    this.physics.add.collider(this.foca1, this.hielo2, null, (foca1, hielo2) => {
      return this.foca1.body.velocity.y > 0;
    }, this);

    this.physics.add.collider(this.foca2, this.hielo1, null, (foca2, hielo1) => {
      // Verificar si el jugador está cayendo
      return this.foca2.body.velocity.y > 0;
    }, this);
    this.physics.add.collider(this.foca2, this.hielo2, null, (foca2, hielo2) => {
      return this.foca2.body.velocity.y > 0;
    }, this);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    // Cartel de puntuación
    const cartelPuntuacion = this.add.image(360, 60, "cartelPuntuacion");
    cartelPuntuacion.setDisplaySize(200, 75);

    // Mostrar puntuación en pantalla (arriba, centrado)
    this.puntajeTexto = this.add.text(365, 30, `Puntuación: \n${this.puntuacion}`, {
      fontSize: '25px',
      fontFamily: "Freckle Face",
      color: 'black',
      align: 'center'
    }).setOrigin(0.5, 0); // Centrado horizontalmente
    
    // Texto inicial para la cuenta atrás
    this.countdownText = this.add.text(720 / 2, 480 / 2, '', {
      fontSize: '75px',
      fontFamily: 'Freckle Face',
      color: '#000000', // Color negro
      align: 'center',
    }).setOrigin(0.5, 0.5).setScale(0); // Empieza invisible (escala 0)

    // Rectángulo negro para los fundidos
    this.fundido = this.add.rectangle(720 / 2, 480 / 2, 720, 480, 'black', 1);

    // Crear menú de pausa (invisible por defecto)
    this.pauseMenu = this.createPauseMenu();

    // fundido desde negro
    this.fadeFromBlack();

    // Iniciar cuenta atrás
    this.startCountdown();
  }

  startCountdown() {
    let countdown = 3; // Cuenta atrás desde 3

    const showNextNumber = () => {
    if (countdown > 0) {
      this.countdownText.setText(countdown); // Cambiar el texto al número actual
      countdown -= 1;

      // Animación de entrada
      this.tweens.add({
        targets: this.countdownText,
        scale: 1, // Escalar a su tamaño normal
        duration: 300, // Duración de la animación
        ease: 'Back.easeOut', // Suavizado tipo salto
        onComplete: () => {
          // Después de 700ms, pasar al siguiente número
          this.time.delayedCall(700, () => {
            this.countdownText.setScale(0); // Reducir escala a 0 antes del próximo número
            showNextNumber(); // Llamar recursivamente al siguiente número
          });
        },
      });
    } else {
      // Mostrar "Go!" cuando el countdown llega a 0
      this.countdownText.setText('¡A jugar!');
      this.tweens.add({
        targets: this.countdownText,
        scale: 1.2, // Escalar ligeramente más grande
        duration: 300,
        ease: 'Back.easeOut', // Suavizado tipo "salto"
        yoyo: true, // Volver a escala normal
        onComplete: () => {
          // Fundido al desaparecer
          this.tweens.add({
            targets: this.countdownText,
            alpha: 0, // Fundido a transparente
            duration: 500,
            ease: 'Cubic.easeIn',
            onComplete: () => {
              this.countdownText.destroy(); // Eliminar el texto
              this.pelota.body.setAllowGravity(true); // Activar la gravedad de la pelota
            },
          });
        },
      });
    }
    };

    showNextNumber(); // Iniciar la cuenta atrás
  }

  createPauseMenu() {
    // Fondo del menú de pausa
    this.pauseBackground = this.add.rectangle(360, 240, 720, 480, 0x000000, 0.7).setVisible(false); // Fondo oscuro
    this.pauseBackground.setInteractive();

    // Opciones del menú de pausa
    this.resumeButton = this.add.text(360, 200, 'Reanudar', {
      fontFamily: 'Freckle Face',
      fontSize: '32px',
      color: '#FFFFFF'
    }).setOrigin(0.5).setInteractive();
    this.resumeButton.on('pointerdown', () => {
      this.resumeGame();
    });

    this.quitButton = this.add.text(360, 250, 'Salir', {
      fontFamily: 'Freckle Face',
      fontSize: '32px',
      color: '#FFFFFF'
    }).setOrigin(0.5).setInteractive();
    this.quitButton.on('pointerdown', () => {
      this.scene.start("MainMenuScene");
    });

    // Crear el botón de reiniciar en el menú de pausa
    this.restartButton = this.add.text(360, 300, 'Reiniciar', {
      fontFamily: 'Freckle Face',
      fontSize: '32px',
      color: '#FFFFFF'
    }).setOrigin(0.5).setInteractive();
    this.restartButton.on('pointerdown', () => {
      this.restartGame(); // Llamar a la función de reinicio
    });

    // Asegurarse de que el menú esté oculto al principio
    this.pauseMenuGroup = this.add.group([this.pauseBackground, this.resumeButton, this.quitButton, this.restartButton]);
    this.pauseMenuGroup.setVisible(false);
  }

  // Función para pausar el juego
  pauseGame() {
    this.physics.world.pause(); // Pausa la física
    this.time.paused = true; // Pausa el tiempo
    this.isPaused = true; // Cambiar estado de pausa

    // Mostrar el menú de pausa
    this.pauseMenuGroup.setVisible(true);
    this.pauseBackground.setVisible(true);
  }

  // Función para reanudar el juego
  resumeGame() {
    this.physics.world.resume(); // Reanudar las físicas
    this.time.paused = false; // Reanudar el tiempo
    this.isPaused = false; // Cambiar el estado de pausa
  
    // Ocultar el menú de pausa
    this.pauseMenuGroup.setVisible(false);
    this.pauseBackground.setVisible(false);
  }  

  // Función para reiniciar el juego
  restartGame() {
    // Ocultar el menú de pausa y el fondo
    this.pauseMenuGroup.setVisible(false);
    this.pauseBackground.setVisible(false);
  
    // Reiniciar la escena sin mantener nada del estado anterior
    this.scene.restart({
      puntuacion: 0
    });
    this.resumeGame();
  }

  fadeToBlack(callback) {
    this.tweens.add({
      targets: this.fundido,
      alpha: 1, // Opaco
      duration: 200,
      ease: 'Cubic.easeInOut',
      onComplete: callback // Ejecutar callback al terminar
    });
  }

  fadeFromBlack() {
    this.fundido.setAlpha(1);
    this.tweens.add({
      targets: this.fundido,
      alpha: 0, // Transparente
      duration: 200,
      ease: 'Cubic.easeInOut'
    });
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

    // Aplicar la fuerza al golpe (por tipo) (ESCALADO SEGÚN ASPECT RATIO)
    const fuerzaX = direccionX * (tipoGolpe === "fuerte" ? 1000 : 300); // Dependiendo de si es fuerte o normal
    const fuerzaY = (tipoGolpe === "fuerte" ? -200 : -350);

    // Establecer la velocidad de la pelota
    pelota.setVelocity(fuerzaX, fuerzaY);

    // Actualizar puntuación
    if (tipoGolpe === "normal") {
      this.puntuacion += 1;
    } else if (tipoGolpe === "fuerte") {
      this.puntuacion += 2;
    }

    // Actualizar el texto de puntuación en pantalla
    this.puntajeTexto.setText(`Puntuación: \n${this.puntuacion}`);
  }

  handlePelotaToqueSuelo() {
    this.fadeToBlack(() => {
      // Cambiar a la escena GameOverScene y pasar la puntuación
      this.scene.start('GameOverScene', { puntuacion: this.puntuacion });
    });
  }

  update() {
    // Pausar o reanudar el juego si se presiona la tecla ESC
    if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
      if (this.isPaused) {
        this.resumeGame();
      } else {
        this.pauseGame();
      }
    }

    if (this.isPaused) return; // Si el juego está pausado, no procesamos más.

    const speed = 200;
    const jumpForce = 330;

    // Movimiento y colisión foca 1
    this.moveFoca(this.foca1, this.aKey, this.dKey, this.wKey, this.eKey, this.rKey, speed, jumpForce);

    // Movimiento y colisión foca 2
    this.moveFoca(this.foca2, this.cursors.left, this.cursors.right, this.cursors.up, this.oKey, this.pKey, speed, jumpForce);
  }

  moveFoca(foca, leftKey, rightKey, jumpKey, normalHitKey, strongHitKey, speed, jumpForce) { // Movimiento horizontal
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

export default GameScene2;

