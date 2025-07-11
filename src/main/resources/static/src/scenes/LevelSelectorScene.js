class LevelSelectorScene extends Phaser.Scene {
    constructor() {
        super({ key: "LevelSelectorScene" });
    }
    init(data = null) {
        this.userlogText = data.userlogText;
        console.log("Usuario logueado:", this.userlogText);
    }

    create() {
        // CHAT
        this.chatBox = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('chat-input');

        // Base URL dynamically derived from the current browser location
        this.baseUrl = `${window.location.origin}/chat`;

        // Mostrar chat
        document.getElementById("chat").style.display = "block";
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        if (this.registry.get('lastTimestamp') == undefined){ // Track the last fetched timestamp
        this.registry.set('lastTimestamp' , 0);
        }

        // factores de escala
        this.widthRatio = this.scale.width / 720;
        this.heightRatio = this.scale.height / 480;

        // Fondo
        this.add.image(360, 240, "fondoGenerico");

        // SELECCIONA EL NIVEL
        this.nextLvl = undefined;

        this.add.text(350, 60, "SELECCIONA EL NIVEL :", {
            fontSize: "50px",
            fontFamily: "Barrio",
            color: "#fad461",
        }).setOrigin(0.5);

        this.MIN1 = this.add.image(720/5, 480/2.5, "miniatura1").setInteractive();
        this.MIN1.setScale(0.25);
        this.MIN1.setTint(0x7b7b7b);
        this.MIN1.on('pointerover', () => {
            if(this.nextLvl != 0 || this.nextLvl == undefined){
                this.MIN1.setScale(1.05*0.25);
                this.MIN1.setTint(0xa8a8a8);
            }
        });
        this.MIN1.on('pointerout', () => {
            if(this.nextLvl != 0 || this.nextLvl == undefined){
                this.MIN1.setScale(0.25); // Restaurar el tamaño original
                this.MIN1.setTint(0x7b7b7b);
            }
        });
        this.MIN1.on("pointerdown", () => {
            this.MIN1.clearTint();
            this.MIN1.setScale(1.1*0.25);
            this.nextLvl = 0;

            this.MIN2.emit('pointerout');
            this.MIN3.emit('pointerout');
            if(this.selectedChar != undefined){
                this.botonCP.emit('pointerout');
            }
        });

        this.MIN2 = this.add.image(720/2, 480/2.5, "miniatura2").setInteractive();
        this.MIN2.setScale(0.25);
        this.MIN2.setTint(0x7b7b7b);
        this.MIN2.on('pointerover', () => {
            if(this.nextLvl != 1 || this.nextLvl == undefined){
                this.MIN2.setScale(1.05*0.25);
                this.MIN2.setTint(0xa8a8a8);
            }
        });
        this.MIN2.on('pointerout', () => {
            if(this.nextLvl != 1 || this.nextLvl == undefined){
                this.MIN2.setScale(0.25); // Restaurar el tamaño original
                this.MIN2.setTint(0x7b7b7b);
            }
        });
        this.MIN2.on("pointerdown", () => {
            this.MIN2.clearTint();
            this.MIN2.setScale(1.1*0.25);
            this.nextLvl = 1;

            this.MIN1.emit('pointerout');
            this.MIN3.emit('pointerout');
            if(this.selectedChar != undefined){
                this.botonCP.emit('pointerout');
            }
        });

        this.MIN3 = this.add.image(720/5*4, 480/2.5, "miniatura3").setInteractive();
        this.MIN3.setScale(0.25);
        this.MIN3.setTint(0x7b7b7b);
        this.MIN3.on('pointerover', () => {
            if(this.nextLvl != 2 || this.nextLvl == undefined){
                this.MIN3.setScale(1.05*0.25);
                this.MIN3.setTint(0xa8a8a8);
            }
        });
        this.MIN3.on('pointerout', () => {
            if(this.nextLvl != 2 || this.nextLvl == undefined){
                this.MIN3.setScale(0.25); // Restaurar el tamaño original
                this.MIN3.setTint(0x7b7b7b);
            }
        });
        this.MIN3.on("pointerdown", () => {
            this.MIN3.clearTint();
            this.MIN3.setScale(1.1*0.25);
            this.nextLvl = 2;
            
            this.MIN2.emit('pointerout');
            this.MIN1.emit('pointerout');
            if(this.selectedChar != undefined){
                this.botonCP.emit('pointerout');
            }
        });

        // SELECCIONA EL PERSONAJE
        this.selectedChar = undefined;

        this.add.text(180, 330, "SELECCIONA EL PERSONAJE :", {
            fontSize: "20px",
            fontFamily: "Barrio",
            color: "#dba43d",
        }).setOrigin(0.5);

        this.focaRosa = this.add.image(130, 390, "focaRosa").setInteractive();
        this.focaRosa.setTint(0x7b7b7b);
        this.focaRosa.on('pointerover', () => {
            if(this.selectedChar != 0 || this.selectedChar == undefined){
                this.focaRosa.setScale(1.05);
                this.focaRosa.setTint(0xa8a8a8);
            }
        });
        this.focaRosa.on('pointerout', () => {
            if(this.selectedChar != 0 || this.selectedChar == undefined){
                this.focaRosa.setScale(1); // Restaurar el tamaño original
                this.focaRosa.setTint(0x7b7b7b);
            }
        });
        this.focaRosa.on("pointerdown", () => {
            this.focaRosa.clearTint();
            this.focaRosa.setScale(1.1);
            this.selectedChar = 0;
            
            this.focaAzul.emit('pointerout');
            if(this.nextLvl != undefined){
                this.botonCP.emit('pointerout');
            }
        });

        this.focaAzul = this.add.image(230, 390, "focaAzul").setInteractive();
        this.focaAzul.setTint(0x7b7b7b);
        this.focaAzul.on('pointerover', () => {
            if(this.selectedChar != 1 || this.selectedChar == undefined){
                this.focaAzul.setScale(1.05);
                this.focaAzul.setTint(0xa8a8a8);
            }
        });
        this.focaAzul.on('pointerout', () => {
            if(this.selectedChar != 1 || this.selectedChar == undefined){
                this.focaAzul.setScale(1); // Restaurar el tamaño original
                this.focaAzul.setTint(0x7b7b7b);
            }
        });
        this.focaAzul.on("pointerdown", () => {
            this.focaAzul.clearTint();
            this.focaAzul.setScale(1.1);
            this.selectedChar = 1;
            
            this.focaRosa.emit('pointerout');
            if(this.nextLvl != undefined){
                this.botonCP.emit('pointerout');
            }
        });

        // Botón CREAR partida
        this.botonCP = this.add.image(500, 390, "boton").setInteractive();
        this.botonCP.setScale(1, 0.8);
        this.botonCP.setTint(0x7b7b7b);
        this.CPtxt = this.add.text(500, 390, "Crear partida", {
            fontFamily: "Barrio",
            fontSize: "23px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);
        
        this.botonCP.on('pointerover', () => {
            if(this.nextLvl != undefined && this.selectedChar != undefined){
                this.botonCP.setScale(1.05, 1.05*0.8);
                this.botonCP.setTint(0xffdca1);
                this.CPtxt.setFontSize(26);
            }
        });
        this.botonCP.on('pointerout', () => {
            if(this.nextLvl != undefined && this.selectedChar != undefined){
                this.botonCP.setScale(1, 0.8); // Restaurar el tamaño original
                this.botonCP.clearTint(); // Eliminar el tinte
                this.CPtxt.setFontSize(23);
            }
        });
        this.botonCP.on("pointerdown", () => {
            if(this.nextLvl != undefined && this.selectedChar != undefined){
                switch (this.nextLvl){
                    case 0 :
                        if(this.waitingTxt === undefined || !this.waitingTxt.visible){
                            this.waitingTxt = this.add.text(490, 350, "Buscando contrincante...", {
                            fontFamily: "Freckle Face",
                            fontSize: "19px",
                            fontStyle: "Bold",
                            color: "#000000",
                        }).setOrigin(0.5);
                        }
                        this.waitingGame("create","GameScene");
                        break;
                    case 1 :
                        if(this.waitingTxt === undefined || !this.waitingTxt.visible){
                            this.waitingTxt = this.add.text(490, 350, "Buscando contrincante...", {
                            fontFamily: "Freckle Face",
                            fontSize: "19px",
                            fontStyle: "Bold",
                            color: "#000000",
                        }).setOrigin(0.5);
                        }
                        this.waitingGame("create","GameScene2");
                        break;
                    case 2 :
                        break;

                }
            }
        });

        // Botón UNIRSE a partida
        this.botonUP = this.add.image(500, 440, "boton").setInteractive();
        this.botonUP.setScale(1, 0.8);
        this.UPtxt = this.add.text(500, 440, "Unirse a partida", {
            fontFamily: "Barrio",
            fontSize: "22px",
            fontStyle: "Bold",
            color: "#000000",
        }).setOrigin(0.5);
        
        this.botonUP.on('pointerover', () => {
            this.botonUP.setScale(1.05, 1.05*0.8);
            this.botonUP.setTint(0xffdca1);
            this.UPtxt.setFontSize(25);
        });
        this.botonUP.on('pointerout', () => {
            this.botonUP.setScale(1, 0.8); // Restaurar el tamaño original
            this.botonUP.clearTint(); // Eliminar el tinte
            this.UPtxt.setFontSize(22);
        });
        this.botonUP.on("pointerdown", () => {
            if(this.waitingTxt === undefined || !this.waitingTxt.visible){
                this.waitingTxt = this.add.text(490, 350, "Buscando contrincante...", {
                    fontFamily: "Freckle Face",
                    fontSize: "19px",
                    fontStyle: "Bold",
                    color: "#000000",
                }).setOrigin(0.5);
            }
            this.waitingGame("join", "");
        });

        // Botón para volver al menu principal
        this.botonMenu = this.add.image(640, 430, "backButton").setInteractive();
        this.botonMenu.setTint(0xffe47b);

        this.botonMenu.on('pointerover', () => {
            this.botonMenu.setScale(1.09);
            this.botonMenu.setTint(0xffd42f);
        });

        this.botonMenu.on('pointerout', () => {
            this.botonMenu.setScale(1); // Restaurar el tamaño original
            this.botonMenu.setTint(0xffe47b);
        });
        
        this.botonMenu.on("pointerdown", () => {
            this.nextLvl = undefined;
            this.scene.start("MainMenuScene");
        });

        // Texto conexión
        this.connectionText = this.add.text(360, 450, "HAS PERDIDO LA CONEXIÓN", {
            fontFamily: "Barrio",
            fontSize: "50px",
            fontStyle: "Bold",
            color: "#b0202b",
        }).setOrigin(0.5);
        this.connectionText.setVisible(false);
        
        // Fetch messages initially and poll every 2 seconds
        this.fetchMessages();
        setInterval(() => this.fetchMessages(), 2000);
    }

    waitingGame(mode, scene){ // "create" o "join"
        // WEBSOCKETS
        if(this.socket !== undefined) this.socket.close();
        let URI = "ws://" + location.host + `/ws?mode=${mode}`;
        if(mode === "create") URI += `&scene=${scene}&seal=${this.selectedChar}`;
        this.socket = new WebSocket(URI);

        this.socket.onopen = () => {
            console.log("Conectado al servidor");
        };

        this.socket.onmessage = (msg) => {
            const type = msg.data[0];
            const data = msg.data.substring(1);
            console.log(msg);
            switch (type) {
                case "s": // escenario
                const sceneName = JSON.parse(data)[0];
                const playerId = JSON.parse(data)[1];
                const seal = JSON.parse(data)[2];
                this.scene.start(sceneName, {socket: this.socket, playerId: playerId, seal:seal});
                break;
            }
        };
    }

    // Fetch messages from the server
    fetchMessages() {
        fetch(`${this.baseUrl}?since=${this.registry.get('lastTimestamp')}`)
        .then(response => response.json())
        .then(data => {
            if (data.messages && data.messages.length > 0) {
                data.messages.forEach(msg => {
                    this.chatBox.innerHTML += `<div>${msg}</div>`;
                });
                this.chatBox.scrollTop = this.chatBox.scrollHeight;
                this.registry.set('lastTimestamp' , data.timestamp);
            }
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
}

export default LevelSelectorScene;
