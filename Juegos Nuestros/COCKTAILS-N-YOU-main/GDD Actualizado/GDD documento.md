**Cocktails & You**

Documento de diseño de videojuego

*Miguel Ángel López Muñoz, Marcos Pantoja Rafael de la Cruz, Marcos Pérez Martínez, Javier Tirado Ríos*

*Grupo 5*

Versión 1.0 - 27 de Septiembre de 2023

**Versiones del documento**

1\.0 - 27 de Septiembre de 2023
# <a name="_gthiegp5fnm8"></a>**1.**    **Ficha técnica**
Título: Cocktails and You

Estudio: *Nineando Corp.*

Género: Simulación

Target: Realizar cócteles mediante minijuegos en base a las personalidades de los clientes.

Rating: +7

Plataforma: PC

Modos de juego: Singleplayer


# <a name="_7e4ichnx2p2d"></a>**2.**    **Descripción**

Cocktails and You es un videojuego en el que controlaremos a un *barman* quien trabaja realizando cócteles a los diferentes clientes que piden diferentes pedidos. Para realizar cada bebida, será necesario realizar diferentes minijuegos para así conseguir los diferentes componentes de la bebida a realizar, las bebidas preparadas variarán dependiendo de las distintas personalidades de los clientes. En total habrá 4 tipos de personalidades (amarilla, morada, azul y verde). El juego contará con 5 niveles en total. Y cada nivel con tres estrellas. Estas estrellas se consiguen en base a cuantos clientes se ha servido exitosamente. 

**3.	NIVELES**

1. 1 costumer
1. 2 costumers
1. 3 costumers
1. 4 costumers

En todos los niveles y en todos los customers estarán todos los minijuegos disponibles.

**4. MENUS**

1. **Menu principal (Jugar)**
1. **Menu selección de niveles** 
1. **Menu de pausa**
1. **Menu estrellas (**cuando acabas un nivel que aparezca la pantalla que te diga cuantas estrellas has conseguido.).
# <a name="_hm0r9b4i40c8"></a>**3.**	**Estética**
Estilo gráfico: Pixel Art

Lore: Encarnamos a un barman a quien le llegan diferentes tipos de clientes quienes con diálogos personalizados nos piden cócteles, nosotros tendremos como misión satisfacer al mayor número de clientes posible intentando entregarles las bebidas más adecuadas a sus personalidades.

Narrativa: Inexistente

## <a name="_p8adwzjan1hw"></a>**3.1. Movimiento del personaje**
El personaje se mueve con los botones **A** y **D** para moverse de derecha a izquierda respectivamente. En algún minijuego se incluirá el botón **SPACE** para saltar.

## <a name="_bvrlv737v3ib"></a>**3.2. Cámara**
En la pantalla principal la cámara enfocará la barra del bar en la que se verán objetos con los que poder interactuar para entrar en los minijuegos, una radio donde sonará una canción, los distintos cócteles y otro objeto para ver las descripciones de los cócteles en función de la personalidad.


*.***3.3. Mecánica y dinámica** 

- Se podrá mover el ratón en el menú principal, y tan solo se podrá hacer click para ver los cócteles y acceder a menús.
- En minijuegos: lanzar un hielo (manejado con el ratón) para intentar encestar en la coctelera.
- En minijuegos: disparar a la bebida alcohólica.
- En minijuegos: movimiento de las bebidas alcohólicas por la pantalla para añadir dificultad al apuntado.
- En minijuegos: desplazarse en un escenario para coger los refrescos.
- En minijuegos: frutas que caen del cielo (gravedad) y tener que cogerlas antes de que toquen el suelo.
- En minijuegos: implementación de un breakout para recolección de hierbas.


