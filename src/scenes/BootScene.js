export default class BootScene extends Phaser.Scene {
    constructor() {
      super({ key: 'BootScene' });
    }

    preload() {
      this.load.image('loading', 'assets/images/loading.png');
    }

    create() {
      this.scene.start('PreloadScene');
    }
  }
