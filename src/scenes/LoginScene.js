class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: "LoginScene" });
    }

    preload() {
        // Cargar imágenes y fuentes necesarias
        this.load.image("fondoGenerico", "./assets/images/fondoGenerico.png");
        this.load.font("Barrio", "./assets/fonts/Barrio-Regular.ttf");
    }

    create() {
        // Fondo de la escena
        this.add.image(360, 240, "fondoGenerico");

        // Título de la escena
        this.add.text(360, 75, "Inicia sesión para jugar", {
            fontFamily: "Barrio",
            fontSize: "30px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // Crear el formulario HTML de login directamente en el create()
        const loginForm = document.createElement("div");
        loginForm.classList.add("login-container");

        // Crear los elementos del formulario
        const labelUsername = document.createElement("label");
        labelUsername.setAttribute("for", "username");
        labelUsername.textContent = "Usuario:";
        loginForm.appendChild(labelUsername);

        const inputUsername = document.createElement("input");
        inputUsername.setAttribute("type", "text");
        inputUsername.setAttribute("id", "username");
        inputUsername.setAttribute("name", "username");
        inputUsername.setAttribute("placeholder", "Escribe tu usuario");
        loginForm.appendChild(inputUsername);

        const labelPassword = document.createElement("label");
        labelPassword.setAttribute("for", "password");
        labelPassword.textContent = "Contraseña:";
        loginForm.appendChild(labelPassword);

        const inputPassword = document.createElement("input");
        inputPassword.setAttribute("type", "password");
        inputPassword.setAttribute("id", "password");
        inputPassword.setAttribute("name", "password");
        inputPassword.setAttribute("placeholder", "Escribe tu contraseña");
        loginForm.appendChild(inputPassword);

        const loginButton = document.createElement("button");
        loginButton.setAttribute("name", "loginButton");
        loginButton.textContent = "Iniciar sesión";
        loginForm.appendChild(loginButton);

        // Añadir el formulario al DOM de Phaser
        this.add.dom(360, 300).createFromHTML(loginForm);

        // Escuchar el evento de click en el botón de login
        loginButton.addEventListener("click", () => {
            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");

            if (usernameInput.value !== "" && passwordInput.value !== "") {
                // Llamar a la función de login
                this.login(usernameInput.value, passwordInput.value);
            } else {
                // Mostrar mensaje de error si los campos están vacíos
                this.showError("Por favor, completa todos los campos");
            }
        });

        // Botón para volver al menú principal
        this.botonMenu = this.add.image(640, 430, "backButton").setInteractive();
        this.botonMenu.setTint(0xffe47b);

        this.botonMenu.on('pointerover', () => {
            this.botonMenu.setScale(1.09);
            this.botonMenu.setTint(0xffd42f);
        });

        this.botonMenu.on('pointerout', () => {
            this.botonMenu.setScale(1);
            this.botonMenu.setTint(0xffe47b);
        });
        
        this.botonMenu.on("pointerdown", () => {
            this.scene.start("MainMenuScene");
        });

        // Texto de error para mostrar mensajes de error
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