# <a name="_ys7b1c9yepk6"></a>**4.**	**Diseño de minijuegos**
- Hielos: En este minijuego deberemos lanzar un hielo con la fuerza necesaria (arrastrando el ratón, estilo Tigerball) para encestar en la coctelera.
- Bebidas alcohólicas: Diferentes tipos de bebidas alcohólicas se moverán por la pantalla aleatoriamente y el jugador deberá disparar y acertar a la correcta.
- Refrescos: Minijuego donde tienes que hacer parkour para conseguir los refrescos para la bebida con un tiempo límite.
- Frutas: : Diferentes frutas caerán con la fuerza de la gravedad mientras que el jugador deberá atraparlos moviendo horizontalmente una cesta.
- Especias: Minijuego donde movemos una barra para hacer rebotar una pelota la cual va consiguiendo especias al chocar con los bloques pegados al techo.
## <a name="_9hv35u92vr41"></a>**b.**	**4.3. Descripción de partida típica**
El jugador empezará a jugar. Se topa con la pantalla de inicio, donde se da la opción a acceder al menú selector de niveles. El jugador podrá seleccionar el nivel que quiera, si los tiene desbloquedos y se encontrará en la pantalla principal, aparecerá un cliente con un diálogo de texto insinuando un tipo de bebida según su personalidad, el jugador deberá clicar en el tipo de cóctel que quiere hacer  para así iniciar los minijuegos para realizar la bebida, jugará al de los hielos, después con el de las bebidas alcohólicas, sigue refrescos, las frutas y finalizar con las hierbas. Una vez finalice el cóctel se le entregará al cliente y se premiará positiva o negativamente al jugador según cuando se acerque al pedido original. Tras esto llegará otro cliente y así sucesivamente. Cada nivel tendrá un objetivo de clientes al que satisfacer en un periodo de tiempo.

# <a name="_4jbbaec6y6ci"></a>**5.**	**HUD**
El HUD estará distribuido por la barra del bar. Habrá un botón con la lista de personalidades y una breve descripción de las mismas. También habrá una carta/papel con las recetas de las distintas bebidas a realizar. Por último, en la barra habrá una copa donde estarán los minijuegos para realizar dicho coctel en función de la elección hecha por el jugador.
##

1. # <a name="_zbj89dob9zrf"></a><a name="_16phqnw0e104"></a>**Minijuegos**
Hielos:
#

<a name="_khl3zbvqeynv"></a>Bebidas alcohólicas:

#



<a name="_6tu6bqx0885x"></a>Refrescos:




Frutas:


Otros ingredientes:

# <a name="_953dl6anh00b"></a>**6.**	**Visual**
MainMenu de la escena del bar:



# <a name="_rdjrmvu51r9i"></a>**7.**	**Contenido**
En el juego podemos encontrar diferentes minijuegos a realizar para obtener los elementos indispensables de los cocktails.

Para las bebidas alcohólicas existe un minijuego de puntería hacia las botellas de alcohol.

Para los hielos existe un minijuego parecido al baloncesto donde hay que encestar los hielos.

Para los refrescos tenemos un minijuego el cual consiste en varios refrescos que caen del cielo y hay que atraparlos con una cesta.

Para las frutas tenemos un minijuego inspirado en Breakout.

Para las Hierbas tenemos pensado un minijuego inspirado en pong.

Para agitar la coctelera tenemos un medidor de fuerza que se activa en función de cuanto agites el cursor.

También tenemos 16 tipos de clientes, uno para cada personalidad. Estos clientes están a su vez separados en 4 grupos según el color de la personalidad.

4 tipos de cocteles segun los 4 tipos de personalidades:

-**Analistas**:Purple Sky. Creado con Vodka, mora y cola.(con hielos)

-**Diplomáticos**:Mojito.Creado con ron blanco, hojas de hierbabuena, soda con limón y azúcar.(con hielos)

-**Centinela**s:Blue Lagoon. Creado con Ginebra, refresco azul y limón.(con hielos)

-**Exploradores**:Margarita.Creado con Tequila, lima, licor de naranja y azúcar.



## <a name="_gf991v8bzpga"></a>**7.1 Niveles**
Hay una lista de 4 niveles en los cuales podemos obtener distintas puntuaciones según el número de clientes satisfechos.

Poco a poco en cada nivel va subiendo la dificultad progresivamente, siendo el nivel 1 un nivel introductorio.
## <a name="_9ebeivflbkqr"></a>**8.**    **Referencias**
●        Overcooked (Género: Simulación, aventura, casual; 2 agosto de 2016)

●        TigerBall (Género: Simulación, aventura, casual; 2 agosto de 2016)

- One-armed cook (Género: Simulación, casual; 30 de agosto de 2022)
7
