class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: "LoginScene" });
    }

    create () {

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

        // Ocultar chat
        document.getElementById("chat").style.display = "none";

        // Mostrar inputs
        this.usernameInput = document.getElementById('usernameInput');
        this.usernameInput.style.display = "blocK";
        this.passwordInput = document.getElementById('passwordInput');
        this.passwordInput.style.display = "blocK";

        // Fondo
        this.add.image(360, 240, "fondoGenericoAzul");

        // Interfaz título
        this.interfaz = this.add.image(360, 240, "interfazMainMenu");
        this.interfaz.setScale(1.25);

          // Botón para volver al menu principal
        this.botonMenu = this.add.image(550, 400, "backButton").setInteractive();

        this.botonMenu.on('pointerover', () => {
        this.botonMenu.setScale(1.09);
        this.botonMenu.setTint(0xd9bfff);
        });
        this.botonMenu.on('pointerout', () => {
        this.botonMenu.setScale(1); // Restaurar el tamaño original
        this.botonMenu.clearTint(); // Eliminar el tinte
        });
        this.botonMenu.on("pointerdown", () => {
            this.usernameInput.style.display = 'none';
            this.passwordInput.style.display = 'none';
            this.scene.start("MainMenuScene");
        });

        // Sonido botón
        this.buttonOverSound = this.sound.add("buttonOver");
        this.buttonOnSound = this.sound.add("buttonOn");

        // Sonido botón
        this.buttonOverSound = this.sound.add("buttonOver");
        this.buttonOnSound = this.sound.add("buttonOn");

        // Crear interfaz y botones del LOGIN
        this.add.text(100, 50, 'Login', { fontSize: '32px', fill: '#fff', fontFamily: 'Barrio' });

        this.loginContainer = this.add.image(355, 200, "cartelLogin");
        this.loginContainer.setScale(3, 3);

        this.registerButton = this.add.image(280, 340, "boton").setInteractive();
        this.registerButton.setScale(1, 0.8);
        this.registerButton.setScale(0.7, 0.6);
        this.registertxt = this.add.text(280, 340, 'REGISTRARSE', {fontFamily: "Barrio", fontSize: "18px", fontStyle: "Bold", color: "#000000"}).setOrigin(0.5);
        this.registerButton.on('pointerover', () => {
            this.registerButton.setScale(0.8, 0.7);
            this.buttonOverSound.play({volume: 0.5});
            this.registerButton.setTint(0xffdca1);
            this.registertxt.setFontSize(20);
        });
        this.registerButton.on('pointerout', () => {
            this.registerButton.setScale(0.7, 0.6); // Restaurar el tamaño original
            this.registerButton.clearTint(); // Eliminar el tinte
            this.registertxt.setFontSize(18);
        });

        this.loginButton = this.add.image(435, 340, "boton").setInteractive();
        this.loginButton.setScale(1, 0.8);;
        this.loginButton.setScale(0.7, 0.6);
        this.logintxt = this.add.text(435, 340, 'INICIAR SESIÓN', {fontFamily: "Barrio", fontSize: "18px", fontStyle: "Bold", color: "#000000"}).setOrigin(0.5);
        this.loginButton.on('pointerover', () => {
            this.loginButton.setScale(0.8, 0.7);
            this.buttonOverSound.play({volume: 0.5});
            this.loginButton.setTint(0xffdca1);
            this.logintxt.setFontSize(20);
        });
        this.loginButton.on('pointerout', () => {
            this.loginButton.setScale(0.7, 0.6); // Restaurar el tamaño original
            this.loginButton.clearTint(); // Eliminar el tinte
            this.logintxt.setFontSize(18);
        });

        this.createLoginForm();

        // RECTÁNGULO NEGRO PARA LOS FUNDIDOS
        this.fundido = this.add.rectangle(720 / 2, 480 / 2, 720, 480, 'black', 1);

        this.fadeFromBlack();
    }

    createLoginForm() {
        // Evento de registro
        this.registerUrl = `${window.location.origin}/users/register`;

        this.registerButton.on('pointerdown', () => {
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();
        if (username !== "" && password !== "") {
            this.usernameInput.value = "";
            this.passwordInput.value = "";
                const userData = {
                username: username,
                password: password,
                score: 0
                };

            fetch(this.registerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
            })
            .then(response => {
                if (response.ok) {
                    return response.text(); // El backend devuelve un String plano
                } else {
                    return response.text().then(err => {
                        throw new Error(err); // Captura mensaje de error del servidor
                    });
                }
            })
            .then(msg => {
                console.log("Registro exitoso:", msg);
                this.usernameInput.style.display = 'none';
                this.passwordInput.style.display = 'none';
                this.scene.start('MainMenuScene', { userlogText: username });
            })
            .catch(err => {
                console.error("Error durante el registro:", err.message);
                this.errorRegisterText = this.add.text(360, 300, `${err.message}`, {fontFamily: "Freckle Face", fontSize: "20px", fontStyle: "Bold", color: "#000000"}).setOrigin(0.5);
                if(this.errorLoginText){
                    this.errorLoginText.destroy();
                }
            });
        }
        });

        // Evento de login
        this.loginUrl = `${window.location.origin}/users/login`;

        this.loginButton.on('pointerdown', () => {
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();
        if (username !== "" && password !== "") {
            this.usernameInput.value = "";
            this.passwordInput.value = "";
                const userData = {
                username: username,
                password: password,
                score: 0
                };

            fetch(this.loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
            })
            .then(response => {
                if (response.ok) {
                    return response.text(); // El backend devuelve un String plano
                } else {
                    return response.text().then(err => {
                        throw new Error(err); // Captura mensaje de error del servidor
                    });
                }
            })
            .then(msg => {
                console.log("Inicio de sesión exitoso:", msg);
                this.usernameInput.style.display = 'none';
                this.passwordInput.style.display = 'none';
                this.scene.start('MainMenuScene', { userlogText: username });
            })
            .catch(err => {
                console.error("Error durante el inicio de sesión:", err.message);
                this.errorLoginText = this.add.text(370, 300, `${err.message}`, {fontFamily: "Freckle Face", fontSize: "20px", fontStyle: "Bold", color: "#b0202b"}).setOrigin(0.5);
                if(this.errorRegisterText){
                    this.errorRegisterText.destroy();
                }
            });
        }
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
        // this.add.image(400, 300, 'pic');

        // const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        // const element = this.add.dom(400, 600).createFromCache('nameform');

        // element.setPerspective(800);
        // element.addListener('click');

        // element.on('click', function (event)
        // {

        //     if (event.target.name === 'loginButton')
        //     {
        //         const inputUsername = this.getChildByName('username');
        //         const inputPassword = this.getChildByName('password');

        //         //  Have they entered anything?
        //         if (inputUsername.value !== '' && inputPassword.value !== '')
        //         {
        //             //  Turn off the click events
        //             this.removeListener('click');

        //             //  Tween the login form out
        //             this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

        //             this.scene.tweens.add({
        //                 targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
        //                 onComplete: function ()
        //                 {
        //                     element.setVisible(false);
        //                 }
        //             });

        //             //  Populate the text with whatever they typed in as the username!
        //             text.setText(`Welcome ${inputUsername.value}`);
        //         }
        //         else
        //         {
        //             //  Flash the prompt
        //             this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
        //         }
        //     }

        // });

        // this.tweens.add({
        //     targets: element,
        //     y: 300,
        //     duration: 3000,
        //     ease: 'Power3'
        // });
    //}
}

export default LoginScene;