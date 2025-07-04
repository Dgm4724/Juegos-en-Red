
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }
    init(data = null) {
        if(data && data.userlogText) {
            this.userlogText = data.userlogText;
            localStorage.setItem('userlogText', this.userlogText); // guardar sesión
        } else {
            this.userlogText = localStorage.getItem('userlogText');
        }
        console.log("Usuario logueado:", this.userlogText);
    }

    
    create() {
        this.chatBox = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('chat-input');
        this.userlog = document.getElementById('userlog');
        if(this.userlogText !== undefined && this.userlogText !== null)
        {
            this.userlog.innerHTML = `Has iniciado sesión como ${this.userlogText}`;
        }

        if (this.registry.get('lastTimestamp') == undefined){ // Track the last fetched timestamp
        this.registry.set('lastTimestamp' , 0);
        }

        // Base URL dynamically derived from the current browser location
        this.baseUrl = `${window.location.origin}/chat`;

        // Verifica si la música ya existe y está sonando
        const existingMusic = this.sound.get('bgMenuMusic');

        if (!existingMusic) {
            // Si no existe, la creamos y la reproducimos
            const bgMenuMusic = this.sound.add('bgMenuMusic', {
            loop: true,
            volume: 0.5
            });
            bgMenuMusic.play();

            // Marcarla como persistente entre escenas
            this.sys.game.bgMenuMusic = bgMenuMusic;
        } else if (!existingMusic.isPlaying) {
            // Si existe pero está detenida, la reproducimos
            existingMusic.play();
        }

        // Mostrar chat
        document.getElementById("chat").style.display = "block";
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Fondo
        this.add.image(360, 240, "fondoGenerico");

        // Interfaz título
        this.interfaz = this.add.image(360, 240, "interfazMainMenu");
        this.interfaz.setScale(1.25);

        // Sonido botón
        this.buttonOverSound = this.sound.add("buttonOver");
        this.buttonOnSound = this.sound.add("buttonOn");

        // Botón Jugar
        this.botonPlay = this.add.image(360, 255, "botonPlay").setInteractive();
        this.botonPlay.setScale(1.5);

        this.botonPlay.on('pointerover', () => {
            this.botonPlay.setScale(1.07 * 1.5);
            this.botonPlay.setTint(0xd0ff8d);
            this.buttonOverSound.play({volume: 0.5});
        });

        this.botonPlay.on('pointerout', () => {
            this.botonPlay.setScale(1.5); // Restaurar el tamaño original
            this.botonPlay.clearTint(); // Eliminar el tinte
        });

        this.botonPlay.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.buttonOnSound.play({volume: 0.5});
                this.scene.start("LevelSelectorScene", { userlogText: this.userlogText });
            });
        });

        // Botón Login o Logout
        this.botonL = this.add.image(600, 40, "boton").setInteractive();
        this.botonL.setScale(0.8, 0.7);
        this.Ltxt = this.add.text(600, 40, "", {
            fontFamily: "Barrio",
            fontSize: "18px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.Ltxt.setText(this.userlogText ? "Cerrar Sesión" : "Iniciar Sesión");

        this.botonL.on('pointerover', () => {
            this.botonL.setScale(0.85, 0.75);
            this.buttonOverSound.play({volume: 0.5});
            this.botonL.setTint(0xffdca1);
            this.Ltxt.setFontSize(20);
        });
        this.botonL.on('pointerout', () => {
            this.botonL.setScale(0.8, 0.7);
            this.botonL.clearTint();
            this.Ltxt.setFontSize(18);
        });

        this.botonL.on("pointerdown", () => {
            this.buttonOnSound.play({volume: 0.5});
            if (this.userlogText) {
                this.showLogoutConfirm();
            } else {
                // Ir a login
                this.scene.start("LoginScene");
            }
        });

        // Botón Ajustes
        this.botonA = this.add.image(360, 345, "boton").setInteractive();
        this.botonA.setScale(1, 0.8);
        this.Atxt = this.add.text(360, 345, "Ajustes", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonA.on('pointerover', () => {
            this.buttonOverSound.play({volume: 0.5});
            this.botonA.setScale(1.05, 1.05 * 0.8);
            this.botonA.setTint(0xffdca1);
            this.Atxt.setFontSize(26);
        });
        this.botonA.on('pointerout', () => {
            this.botonA.setScale(1, 0.8); // Restaurar el tamaño original
            this.botonA.clearTint(); // Eliminar el tinte
            this.Atxt.setFontSize(23);
        });
        this.botonA.on("pointerdown", () => {
            this.buttonOnSound.play({volume: 0.5});
        });

        // Botón Créditos
        this.botonC = this.add.image(360, 400, "boton").setInteractive();
        this.botonC.setScale(1, 0.8);
        this.Ctxt = this.add.text(360, 400, "Créditos", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);

        this.botonC.on('pointerover', () => {
            this.buttonOverSound.play({volume: 0.5});
            this.botonC.setScale(1.05, 1.05 * 0.8);
            this.botonC.setTint(0xffdca1);
            this.Ctxt.setFontSize(26);
        });
        this.botonC.on('pointerout', () => {
            this.botonC.setScale(1, 0.8); // Restaurar el tamaño original
            this.botonC.clearTint(); // Eliminar el tinte
            this.Ctxt.setFontSize(23);
        });
        this.botonC.on("pointerdown", () => {
            this.fadeToBlack(() => {
                this.buttonOnSound.play({volume: 0.5});
                this.scene.start("CreditsScene");
            });
        });

        // Texto animado
        this.jugarTexto = this.add.text(360, 175, "¡Haz clic en el botón verde para empezar a jugar!", {
            fontFamily: "Freckle Face",
            fontSize: "20px",
            color: "#000000",
        }).setOrigin(0.5);

        // Comienza la animación de escalado en secuencia
        this.startTextAnimation();

        // Texto conexión
        this.connectionText = this.add.text(360, 450, "HAS PERDIDO LA CONEXIÓN", {
            fontFamily: "Barrio",
            fontSize: "50px",
            fontStyle: "Bold",
            color: "#b0202b",
        }).setOrigin(0.5);
        this.connectionText.setVisible(false);

        // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
        this.fundido = this.add.rectangle(720 / 2, 480 / 2, 720, 480, 'black', 1);

        this.fadeFromBlack();
        // Fetch messages initially and poll every 2 seconds
        this.fetchMessages();
        setInterval(() => this.fetchMessages(), 2000);
    }

    // Animación del texto (rotación y escalado por separado)
    startTextAnimation() {
        // Rotación a un lado
        this.tweens.add({
            targets: this.jugarTexto,
            scale: 0.97, // Escala sutil
            duration: 750,
            ease: 'Sine.easeInOut',
            yoyo: true, // Regresa al tamaño original
            onComplete: () => {
                // Llamamos de nuevo a la animación para que sea cíclica
                this.startTextAnimation();
            }
        });
    }

    // Fundido a negro
    fadeToBlack(callback) {
        this.tweens.add({
            targets: this.fundido,
            alpha: 1, // Opaco
            duration: 200,
            ease: 'Cubic.easeInOut',
            onComplete: callback // Ejecutar callback al terminar
        });
    }

    // Desvanecimiento desde negro
    fadeFromBlack() {
        this.fundido.setAlpha(1);
        this.tweens.add({
            targets: this.fundido,
            alpha: 0, // Transparente
            duration: 200,
            ease: 'Cubic.easeInOut'
        });
    }  

    // Fetch messages from the server
    fetchMessages() {
        fetch(`${this.baseUrl}?since=${this.registry.get('lastTimestamp')}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
            if (data.messages && data.messages.length > 0) {
                data.messages.forEach(msg => {
                    this.chatBox.innerHTML += `<div>${msg}</div>`;
                });
                this.chatBox.scrollTop = this.chatBox.scrollHeight;
                this.registry.set('lastTimestamp', data.timestamp);
            }
            this.registry.set('connection', true);
        })
        .catch(() => {
        this.registry.set('connection', false);
        });
    }

    // Send a new message to the server
    sendMessage() {
        let mes = this.messageInput.value;
        if (!mes) return;
        if(this.userlogText == undefined && this.userlogText == null) return;
        let m = `${this.userlogText} : ${mes}`

        fetch(this.baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        message: m.trim()
        })
        }).then(() => {
            this.messageInput.value = '';
            this.fetchMessages();
        });

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.enterKey) && this.messageInput.value !== '') {
            this.sendMessage();
        }
        // MOSTRAR ESTADO DE LA CONEXIÓN
        this.connectionText.setVisible(this.registry.get('connection') === false);
    }

    showLogoutConfirm() {
        // Fondo semi-transparente
        this.popupBg = this.add.rectangle(360, 240, 720, 480, 0x000000, 0.7).setDepth(10);

        // Caja del popup
        this.popupBox = this.add.rectangle(360, 240, 300, 150, 0xffffff, 1).setDepth(11).setStrokeStyle(2, 0x000000);

        // Texto de confirmación
        this.popupText = this.add.text(360, 200, "¿Seguro que quieres cerrar sesión?", {
            fontFamily: "Barrio",
            fontSize: "20px",
            color: "#000000",
            align: "center",
            wordWrap: { width: 280 }
        }).setOrigin(0.5).setDepth(12);

        // Botón Sí
        this.btnYes = this.add.image(300, 270, "boton").setInteractive().setDepth(12);
        this.btnYes.setScale(0.4, 0.7);
        this.btnYesText = this.add.text(300, 270, "Sí", {
            fontFamily: "Barrio",
            fontSize: "18px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5).setDepth(13);

        // Botón No
        this.btnNo = this.add.image(420, 270, "boton").setInteractive().setDepth(12);
        this.btnNo.setScale(0.4, 0.7);
        this.btnNoText = this.add.text(420, 270, "No", {
            fontFamily: "Barrio",
            fontSize: "18px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5).setDepth(13);

        // Acción botón Sí: cerrar sesión y remover popup
        this.btnYes.on('pointerover', () => {
            this.btnYes.setTint(0xffdca1);
            this.btnYes.setScale(0.4 * 1.05, 0.7 * 1.01);
            this.buttonOverSound.play({volume: 0.5});
        });
        this.btnYes.on('pointerout', () => {
            this.btnYes.clearTint();
            this.btnYes.setScale(0.4, 0.7);
        });

        this.btnYes.on('pointerdown', () => {
            this.buttonOnSound.play({volume: 0.5});
            localStorage.removeItem('userlogText'); // borrar sesión
            this.userlogText = null;
            this.userlog.innerHTML = '';
            this.cleanupPopup();
            location.reload();
        });

        // Acción botón No: sólo quitar popup y mantener sesión
        this.btnNo.on('pointerover', () => {
            this.btnNo.setTint(0xffdca1);
            this.btnNo.setScale(0.4 * 1.05, 0.7 * 1.01);
            this.buttonOverSound.play({volume: 0.5});
        });
        this.btnNo.on('pointerout', () => {
            this.btnNo.clearTint();
            this.btnNo.setScale(0.4, 0.7);
        });

        this.btnNo.on('pointerdown', () => {
            this.buttonOnSound.play({volume: 0.5});
            this.cleanupPopup();
        });
    }

    // Método para limpiar el popup de la escena
    cleanupPopup() {
        this.popupBg.destroy();
        this.popupBox.destroy();
        this.popupText.destroy();
        this.btnYes.destroy();
        this.btnNo.destroy();
    }
}

export default MainMenuScene;
