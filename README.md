GDD - F.O.C.A.: Felicidad y Ocio Con Amigos

Tarso da Costa da Silva
Juan Carlos Mauricio Orejón
Álvaro Codorníu Alonso
Diego Gómez Martín


Introducción
Nombre del equipo de desarrollo: Fokin Games (por ejemplo)
Logo de equipo:
Miembros del equipo, correo institucional y cuenta de GitHub:
-  Tarso da Costa da Silva: t.dad.2022@alumnos.urjc.es // tarsotarso
- Juan Carlos Mauricio Orejón: jc.mauricio.2022@alumnos.urjc.es // JuanCarlosMauricio
- Álvaro Codorníu Alonso: a.codorniu@alumnos.urjc.es // alvaroCodor
- Diego Gómez Martín: d.gomezm.2022@alumnos.urjc.es // Dgm4724
La elección del tipo de videojuego ha venido inicialmente dada por la decisión de hacer un juego cooperativo. Creemos que da opciones más interesantes y un estilo de juego más relajado y ameno, además de ahorrarnos la calibración del componente competitivo. Posteriormente, un compañero aportó la idea de un juego tipo 



**Concepto** 
Juego cooperativo de dos jugadores cuyo objetivo será mantener una pelota en el aire golpeándola una vez cada uno, acumulando puntuación hasta que la pelota toque el suelo. El juego será dinámico y fluido, con unas reglas y una curva de aprendizaje sencillas y recompensará la coordinación entre los dos jugadores, quienes deberán hacer uso de sus reflejos y mover correctamente a su personaje para evitar que la pelota toque el suelo durante el mayor tiempo posible. Todo ello se desarrolla en un contexto amigable y en tono divertido, con una estética colorida y animaciones llamativas que enfatizan el carácter casual del juego. El juego será tipo arcade, lo que quiere decir que se desarrollará por partidas sueltas en las que se guardará la puntuación de los dos jugadores que han participado.


**Género**
Juego arcade de deportes cooperativo.


**Plataformas**
El juego se desarrollará para PC, para redes locales y mediante un servidor web que utilizará, por tanto, HTML y JavaScript. En el propio juego se dará la opción de jugar en un mismo dispositivo o en varios dispositivos conectados a una misma subred.


**Jugabilidad** 
Espacio
Las partidas se desarrollarán en un escenario 2d ligeramente más grande que  la pantalla de juego, por lo que los dos jugadores siempre se ven en pantalla.
Controles
Se utilizará el ratón para navegar por los diferentes menús e interactuar con los botones y elementos del juego; no obstante, durante la partida será necesario únicamente el uso del teclado para jugar. Se utilizarán las flechas o las teclas WASD para el movimiento vertical y horizontal, mientras que para los golpes se usarán los números. En el caso de que 2 jugadores estén jugando en un mismo dispositivo, uno de ellos se moverá con flechas y el otro con las teclas WASD. Los golpes se corresponderán con las teclas 1, 2 y 3 para el jugador de la derecha y 7, 8 y 9 para el jugador de la izquierda. También habrá opciones de personalización de controles para adaptarse al teclado de cada ordenador y a las necesidades o preferencias específicas de cada jugador.
Mecánicas
- Desplazamiento lateral: el movimiento es uno de los elementos básicos que sienta las bases del resto del juego. El jugador deberá tener un movimiento preciso y unos reflejos rápidos para no caer en los obstáculos del terreno, así como para anticiparse a la trayectoria de la pelota y poder darle antes de que alcance el suelo. No existen colisiones entre jugadores, por lo que podrán moverse libremente por el escenario sin limitaciones. Así, algunas veces será necesario esquivar obstáculos, golpear la pelota en el aire, golpear la pelota en una dirección determinada o con cierta intensidad…
- Salto (desplazamiento vertical): El salto complementa al desplazamiento lateral, dotando al jugador de la movilidad completa necesaria para esquivar obstáculos del terreno o enemigos y para poder golpear la pelota en más situaciones.
- Golpes: Hay tres tipos de golpes diferentes: golpe normal, golpe fuerte y globo. La complicación de esta mecánica consiste en saber qué tipo de golpe usar en cada momento para optimizar la puntuación conseguida, teniendo en cuenta que . La idea principal consiste en  golpear la pelota en el momento justo de la colisión entre esta y el jugador, si el jugador presiona el botón de golpe demasiado pronto o demasiado tarde, la pelota pasará de largo. Además, el impacto dirigirá la pelota hacia el sentido al que apunta el jugador, combinando así esta mecánica con la del movimiento.
Dinámicas, progresión y flujo de juego
Las partidas son de duración indefinida con aumento progresivo de la dificultad y diferentes niveles lineales, por lo que comparte bastantes características con el estilo y el flujo de juego de los videojuegos arcade.
Los golpes aumentan la puntuación según el tipo de golpe y la velocidad de la pelota, cuanto más arriesgado sea el golpe más puntuación obtendrán los jugadores.
La pelota rebotará en las paredes y techo del nivel en cuestión, así como con los posibles obstáculos que pueda haber. Si entra en contacto con el suelo, los jugadores perderán y acabará la partida inmediatamente.


