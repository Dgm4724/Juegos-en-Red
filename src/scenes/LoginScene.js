class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: "LoginScene" });
    }

    create() {
        // Añadir fondo de la escena
        this.add.image(360, 240, "fondoGenerico");

        // Título de la escena
        this.add.text(360, 75, "Inicia sesión para jugar", {
            fontFamily: "Barrio",
            fontSize: "30px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Crear el formulario desde el archivo cargado
        this.loginForm = this.add.dom(360, 300).createFromCache("loginForm");

        // Escuchar el evento click del formulario
        this.loginForm.addListener("click");

        this.loginForm.on("click", (event) => {
            if (event.target.name === "loginButton") {
                const usernameInput = this.loginForm.getChildByName("username");
                const passwordInput = this.loginForm.getChildByName("password");

                if (usernameInput.value !== "" && passwordInput.value !== "") {
                    // Llamar a la función login
                    this.login(usernameInput.value, passwordInput.value);
                } else {
                    this.showError("Por favor, completa todos los campos");
                }
            }
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

        // Texto de error
        this.errorText = this.add.text(360, 400, "", {
            fontFamily: "Barrio",
            fontSize: "18px",
            color: "#ff0000",
        }).setOrigin(0.5);
    }

    login(username, password) {
        const data = { username, password };

        // Realizar una solicitud POST al backend para la autenticación
        fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Credenciales incorrectas");
                return response.json();
            })
            .then((responseData) => {
                const token = responseData.token; // Suponiendo que el backend envía un token
                localStorage.setItem("authToken", token);
                this.scene.start("MainMenuScene");
            })
            .catch((error) => {
                this.showError(error.message);
            });
    }

    showError(message) {
        this.errorText.setText(message);
    }
}

export default LoginScene;
