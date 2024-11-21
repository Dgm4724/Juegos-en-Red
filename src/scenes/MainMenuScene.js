export default class MainMenuScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainMenuScene' });
    }

    create() {
      const { width, height } = this.scale;

      this.add.text(width / 2, height / 2 - 50, 'Juego de Focas', {
        font: '32px Arial',
        color: '#ffffff',
      }).setOrigin(0.5);

      this.add.text(width / 2, height / 2, 'Presiona ESPACIO para Jugar', {
        font: '24px Arial',
        color: '#ffffff',
      }).setOrigin(0.5);

      this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('GameScene');
      });
    }
  }
