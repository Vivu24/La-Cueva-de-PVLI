
# Videojuego Navegador "40 Crisis"


 El siguiente proyecto se trata de un trabajo uninversitario.

## Redes sociales

 [Twitter](https://x.com/Sombrereros_P?t=teBMrrU6sPUA7qscz4yFDQ&s=09)                                               
 [Instagram](https://www.instagram.com/sombrereros_production/)

## Descrición general del proyecto

 ***40 Crisis*** se trata de un videojuego con oleadas infinitas de vista cenital donde se controla a un personaje quetendrá un arsenal de armas iniciales (ataque cuerpo a cuerpo, pistola, trinchera) con el que defenderse de los enemigos. Al aumentar el número de rondas aumenta el número de enemigos diferentes y desbloquearás nuevas armas, dependiendo de la clase que decidas ultilizar para eliminar a tus enemigos.

## Enlace a la pagina web
[Enlace a la página web](https://adelpozo04.github.io/Grupo03-40Crisis/)

## Capturas del juego
![pantalla inicial](/ReadMe%20Files/pantallainicial.jpg)  
![mapaplaya](/ReadMe%20Files/playajuego.jpg)  


## GDD (game design document)

### 1. Ficha técnica
**-Título:** 40 Crisis  
**-Género:** Arcade, rogue-like, supervivencia, acción  
**-Target:** Gente interesada en acción y superación de su propia puntuación  
**-Rating:** 12+ años  
**-Plataforma:** PC, navegador  
**-Modos de juego:** 1 jugador  

### 2. Jugabilidad
#### 2.1 Movimiento del personaje
 Movimiento en todas las direcciones, sin salto.
#### 2.2 Cámara 
 Cámara cenital que sigue al jugador.
#### 2.3 Mecánicas del jugador
El jugador tiene 4 tipos de combate basado en sus personalidades. Estos pueden ser cambiados a su voluntad y van evolucionando a medida que progresa en ese estilo. Nota: (las características se han atribuido del 1-10 en todos los ámbitos menos la vida. Estas están abiertas al cambio tras testeos).   
 - Explorador: Dominio de armas a corto alcance. Esta característica se le atribuye a esta personalidad ya que incluye personas las cuales evitan la monotonía y el aburrimiento, les gusta arriesgarse (al estar más cerca de los enemigos te arriesgas más) y son buenos en el uso de herramientas.
    - Puños: Daño 4/ Alcance 2/ Cadencia 2 (doble golpe).
    - Bates: Daño 6/ Alcance 3/ Cadencia 3 (Alejar enemigos).
    - Espada: Daño 8/ Alcance 3/ Cadencia 6 (sin retroceso).
 - Centinela: Uso de armas a distancia con munición compartida por todas (balas). Esta característica se le atribuye a esta personalidad ya que incluye personas lógicas y enfocados en los hechos (+distancia = +seguridad) y que además son buenos administrando cosas (en este caso las balas).
    - Tirachinas/Pistola: Daño 2/ Alcance  Inf/ Cadencia 4.
    - Rifle: Daño 3/ Alcance inf / Cadencia 10.
    - Franco: Daño 10/ Alcance inf/ Cadencia 1.
 - Analista: Uso de trampas para entorpecer o hacer daño a enemigos. Esta característica se le atribuye a esta personalidad ya que incluye personas estratégicas y muy analíticas (colocación y uso correcto de las trampas), las cuales siempre buscan un camino o crean uno (uso del muro como obstáculo).
    - Muro: Instancia que obstaculiza a los enemigos con una vida fija (munición).  
    - Mina:Daño 6/ Radio 4 / Cooldown tras explosion 3.
    - C4: Daño 6/ Radio 4/ Tu lo activas (cooldown).
 -  Pacifista: Uso de elementos no mortíferos para cambiar el comportamiento enemigo. Esta característica se le atribuye a esta personalidad ya que incluye personas entusiastas y creativas que son capaces de cautivar a las personas (en este caso cambiando y alterando el comportamiento de los enemigos).
    - Cepo: stunear al enemigo x segundos (cooldown).
    - Empuje: hace retroceder mucho a los enemigos sin dañarles.
    - Embrujar: hace que uno de los enemigos ataque al resto durante x segundos y tras ello vuelve a atacar al jugador. No a bosses. El jugador lo puede atacar.
  
    ##### ***Armas especiales***

    - Explorador y Centinela: Su combinación nos da una bayoneta que al atacar cuerpo a cuerpo dispara un proyectil en línea recta. Melee: Daño 6/ Alcance 3 Distancia: Daño 4/ Alcance inf/ cadencia general 5.  
    - Centinela y Analista: Su combinación nos da un lanzaminas que dispara minas a una distancia lejana del jugador haciendo un gran daño en área. Daño 7/ Radio 5/ Cadencia 5.
    - Analista y Pacifista: Su combinación nos da muñeco de nieve que explota el cual no solo daña a los enemigos sino que además los paraliza por un tiempo, haciendo como que los congela. Daño 4/ Radio 6/ Parálisis por 5 segundos/ Cooldown de 20 segundos.
    - Pacifista y Explorador: Su combinación nos da una gran manopla atada a un palo la cual daña a los enemigos y los aleja enormemente. Daño 6/ Alcance 3/ Cadencia 2.
 #### 2.4 Mecánicas del escenario
El escenario es una mapa cerrado con diferentes obstáculos destruibles por el enemigo y elementos que son capaces de mover, dañar, y aplicar debuffs o buffs al jugador y enemigos. Cada mapa se desbloquea al llegar a x puntos del anterior. Los mapas son lugares reales con elementos sobrenaturales. Cada mapa tiene un pase de batalla en el cual podrás desbloquear varias recompensas al llegar a x puntos.  
#### 2.5 Enemigos
1. **Parguela (Zombie)**: Persigue al jugador y cuando está cerca de él le hace daño. Daño 2 /Velocidad 4  /Vida 15.  Soltar Munición/Muros: 20%.
2. **Esqueleto**: Persigue al jugador a gran velocidad: Daño 2 / Velocidad 10 / Vida 10. Soltar Munición/Muros: 30%.
3. **Hamburguesa carnívora**: Enemigo que persigue al jugador con gran resistencia y poca velocidad. Daño 5/ Velocidad 2/ Vida 50. Soltar Munición/Muros: 50%.
4. **Caracol**: enemigo que te persigue y si te toca te mata de un golpe. Daño inf / Velocidad 0.5/ Vida inf. Soltar Munición/Muros: nada.
5. **Lutano**: Enemigo que te persigue y va dejando trampas en el mapa que al tocar al jugador lo paralizan por x segundos. Daño 3/ Velocidad 5/ Vida 15. Soltar Munición/Muros: 25%.
6. **Robot**: ataca al jugador a distancia cuando llega a x proximidad de su área. Daño 1 / Velocidad 4 / Vida 10. Soltar Munición/Muros: 40%.
7. **Mono**: Se mueve de forma random por el mapa pero si aparece un potenciador va directo hacia él. Daño 0/ Velocidad 9/ Vida 10. Soltar Munición/Muros: 100%.

   ***Enemigos nice to have***
1. Fantasma: Persigue al jugador saltándose cualquier tipo de trampa, muro… (obstáculo). Daño  3/Velocidad 3/ Vida 10.
2. Payaso: Persigue al jugador y al acercarse a él explota. Al morir explota igualmente y la explosión daña a jugador y enemigos. Daño 7/ Velocidad 8/ Vida 5.

#### 2.6 Controles
- El jugador se moverá con las teclas de WASD.
- Cambiará de clase con la tecla Q (sentido antihorario) y la tecla E (sentido horario).
- Cambiará de arma con la rueda del ratón.
- Apunta moviendo el cursor y  dispara con el click izquierdo del ratón.

#### 2.7 Sombreros

Los sombreros son elementos simplemente cosméticos que no tienen ningún efecto dentro de la jugabilidad y que el jugador podrá desbloquear en el de batalla que tiene cada mapa el cual podrás ir avanzando conforme consigues una puntuación más alta en cada mapa. Podrás equiparte el sombrero en el mismo menú de selección de niveles. 


### 3. Diseño de nivel 
#### 3.1  Imagen del nivel
*En todos los niveles hay puntos para recoger power ups marcados con amarillo* 

- Mapa 1 (ciudad)
  
![Mapa 1 (Ciudad)](/ReadMe%20Files/Mapa1ciudad.png)  
      - Pasan coches por las carreteras que hacen un gran daño tanto al jugador como a los enemigos.  
      - Hay basura que paraliza por x tiempo al jugador y los enemigos si entran en contacto con ella.  
      - Boca de riego que saca agua y reduce movilidad en ella  
      
- Mapa 2 (playa)

![Mapa 2 (Playa)](/ReadMe%20Files/Mapa2playa.png)  
    - Olas que arrastran enemigos/jugador.  
    - Cada x tiempo el mapa se inunda y el jugador se ralentiza.  
    - Una gaviota que va cagando por el mapa y si te da no puedes atacar por x tiempo.    

- Mapa 3 (volcán)
  
![Mapa 3 (Volcan)](/ReadMe%20Files/Mapa3Volcan.png)    
    - Aparecen zonas de lava que reducen espacio jugable pues al entrar te hacen daño.  
    - Caída de rocas del cielo que hacen gran daño en área.  
    - Nube de humo que aparece en una parte del mapa y tapa la visión en ella totalmente pero no reduce el espacio jugable.  
 
 #### 3.2 Descripción de partida típica 
 El jugador debe sobrevivir mientras varios enemigos intentan atacarte. La partida está dividida en rondas infinitas entre las cuales aumentan las características de los enemigos y favorece la aparición de unos u otros. La partida termina cuando el jugador muere y se almacena su puntuación si es la más alta.

### 4. HUD 
#### 4.1 Mockup del HUD
![Menú principal](/ReadMe%20Files/MenuPrincipal.png)  
Menú inicial del juego. En él podemos encontrar el título del juego, un botón de start y un pequeño texto semitransparente con la desarrolladora abajo a la derecha. El fondo será uno de los mapas del juego siendo recorrido, sin enemigos ni potenciadores, dándole un toque apacible antes de la partida.    

![Menú de selección de mapas](/ReadMe%20Files/SeleccionMapas.png)  
Menú de selección de mapas. En este menú el jugador será capaz de desplazarse entre los diferentes mapas de forma cíclica. Cada mapa muestra su nombre, la puntuación máxima obtenida en él, una imagen/icono que muestra la colocación de obstáculos y objetos y el pase de batalla de dicho mapa. Independiente del mapa en el que estés nos encontramos por un lado arriba a la derecha el botón para acceder al bestiario y abajo del pase de batalla otro selector ciclo, siendo en este caso el de los sombreros.  

![Bestiario](/ReadMe%20Files/Bestiario.png)  
Menú del bestiario. Este menú está compuesto por un gran libro en cuyas páginas se muestra la información de cada enemigo/potenciador/arma. Cada elemento tendrá un título con su nombre, una imagen, unas estadísticas (a excepción de los potenciadores) y una descripción. Cada vez que el jugador mate/consiga/use uno de dichos elementos lo desbloqueara en el bestiario.

Si no se ha desbloqueado la página aparecerá en blanco. Entre elementos habrá páginas con una gran texto que indique el grupo en el que se amontonan, por ejemplo antes de mostrar a los zombies, esqueletos… se muestra una página con el título de enemigos.    

![Menú de pausa](/ReadMe%20Files/MenuPausa.png)  
Menú de pausa. Es el menú que sale al pausar el juego durante una partida. Su fondo es semitransparente permitiendo al jugador ver su situación antes de despausar. Tiene dos botones, uno para continuar y otro para rendirse. En caso de rendirse se le pone como score los puntos que llevase hasta ese momento.    

![Interfaz de partida](/ReadMe%20Files/InterfazPartida.png)  
Interfaz durante la partida. Durante la partida el jugador podrá ver varios elementos que le muestran su estado.
Arriba a la izquierda se encuentra su barra de vida y justo abajo su marcador de puntos. 

Arriba a la derecha está el contador de personalidad que le muestra su desarrollo con cada personalidad, armas desbloqueadas… las personalidades se rellenan en sentido de las agujas del reloj y aparece más iluminada la personalidad que estés usando en dicho momento. Al subir dos armas al rango máximo, entre ellas se mostrará el arma especial que combina ambas personalidades. Esto solo aparece con las dos personalidades continuas que maximicen antes, el resto si bien se podrán maximizar para desbloquear las otras armas no darán dichas combinaciones.  

Abajo a la derecha se encuentran las diferentes armas de la personalidad actual. Se ve el icono de las que tienes desbloqueadas, se ilumina la que tienes equipada actualmente y esta con sombra la que aún no has desbloqueado.
Por último, arriba del todo se encuentra el marcador de potenciador. Este consiste en una flecha que apunta en donde se encuentra el potenciador que ha spawneado. Solo aparece cuando hay uno en el mapa y si este es robado desaparece la marca.  

#### 4.2 Explicación de los elementos del HUD y su funcionamiento
Durante la partida el jugador podrá ver varios elementos en la pantalla que le darán información:
 - **Barra de vida**: aparece arriba a la izquierda y te muestra la cantidad de vida restante de tu jugador.
 - **Puntuación**: Te indica la cantidad de puntos conseguidos en la partida.
 - **Ruleta de personalidades**: es una rueda dividida en 4 zonas cada una relacionada a una personalidad. Cada parte a su vez se divide en tres partes que muestran la progresión del jugador en esa personalidad. Estas se rellenan en el sentido del reloj y se ilumina la personalidad que estás usando actualmente. Por último en el centro se muestra el arma que usas actualmente.
 - **Armas de clase**: abajo a la derecha aparecen 3 slots con las armas que tiene esa clase. Si las tienes desbloqueadas aparecen a color y si no se muestra solo la silueta. Arriba aparece una pestaña con tu número de munición.
 - **Globo de potenciador**: Cuando un potenciador aparece en el mapa se genera un círculo en la pantalla en la zona donde está el potenciador.

### 5. Visual

En el apartado visual nuestro juego se basará en pixel art, utilizando o creando nosotros mismos los sprites de personajes, armas, enemigos y escenarios.   


- Personaje y enemigos

![Referencia Visual 1](/ReadMe%20Files/RefVisual1.png)    
![Referencia Visual 2](/ReadMe%20Files/RefVisual2.png)  

- Escenario
  
![Referencia Visual 3](/ReadMe%20Files/RefVisual3.png)    
![Referencia Visual 4](/ReadMe%20Files/RefVisual4.png)    
![Referencia Visual 5](/ReadMe%20Files/RefVisual5.png)
![Referencia Visual 7](/ReadMe%20Files/RefVisual7.png)  

- Fuente de las letras
  
![Referencia Visual 6](/ReadMe%20Files/RefVisual6.png)    

### 6. Menú y flujo de juego
![Flujo de Juego](/ReadMe%20Files/FlujoJuego.png)
### 7. Contenido 
#### 7.1 Historia
La historia gira en torno a un hombre con personalidad múltiple el cual tras una crisis de los 40 pierde la razón y empieza a alterar la realidad. Este comienza a ver a la personas como horribles criaturas las cuales debe destruir porque viva USA. Al final del juego tendrás que elegir entre acabar tu vida por el bien de la humanidad o seguir matando gente siendo feliz.
#### 7.2 Objetos 
Potenciadores que puedes encontrar por el mapa(los enemigos pueden conseguir los potenciadores exceptuando bosses)
Los potenciadores aparecen en 5 localizaciones que hay en el mapa cada cierto tiempo. Solo puede haber un potenciador activo en el mapa:
 - Botiquín: Al recogerlo recuperas 20 de vida.
 - Velocidad: Aumentas tu velocidad a 10 durante 3 segundos.
 - Modo Vivu : te quedas dormido 5 segundos.
 - Invencibilidad: eres invencible durante 5 segundos.
### 8. Referencias
[BoxHead](https://www.google.com/search?q=boxhead&source=lmns&bih=786&biw=1536&hl=es&sa=X&ved=2ahUKEwjUg-GDvq-BAxVfmScCHR-sDvIQ0pQJKAB6BAgBEAI)  
[Vampire Survivors](https://www.google.com/search?q=vampire+survivors&sca_esv=565933642&bih=786&biw=1536&hl=es&sxsrf=AM9HkKlfMrDJ13lNJEW_xNfIZPxE9-B7Hg%3A1694879468471&ei=7M4FZZG4G7afkdUP_tuL-A4&gs_ssp=eJzj4tVP1zc0LEgpsizKS0ozYPQSLEvMLcgsSlUoLi0qyyzLLyoGAMJYDAk&oq=vampire+s&gs_lp=Egxnd3Mtd2l6LXNlcnAiCXZhbXBpcmUgcyoCCAAyCxAuGIMBGLEDGIAEMgsQABiABBixAxiDATIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhoQLhiDARixAxiABBiXBRjcBBjeBBjgBNgBAUj4FlAAWJkLcAB4AZABAJgB8QGgAYEIqgEFNi4yLjG4AQHIAQD4AQHCAgcQIxiKBRgnwgILEAAYigUYsQMYgwHCAhEQLhiABBixAxiDARjHARivAcICCBAAGIAEGLEDwgIREC4YgAQYsQMYgwEYxwEY0QPCAgsQLhiABBixAxiDAcICCBAuGIAEGLEDwgIFEC4YgATCAgsQLhiKBRixAxiDAcICGhAuGIAEGLEDGIMBGJcFGNwEGN4EGOAE2AEB4gMEGAAgQYgGAboGBggBEAEYFA&sclient=gws-wiz-serp)  
[Infamous](https://www.google.com/search?q=infamous&sca_esv=565933642&bih=786&biw=1536&hl=es&sxsrf=AM9HkKlfMrDJ13lNJEW_xNfIZPxE9-B7Hg%3A1694879468471&ei=7M4FZZG4G7afkdUP_tuL-A4&ved=0ahUKEwiR3p2Fvq-BAxW2T6QEHf7tAu8Q4dUDCBA&uact=5&oq=infamous&gs_lp=Egxnd3Mtd2l6LXNlcnAiCGluZmFtb3VzMggQLhixAxiABDIIEC4YsQMYgAQyCxAuGIAEGLEDGIMBMgUQLhiABDIFEAAYgAQyBRAAGIAEMgUQLhiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIXEC4YsQMYgAQYlwUY3AQY3gQY4ATYAQFIrDJQuSBYjC1wA3gBkAEAmAF4oAGLBqoBAzUuM7gBA8gBAPgBAcICChAAGEcY1gQYsAPCAgoQABiKBRiwAxhDwgIKEC4YigUYsAMYQ8ICBxAjGIoFGCfCAgQQIxgnwgIHEC4YigUYQ8ICBxAAGIoFGEPCAgsQABiABBixAxiDAcICERAuGIAEGLEDGIMBGMcBGNEDwgIMECMYigUYExiABBgnwgINEAAYigUYsQMYgwEYQ8ICCxAAGIoFGLEDGIMBwgIEEAAYA8ICCxAuGIoFGLEDGIMBwgIIEC4YgAQYsQPCAgsQLhiABBjHARivAcICCBAAGIAEGLEDwgIUEC4YgAQYlwUY3AQY3gQY4ATYAQHiAwQYACBBiAYBkAYKugYGCAEQARgU&sclient=gws-wiz-serp)  
[Survivor.io](https://www.google.com/search?q=survivors+.+io&oq=surviv+&gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg5MgcIARAuGIAEMgYIAhBFGDsyBwgDEAAYgAQyBwgEEAAYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg0Mjg4ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8)  
[Infectonator](https://www.google.com/search?q=infectonator&source=lmns&bih=786&biw=1536&hl=es&sa=X&ved=2ahUKEwi32LCx5tqBAxXkoUwKHR2rAJEQ0pQJKAB6BAgBEAI)  

 ## Assets  

 Los sprites tanto del personaje principal como de los enemigos los hemos creado desde cero con Aseprite y no poseen copyright (**cualquier parecido con alguna obra con copyright es pura coincidencia**). En cuanto a los demás assets como armas o power-ups, algunas las haremos nosotros mismos y otras las sacaremos de alguna página web, dependiendo de si encontramos material disponible o no.
 
 En cuanto a la creación de los mapas en el mapa de ciudad todo lo sacaremos de internet (tiles y decoración) y los otros dos mapas (playa y volcán) haremos una combinación ya que tanto el suelo y (mar y lava) lo haremos nosotros; el resto lo sacaremos de internet.  
 Tema sonidos los sacaremos de alguna página que proporcione sonidos.

   ### Referencias (imagen y sonido)

    (https://itch.io/)
    (https://freesound.org/)
    (https://opengameart.org/)

 




    
    
    

 

 
      


 
