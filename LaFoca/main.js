const config = {
    type: Phaser.AUTO, // WebGL si está disponible, Canvas como alternativa
    width: 800, // Ancho del juego
    height: 600, // Alto del juego
    physics: {
      default: 'arcade', // Motor físico arcade
      arcade: {
        gravity: { y: 300 }, // Gravedad
        debug: false, // Sin depuración
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  // Crear el juego
  const game = new Phaser.Game(config);

  function preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png'); // Cargar fondo
    this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png'); // Cargar estrella
  }

  function create() {
    this.add.image(400, 300, 'sky'); // Mostrar el fondo
    const star = this.physics.add.image(400, 200, 'star'); // Mostrar estrella
    star.setBounce(0.8); // Rebote
    star.setCollideWorldBounds(true); // Limitar al canvas
  }

  function update() {
    // Lógica del juego (vacía por ahora)
  }
