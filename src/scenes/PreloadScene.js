export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' });
    }

    preload() {
      this.load.image('foca 1', 'assets/images/seal1.png');
      this.load.image('foca 1', 'assets/images/seal2.png');
    }

    create() {
      this.scene.start('MainMenuScene');
    }
  }
