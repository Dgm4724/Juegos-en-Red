class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: "GameOverScene" });
    }
  
    init(data) {
      // Puntuacion recibida desde GameScene
      this.puntuacion = data.puntuacion || 0;  // Si no se pasa puntuación, asigna 0
      this.previousScene = data.previousScene || 0;

      if(data && data.userlogText) {
            this.userlogText = data.userlogText;
            localStorage.setItem('userlogText', this.userlogText); // guardar sesión
        } else {
            this.userlogText = localStorage.getItem('userlogText');
        }
        console.log("Usuario logueado:", this.userlogText);
    }
  
    create() {
      // Ocultar chat
      document.getElementById("chat").style.display = "none";

      // Fondo
      this.add.image(360, 240, "fondoGenerico");
  
      // Texto Game Over
      this.add.text(360, 120, "¡Fin del Juego!", {
        fontSize: "50px",
        fontFamily: "Freckle Face",
        color: "#fad461",
      }).setOrigin(0.5);
  
      // Puntuacion
      this.add.text(360, 200, `Puntuación final: ${this.puntuacion}`, {
        fontSize: "30px",
        fontFamily: "Freckle Face",
        color: "#dba43d",
      }).setOrigin(0.5);
  
      // Botón para volver al menu principal
      this.botonMenu = this.add.image(360, 300, "boton").setInteractive();
      this.botonMenu.setDisplaySize(250, 58);

      this.BMtxt = this.add.text(360, 300, "Menú Principal", {
        fontSize: "24px",
        fontFamily: "Barrio",
        fontStyle: "Bold",
        color: "black",
        align: 'center'
      }).setOrigin(0.5);

      this.botonMenu.on('pointerover', () => {
        this.botonMenu.setDisplaySize(260, 68);
        this.botonMenu.setTint(0xfff5a1);
        this.BMtxt.setFontSize(27);
      });
      this.botonMenu.on('pointerout', () => {
        this.botonMenu.setDisplaySize(250, 58); // Restaurar el tamaño original
        this.botonMenu.clearTint(); // Eliminar el tinte
        this.BMtxt.setFontSize(24);
      });
      this.botonMenu.on("pointerdown", () => {
        this.scene.start("MainMenuScene");
      });
  
      // Botón para reiniciar la partida
      this.botonReinicio = this.add.image(360, 380, "boton").setInteractive();
      this.botonReinicio.setDisplaySize(250, 58);

      this.BRtxt = this.add.text(360, 380, "Reintentar", {
        fontSize: "24px",
        fontFamily: "Barrio",
        fontStyle: "Bold",
        color: "black",
        align: 'center'
      }).setOrigin(0.5);

      this.botonReinicio.on('pointerover', () => {
        this.botonReinicio.setDisplaySize(260, 68);
        this.botonReinicio.setTint(0xfff5a1);
        this.BRtxt.setFontSize(27);
      });
      this.botonReinicio.on('pointerout', () => {
        this.botonReinicio.setDisplaySize(250, 58); // Restaurar el tamaño original
        this.botonReinicio.clearTint(); // Eliminar el tinte
        this.BRtxt.setFontSize(24);
      });
      this.botonReinicio.on("pointerdown", () => {
        switch (this.previousScene){
        case 0 :
          this.scene.start("GameScene");
          break;
        case 1 :
          this.scene.start("GameScene2");
          break;
        case 2 :
          break;

      }
      });

      // Actualizar la puntuación si es mayor a la registrada
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      if (token && username) {
        fetch(`/users/score/${username}`, {
          headers: {
            "Authorization": token
          }
        })
        .then(res => {
          if (!res.ok) throw new Error("No se pudo obtener la puntuación");
          return res.text(); // Cambiado de res.json() a res.text()
        })
        .then(textScore => {
          const score = parseInt(textScore, 10);
          if (isNaN(score)) throw new Error("Puntuación inválida recibida");

          if (this.puntuacion > score) {
            // actualizar puntuación
            fetch("/users/updateScore", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              },
              body: JSON.stringify({
                username: username,
                score: this.puntuacion
              })
            })
            .then(updateRes => {
              if (!updateRes.ok) throw new Error("No se pudo actualizar la puntuación");
              return updateRes.text();
            })
            .then(msg => {
              console.log("Respuesta actualización:", msg);
            })
            .catch(err => {
              console.error("Error al actualizar puntuación:", err);
            });
          }
        })
        .catch(err => {
          console.error("Error al obtener puntuación:", err);
        });
      }

      // Texto conexión
      this.connectionText = this.add.text(360, 450, "HAS PERDIDO LA CONEXIÓN", {
        fontFamily: "Barrio",
        fontSize: "50px",
        fontStyle: "Bold",
        color: "#b0202b",
      }).setOrigin(0.5);
      this.connectionText.setVisible(false);
    }

    update() {
      // MOSTRAR ESTADO DE LA CONEXIÓN
      this.connectionText.setVisible(this.registry.get('connection') === false);
    }
  }
  
  export default GameOverScene;
