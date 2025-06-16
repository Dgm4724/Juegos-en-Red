class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: "LoginScene" });
    }

    create () {
        const existingMusic = this.sound.get('bgMenuMusic');
        if (!existingMusic) {
            const bgMenuMusic = this.sound.add('bgMenuMusic', { loop: true, volume: 0.5 });
            bgMenuMusic.play();
            this.sys.game.bgMenuMusic = bgMenuMusic;
        } else if (!existingMusic.isPlaying) {
            existingMusic.play();
        }

        document.getElementById("chat").style.display = "none";

        this.time.delayedCall(50, () => {
        this.usernameInput = document.getElementById('usernameInput');
        this.passwordInput = document.getElementById('passwordInput');

        if (!this.usernameInput || !this.passwordInput) {
        console.error('Inputs no encontrados en el DOM');
        return;
        }

        this.usernameInput.style.display = 'block';
        this.passwordInput.style.display = 'block';
        });

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
            this.usernameInput.style.display = 'none';
            this.passwordInput.style.display = 'none';
            this.scene.start("MainMenuScene");
        });

        this.buttonOverSound = this.sound.add("buttonOver");
        this.buttonOnSound = this.sound.add("buttonOn");

        this.add.text(100, 50, 'LOGIN', { fontSize: '32px', fill: '#fff', fontFamily: 'Barrio' });

        this.loginContainer = this.add.image(355, 200, "cartelLogin").setScale(3);

        this.registerButton = this.add.image(280, 340, "boton").setInteractive().setScale(0.7, 0.6);
        this.registertxt = this.add.text(280, 340, 'REGISTRARSE', {
            fontFamily: "Barrio", fontSize: "18px", fontStyle: "Bold", color: "#000000"
        }).setOrigin(0.5);
        this.registerButton.on('pointerover', () => {
            this.registerButton.setScale(0.8, 0.7).setTint(0xffdca1);
            this.buttonOverSound.play({ volume: 0.5 });
            this.registertxt.setFontSize(20);
        }).on('pointerout', () => {
            this.registerButton.setScale(0.7, 0.6).clearTint();
            this.registertxt.setFontSize(18);
        });

        this.loginButton = this.add.image(435, 340, "boton").setInteractive().setScale(0.7, 0.6);
        this.logintxt = this.add.text(435, 340, 'INICIAR SESIÓN', {
            fontFamily: "Barrio", fontSize: "18px", fontStyle: "Bold", color: "#000000"
        }).setOrigin(0.5);
        this.loginButton.on('pointerover', () => {
            this.loginButton.setScale(0.8, 0.7).setTint(0xffdca1);
            this.buttonOverSound.play({ volume: 0.5 });
            this.logintxt.setFontSize(20);
        }).on('pointerout', () => {
            this.loginButton.setScale(0.7, 0.6).clearTint();
            this.logintxt.setFontSize(18);
        });

        this.deleteButton = this.add.image(360, 400, "boton").setInteractive().setScale(0.9, 0.6);
        this.deleteTxt = this.add.text(360, 400, 'ELIMINAR CUENTA', {
            fontFamily: "Barrio", fontSize: "18px", fontStyle: "Bold", color: "#000000"
        }).setOrigin(0.5);

        this.deleteButton.on('pointerover', () => {
            this.deleteButton.setScale(1, 0.7).setTint(0xff5555);
            this.buttonOverSound.play({ volume: 0.5 });
            this.deleteTxt.setFontSize(20);
        }).on('pointerout', () => {
            this.deleteButton.setScale(0.9, 0.6).clearTint();
            this.deleteTxt.setFontSize(18);
        });

        // Botón cambiar contraseña
        this.changePwdButton = this.add.image(360, 450, "boton").setInteractive().setScale(0.8, 0.6);
        this.changePwdTxt = this.add.text(360, 450, 'CAMBIAR CONTRASEÑA', {
            fontFamily: "Barrio", fontSize: "15px", fontStyle: "Bold", color: "#000000"
        }).setOrigin(0.5);

        this.changePwdButton.on('pointerover', () => {
            this.changePwdButton.setScale(0.9, 0.7).setTint(0xa1ffd2);
            this.buttonOverSound.play({ volume: 0.5 });
            this.changePwdTxt.setFontSize(17);
        }).on('pointerout', () => {
            this.changePwdButton.setScale(0.8, 0.6).clearTint();
            this.changePwdTxt.setFontSize(15);
        });

        this.changePwdButton.on('pointerdown', () => {
            this.showPasswordPopup();
        });


        this.createLoginForm();
    
        // Texto conexión
        this.connectionText = this.add.text(360, 450, "HAS PERDIDO LA CONEXIÓN", {
            fontFamily: "Barrio",
            fontSize: "50px",
            fontStyle: "Bold",
            color: "#b0202b",
        }).setOrigin(0.5);
        this.connectionText.setVisible(false);

        this.fundido = this.add.rectangle(360, 240, 720, 480, 'black', 1);
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
                const userData = { username, password, score: 0 };
                fetch(this.registerUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                })
                .then(res => res.ok ? res.text() : res.text().then(err => { throw new Error(err); }))
                .then(msg => {
                    console.log("Registro exitoso:", msg);
                    localStorage.setItem("token", msg);
                    localStorage.setItem("username", username);
                    this.usernameInput.style.display = 'none';
                    this.passwordInput.style.display = 'none';
                    this.scene.start('MainMenuScene', { userlogText: username });
                })
                .catch(err => {
                    console.error("Error durante el registro:", err.message);
                    this.errorRegisterText = this.add.text(360, 300, err.message, {
                        fontFamily: "Freckle Face", fontSize: "20px", fontStyle: "Bold", color: "#000000"
                    }).setOrigin(0.5);
                    if (this.errorLoginText) this.errorLoginText.destroy();
                });
            }
        });

        this.loginUrl = `${window.location.origin}/users/login`;

        this.loginButton.on('pointerdown', () => {
            const username = this.usernameInput.value.trim();
            const password = this.passwordInput.value.trim();
            if (username !== "" && password !== "") {
                this.usernameInput.value = "";
                this.passwordInput.value = "";
                const userData = { username, password, score: 0 };
                fetch(this.loginUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                })
                .then(res => res.ok ? res.text() : res.text().then(err => { throw new Error(err); }))
                .then(msg => {
                    console.log("Inicio de sesión exitoso:", msg);
                    localStorage.setItem("token", msg);
                    localStorage.setItem("username", username);
                    this.usernameInput.style.display = 'none';
                    this.passwordInput.style.display = 'none';
                    this.scene.start('MainMenuScene', { userlogText: username });
                })
                .catch(err => {
                    console.error("Error durante el inicio de sesión:", err.message);
                    this.errorLoginText = this.add.text(370, 300, err.message, {
                        fontFamily: "Freckle Face", fontSize: "20px", fontStyle: "Bold", color: "#b0202b"
                    }).setOrigin(0.5);
                    if (this.errorRegisterText) this.errorRegisterText.destroy();
                });
            }
        });

        this.deleteButton.on('pointerdown', () => {
            const username = this.usernameInput.value.trim();
            const password = this.passwordInput.value.trim();

            if (username === "" || password === "") {
                alert("Por favor, introduce usuario y contraseña para eliminar.");
                return;
            }

            // Intentamos login para obtener token antes de borrar
            fetch(this.loginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, score: 0 })
            })
            .then(res => {
                if (!res.ok) throw new Error("Credenciales incorrectas");
                return res.text();
            })
            .then(token => {
                // Confirmación antes de borrar
                if (!confirm(`¿Seguro que quieres eliminar la cuenta "${username}"? Esta acción es irreversible.`)) {
                    return;
                }

                // Llamada DELETE con token para borrar usuario
                fetch(`${window.location.origin}/users/delete/${encodeURIComponent(username)}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": token
                    }
                })
                .then(res => res.ok ? res.text() : res.text().then(err => { throw new Error(err); }))
                .then(msg => {
                    alert(msg);
                    // Ocultar inputs y volver a menú
                    this.usernameInput.style.display = 'none';
                    this.passwordInput.style.display = 'none';
                    this.scene.start("MainMenuScene");
                })
                .catch(err => {
                    alert("Error al eliminar cuenta: " + err.message);
                });
            })
            .catch(err => {
                alert("Error en autenticación para eliminar: " + err.message);
            });
        });
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
        // MOSTRAR ESTADO DE LA CONEXIÓN
        this.connectionText.setVisible(this.registry.get('connection') === false);
    }

    showPasswordPopup() {
        const username = this.usernameInput.value.trim();
        const oldPassword = this.passwordInput.value.trim();

        if (!username || !oldPassword) {
            alert("Debes iniciar sesión con usuario y contraseña para cambiar la contraseña.");
            return;
        }

        const newPassword = prompt("Introduce la NUEVA contraseña:");

        if (!newPassword || newPassword.trim() === "") {
            alert("Contraseña no válida.");
            return;
        }

        // Autenticar primero para obtener el token
        fetch(`${window.location.origin}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password: oldPassword })
        })
        .then(res => {
            if (!res.ok) throw new Error("Credenciales incorrectas");
            return res.text();
        })
        .then(token => {
            return fetch(`${window.location.origin}/users/changePassword`, {
                method: "PUT", // Método PUT como requieres
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    username: username,
                    oldPassword: oldPassword, // Enviamos la contraseña antigua para validación
                    newPassword: newPassword 
                })
            });
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(msg => { throw new Error(msg); });
            }
            return res.text();
        })
        .then(msg => {
            alert(msg);
            this.passwordInput.value = ""; // Limpiar campo de contraseña
        })
        .catch(err => {
            alert("Error al cambiar contraseña: " + err.message);
        });
    }

}

export default LoginScene;
