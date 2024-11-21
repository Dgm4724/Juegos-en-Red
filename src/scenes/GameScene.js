export default class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }

    create() {
      const { width, height } = this.scale;

      // Pelota
      this.ball = this.physics.add.sprite(width / 2, height / 2, 'ball');
      this.ball.setVelocity(200, 200);
      this.ball.setBounce(1, 1);
      this.ball.setCollideWorldBounds(true);

      // Palas (Focas)
      this.paddle1 = this.physics.add.sprite(50, height / 2, 'foca');
      this.paddle2 = this.physics.add.sprite(width - 50, height / 2, 'foca');
      this.paddle1.setImmovable(true);
      this.paddle2.setImmovable(true);

      // Controles
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.wKey = this.input.keyboard.addKey('W');
      this.sKey = this.input.keyboard.addKey('S');

      // Físicas
      this.physics.add.collider(this.ball, this.paddle1, () => this.sound.play('hit'));
      this.physics.add.collider(this.ball, this.paddle2, () => this.sound.play('hit'));

      // Marcadores
      this.score1 = 0;
      this.score2 = 0;
      this.scoreText = this.add.text(width / 2, 50, '0 - 0', {
        font: '24px Arial',
        color: '#ffffff',
      }).setOrigin(0.5);
    }

    update() {
      // Movimiento de las palas
      if (this.wKey.isDown) this.paddle1.y -= 5;
      if (this.sKey.isDown) this.paddle1.y += 5;
      if (this.cursorKeys.up.isDown) this.paddle2.y -= 5;
      if (this.cursorKeys.down.isDown) this.paddle2.y += 5;

      // Comprobar anotaciones
      if (this.ball.x < 0) {
        this.score2 += 1;
        this.resetBall();
      } else if (this.ball.x > this.scale.width) {
        this.score1 += 1;
        this.resetBall();
      }

      this.scoreText.setText(`${this.score1} - ${this.score2}`);
    }

    resetBall() {
      this.ball.setPosition(this.scale.width / 2, this.scale.height / 2);
      this.ball.setVelocity(200, 200 * (Math.random() > 0.5 ? 1 : -1));
      this.sound.play('score');
    }
  }