**Escenarios**
Cada escenario tiene distintas situaciones y eventos que proporcionan variedad a la jugabilidad. De momento se han pensado en 3 escenarios correspondientes a 3 niveles diferentes, que podrán ser posteriormente ampliables. En orden ascendente de dificultad, los escenarios son los siguientes:
1. Playa atardecer: Es un nivel relajado, con un bonito atardecer de fondo y pocos obstáculos, para jugadores que prefieran una partida más casual. Es un nivel que sirve prácticamente de tutorial. La pelota rebota en los laterales y no en el techo, por lo que la única forma de perder es si toca el suelo.
Obstáculos: en este nivel no habrá obstáculos ya que lo que se pretende es que el jugador se familiarice con el juego y las mecánicas. Como mucho habrá algún que otro obstáculo pequeño en los laterales como rocas o palmeras.
Eventos: cada 40 segundos, la marea sube y deja en el suelo charcos de barro, que ralentizan al jugador que pasa por encima. Los charcos desaparecen a los 10 segundos.
2. Glaciar: Nivel de dificultad intermedia, con algunos elementos que ponen a prueba las habilidades del jugador sin llegar a ser demasiado estresante. La pelota no rebota en los laterales ni en el techo, por lo que si se sale demasiado por dichos límites los jugadores habrán perdido.
Obstáculos: en este nivel el principal impedimento para el movimiento es el suelo, que tendrá agujeros que dan al agua y por los que el jugador se podrá caer, lo que le hará terminar la partida. Además, habrá zonas en las que el suelo escurra y haga más inestable el movimiento del jugador.
Eventos: cada 30 segundos, caen carámbanos de hielo que provocan colisiones tanto con los jugadores como con la pelota, durante 10 segundos.
3. Barco de crucero: Nivel de dificultad más alto, pero también el desafío más atractivo para el jugador. Contiene muchos elementos frenéticos y estimulantes que ponen a prueba los nervios y los reflejos del jugador. La pelota rebota con múltiples estructuras del escenario, pero no por los laterales ni por arriba, por lo que si se sale los jugadores perderán.
Obstáculos: el barco contiene varios niveles, por lo que la pelota rebotará en diferentes estructuras que están a diferentes alturas. El jugador también tendrá que sortear dichos obstáculos, así como a los pasajeros del crucero, con los cuales colisiona, y que cuando te acercas se escandalizan y corren de un lado al otro molestando. 
Evento: Cada 20 segundos hay turbulencias, y el barco se inclina lentamente primero hacia un lado y luego hacia el otro. Tras 5 segundos en cada dirección, se vuelve a poner horizontal.


**Personajes**
Los personajes jugables son dos focas amigas a las que les gusta jugar con la pelota. A nivel jugable las focas son iguales. Con la puntuación que el jugador consiga en las partidas va a poder desbloquear pequeñas mejoras, las cuales puede seleccionar antes de empezar cada partida.


**Interfaces** 
Aún no hay prototipos de las interfaces pero ya hemos planteado las que necesitamos y cómo va a ser la navegación entre ellas.
Interfaz de partida
-La puntuación de la partida está abajo en el medio de la pantalla, es importante que esté abajo para no obstruir la visión del escenario y el balón.
-El tiempo de partida está abajo de la puntuación
-Cuando el jugador da un toque al balón,el número del toque actual  aparece en en el fondo del escenario
Menú inicial


**Menú de opciones**
Según avance el desarrollo en el menú de opciones se va a definir más según las necesidades del proyecto pero ahora mismo podemos definir esta pantalla como un menú con tres botones que representan Jugabilidad, Sonido y Gráficos


**Marcadores**
En esta interfaz se muestra una tabla con las puntuaciones de los demás jugadores, hay una sección dentro de los marcadores por cada escenario.
Selección personaje
Pantalla en la que el jugador tiene que elegir personaje antes de empezar la partida
Selección nivel
Pantalla en la que los jugadores tienen que elegir escenario antes de empezar la partida
Pantalla fin de partida (tabla ranking)
	Pantalla tras finalizar la partida, se muestra la puntuación obtenida, la tabla de puntuación general y los botones para empezar otra partida o salir del juego.



**Estilo artístico** 
El estilo visual será en 2 dimensiones, con un tipo de  pixel art lo suficientemente sencillo para facilitar el trabajo y la creación de sprite sheets, pero con suficiente resolución como para poder ver con claridad los personajes y demás elementos. Además hemos elegido este estilo visual también por afinidad con el mismo y porque se adapta a las sensaciones que queremos que nuestro juego transmita. Tiene que ser un juego desenfadado, divertido y dinámico, por lo que los personajes tenderán a ser graciosos, las animaciones vistosas y la paleta de color con tonos vivos y enérgicos.


**Música y sonido** 
La música y efectos de sonido van a ser animadas y frenéticas para adecuarse a la temática del juego. A continuación se detalla una lista de los efectos de sonido que se necesitarán. Se numerarán a efectos prácticos. (Probablemente la lista varíe y se añadan muchos más sonidos que vayamos identificando)





