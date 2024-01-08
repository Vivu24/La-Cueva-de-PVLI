## **DECISIONES SOBRE LA ARQUITECTURA:**

> - una sola escena, cuyo dialogue manager interpretara JSONS iterando sobre un diccionario
> - sistema de texto independiente
> - player manager
> - móvil como objeto

# **ARQUITECTURA DEL JUEGO**

Una sola escena que crea un dialogue manager y un player manager, que gestionan los scripts en formato JSON cargados en el preload.

-	-	-	-	-	-	-	-	-	-	-	-	-

El movimiento por escenarios está gestionado por eventos en los JSON de los diferentes scripts de los periodos diarios.

-	-	-	-	-	-	-	-	-	-	-	-	-

El manager de diálogo debe ser completamente independiente de la arquitectura de las escenas. Se puede hacer algo que simplemente le pasas todo el texto que quieres que tenga el diálogo y te lo muestre. Puede también manejar las expresiones de los personajes.

-	-	-	-	-	-	-	-	-	-	-	-	-

Es necesario un player manager que te almacene todo el estado del jugador, su relación con cada personaje, etc. Interactúa directamente con el sistema de diálogo ya que este cambiará parámetros del player manager dependiendo de las decisiones que tomes. 

Si se quiere hacer un sistema de guardado de partida esto podría escribir en un txt todos los datos que almacena y si montamos bien el juego, al iniciarse y cargar datos de guardado se leería del txt y el juego se pondría en el estado correcto.

-	-	-	-	-	-	-	-	-	-	-	-	-

Tema móvil: dependiendo de lo que elijas hacer con el móvil se te lleva a una escena u otra. Rollo apps.

-	-	-	-	-	-	-	-	-	-	-	-	-

Los minijuegos cada uno a su bola en su escena, sólo interactuando con todo lo demás para las recompensas de xp.

-	-	-	-	-	-	-	-	-	-	-	-	-


>>> delilah brujita; matthew esqueleto; richard cientifico loco; camille vampiresa


no tengo ni idea de si se me está olvidando algún sistema del juego, es posible
