class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: "SettingsScene" });
    }

    create () {
        // Música fondo
        const existingMusic = this.sound.get('bgMenuMusic');
        if (!existingMusic) {
            const bgMenuMusic = this.sound.add('bgMenuMusic', { loop: true, volume: 0.5 });
            bgMenuMusic.play();
            this.sys.game.bgMenuMusic = bgMenuMusic;
        } else if (!existingMusic.isPlaying) {
            existingMusic.play();
        }

        document.getElementById("chat").style.display = "none";

        this.add.image(360, 240, "fondoGenericoAzul");
        this.interfaz = this.add.image(360, 240, "interfazMainMenu").setScale(1.25);

        this.botonMenu = this.add.image(550, 400, "backButton").setInteractive();
        this.botonMenu.on('pointerover', () => {
            this.botonMenu.setScale(1.09).setTint(0xd9bfff);
        });
        this.botonMenu.on('pointerout', () => {
            this.botonMenu.setScale(1).clearTint();
        });
        this.botonMenu.on("pointerdown", () => {
            this.scene.start("MainMenuScene");
        });

        this.buttonOverSound = this.sound.add("buttonOver");
        this.buttonOnSound = this.sound.add("buttonOn");

        this.add.text(100, 50, 'AJUSTES', { fontSize: '32px', fill: '#fff', fontFamily: 'Barrio' });

        // Fondo slider
        this.sliderBar = this.add.rectangle(360, 240, 200, 10, 0x888888).setOrigin(0.5);

        // Control deslizable (knob)
        this.sliderKnob = this.add.circle(360, 240, 15, 0xffffff).setInteractive();

        // Volumen inicial
        this.volume = this.registry.get('volume') ?? 0.5;

        // Posición knob según volumen
        this.updateKnobPosition();

        // Texto que muestra el volumen actual
        this.volumeText = this.add.text(360, 270, `Volumen: ${(this.volume*100).toFixed(0)}%`, {
            fontFamily: "Barrio",
            fontSize: "20px",
            color: "#fff"
        }).setOrigin(0.5);

        // Input drag para knob
        this.input.setDraggable(this.sliderKnob);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.sliderKnob) {
                // Limitar movimiento X dentro de la barra (de 260 a 460)
                const minX = 260;
                const maxX = 460;
                if (dragX < minX) dragX = minX;
                if (dragX > maxX) dragX = maxX;

                gameObject.x = dragX;
                // Actualizar volumen según posición
                this.volume = (dragX - minX) / (maxX - minX);
                this.updateVolume();
            }
        });

        // También permite hacer click directo en la barra para mover el knob
        this.sliderBar.setInteractive();
        this.sliderBar.on('pointerdown', (pointer) => {
            const minX = 260;
            const maxX = 460;
            let x = Phaser.Math.Clamp(pointer.x, minX, maxX);
            this.sliderKnob.x = x;
            this.volume = (x - minX) / (maxX - minX);
            this.updateVolume();
        });

        // Texto conexión (si quieres mantenerlo)
        this.connectionText = this.add.text(360, 450, "HAS PERDIDO LA CONEXIÓN", {
            fontFamily: "Barrio",
            fontSize: "50px",
            fontStyle: "Bold",
            color: "#b0202b",
        }).setOrigin(0.5);
        this.connectionText.setVisible(false);

        this.fundido = this.add.rectangle(360, 240, 720, 480, 0x000000, 1);
        this.fadeFromBlack();
    }

    updateVolume() {
        // Actualiza texto volumen
        this.volumeText.setText(`Volumen: ${(this.volume*100).toFixed(0)}%`);

        // Actualiza volumen música bg si existe
        const bgMenuMusic = this.sound.get('bgMenuMusic');
        if (bgMenuMusic) {
            bgMenuMusic.setVolume(this.volume);
        }

        // Guarda el volumen en el registry para otras escenas
        this.registry.set('volume', this.volume);
    }

    updateKnobPosition() {
        // Posición X knob según volumen
        const minX = 260;
        const maxX = 460;
        this.sliderKnob.x = minX + this.volume * (maxX - minX);
    }

    fadeFromBlack() {
        this.fundido.setAlpha(1);
        this.tweens.add({
            targets: this.fundido,
            alpha: 0,
            duration: 200,
            ease: 'Cubic.easeInOut'
        });
    }  
    
    update(){
        // Mostrar estado conexión
        this.connectionText.setVisible(this.registry.get('connection') === false);
    }
}

export default SettingsScene;
