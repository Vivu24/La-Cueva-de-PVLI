import DialogText from "../plugins/dialog_plugin.js";
import Decision from "../objects/decision.js";
import Character from "../objects/character.js"
/**
 * Clase que maneja la lógica de diálogo
 * @extends Container
 */
export default class DialogueManager extends Phaser.GameObjects.Container {
	/**
	 * @param {*} scene - 
	 * @param {*} playerManager - playerManager de la escena
	 * @param {*} dayData - json del dia
	 * @param {*} characters - objeto de objetos character
	 * @param {*} dialog - ventana de dialogo (asume que ya existe)
	 * @param {*} nineslice - key al sprite para el nineslice de los botones de las decisiones
	 * @param {*} sound - key al sonido para cada avance en el diálogo
	 */
	constructor(scene, playerManager, dayDatas, characters, nineslice, sound) {
		super(scene, 0, 0);

		////////////////////////////////////////////////////////
		////////        PARÁMETROS IMPORTANTES         /////////
		////////////////////////////////////////////////////////

		// crea la ventana de diálogo
		scene.dialog = new DialogText(scene, {
			borderThickness: 6,
			borderColor: 0xF6F6F6,
			borderAlpha: 0.8,
			windowBorderRadius: 4,
			windowAlpha: 0.95,
			windowColor: 0xFF799A,
			windowHeight: 150,
			padding: 18,
			hasCloseBtn: false,
			closeBtnColor: 'white',
			dialogSpeed: 4,
			fontSize: 24,
			fontFamily: "lato"
		});
		scene.dialog.depth = 2;

		// importante, todos los jsons parseados a un diccionario que contiene cada periodo de cada dia
		let dayData = dayDatas["dia1mData"]; // predeterminado
		let i = 0; // contador del periodo del día
		setDayData(i); // dia inicial, sea cual sea, en el diccionario

		// parámetros
		const blip = scene.sound.add(sound, { volume: 1 }); // sonido de diálogo
		let title = "\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3"; // primera línea de título (sí, es justo lo que estás pensando, tiene todos esos espacios para que esté centrada (lo siento mucho))
		let clicks = 0; // para contar dos clicks antes de decidir, una guarra da pero son las 6 de la mañana bestie
		let node = dayData.root.next; // primer nodo
		scene.dialog.setText(title, false); // imprime la línea de título
		disableBehaviours();
		Character.onExitEveryone(characters);


		////////////////////////////////////////////////////////
		/////////////   FUNCIONES Y CALLBACKS   ////////////////
		////////////////////////////////////////////////////////

		// !!! LOGICA DE VERDAD POR FIN VAMOSSSSSSSSSSSSSSS !!!
		// Controles:
		/** 
		 *  Barra espaciadora y click izquierdo avanzan el diálogo
		 *  Flecha hacia arriba y click derecho retroceden el diálogo hasta donde sea posible
		 */
		scene.input.keyboard.on('keydown-SPACE', forward); // barra espaciadora
		scene.input.keyboard.on('keydown-UP', backward); // flecha arriba
		scene.dialog.graphics.on('pointerdown', callback); // click en el cuadro de diálogo, independiente de cual sea
		scene.input.keyboard.on('keydown-CTRL', setSkip, this);
		scene.input.keyboard.on('keyup-CTRL', clearSkip, this);

		/**
		 * Método para cambiar de JSON del que se están leyendo los nodos dentro  de un diccionario de los datos diarios.
		 * @param {*} index - índice del perido de día a cargar en el diccionario de días
		 */
		function setDayData(index) {
			let dayIndex = index;
			let key = Object.keys(dayDatas)[dayIndex];
			dayData = dayDatas[key];
		}

		/**
		 * callback para gestionar si el click es izquierdo o derecho
		 */
		function callback() {
			if (scene.input.activePointer.rightButtonDown()) // click derecho
				backward(); // hacia atras
			else // si no es el click derecho sera el izquierdo XD o si no el medio pero nos da un poco igual tbh 
				forward();
		}

		/** 
		  * callback que avanza el diálogo si y solo si el diálogo es interactuable
		  */
		function forward() {
			// si el diálogo es interactuable y node existe
			if (scene.dialog?.getInteractable() && node != undefined)
				// si es un click mientras el texto anterior todavía se está animando
				if (scene.dialog.getAnimating())
					scene.dialog.setText(scene.dialog?.fullText, false); // lo acaba de animar al instante
				else
					next();
		};

		/**
		 * función para pasar al siguiente nodo y gestionar según qué tipo sea
		 * realmente está hecho para que sea más legible el código y no haya tantos indents
		 */
		function next() {
			// nodo actual, el personaje que habla y su nombre
			let currentNode = dayData[node]; // para hacerlo más legible (sigue siendo infumable pero bueno)
			let currentName = currentNode?.name.toLowerCase(); // idem
			let currentCharacter = characters[currentName];  // idem

			// enfoque de personajes
			currentCharacter?.onFocus(); // si existe current character, lo enfoca
			currentCharacter?.unfocusEveryoneElse(characters); // y desenfoca al resto

			// si es un nodo intermedio y/o tiene tiene elecciones
			if (currentNode?.hasOwnProperty("next")
			|| currentNode?.hasOwnProperty("choices")
			|| currentNode?.hasOwnProperty("conditions")
			|| currentNode?.hasOwnProperty("signals")) {
				manageNode(currentNode);
			}
			// si lo anterior no se cumple, significa que es el nodo final
			else {
				speak(currentNode, true);
				setDayData(++i);
				node = dayData.root.next;
				//Character.unfocusEveryone(characters); // se desenfoca a todo el mundo para acabar
			}
		}

		/**
		 * Gestiona el nodo y sus distintas características
		 * @param {*} currentNode - nodo a manejar 
		 */
		function manageNode(currentNode) {
			// reproduce sonido con cada avance de diálogo
			blip?.play();

			// si solo ha habido un click, escribe el mensaje
			if (clicks < 1)
				speak(currentNode, true);

			// si el nodo ha de emitir un evento, lo emite
			///////////     EVENTO      ////////////
			if (currentNode.hasOwnProperty("signals")) 
				signal(currentNode);	

			// si el nodo lleva a una decisión
			//////////     DECISION     ///////////
			if (currentNode.hasOwnProperty("choices")) {
				if (clicks >= 1) // manera muy guarra de necesitar dos clics antes de que aparezca la decision
					choice(currentNode, clicks);
				else clicks++;
			}

			// si el nodo contiene una condición
			//////////     CONDICION     //////////
			else if (currentNode.hasOwnProperty("conditions")) // else porque por definicion no puede haber nodos con tanto decisiones como condiciones a la vez
				condition(currentNode);

			// si no se cumple ninguna de las condiciones anteriores es simplemente continuacion lineal, tiene next
			//////////      NEXT     //////////
			else node = currentNode?.next;
		}

		/**
		 * GESTIÓN DE EVENTO
		 */
		function signal(currentNode){
			let currentEvent = currentNode?.signals?.eventName?.String;
			let currentValue = currentNode?.signals[currentEvent]?.String?.toLowerCase();
			if (currentEvent == undefined) {
				console.log("!!!AVISO: EVENTO NULO!!!\n En el nodo: " + currentNode);
				console.log("En la señal: " + currentNode.signals);
			}
			else scene.eventEmitter?.emit(currentEvent, currentValue);
			//primer parametro es el nombre del evento y el segundo es el valor que se quiere (por como funciona el editor de nodos es lo que hay)
			/* 
			!!! FORMATO EN JSON !!!
			"signals": {
				"parent": "1c73a86e-0677-495c-a560-63f69179dbfa",
				"eventName": {
					"String": "\"affinityUp\""	//este parametro indica el nombre del evento para poder acceder a el y al valor que se le quiere pasar
				},
				"affinityUp": {
					"String": "camille"		//este otro parametro es el valor que se quiere
				}
			}
			*/
		}

		/**
		 * GESTIÓN DE DECISISÓN
		 */
		function choice(currentNode) {
			scene.decision = new Decision(scene, currentNode.choices, nineslice); // genera una nueva decisión
			clicks = 0; // resetea el contador de clicks
			scene.dialog.setInteractable(false); // desactiva la interaccion del cuadro de diálog hasta que se escoga una opción en el evento decided de decisonButtono
			clearSkip();
		}

		/**
		 * GESTIÓN DE CONDICIÓN
		 */
		function condition(currentNode) {
			let _conditions = currentNode.conditions //hacemos un array con todas las condiciones 
			let conditionCheck = false; //flag para solo comprobar una condicion
			let i = 0; // contador de condición
			while (i < _conditions.length && !conditionCheck) {
				if (checkConditions(_conditions[i], playerManager)) { //si se cumple la condicion entonces hacemos que el siguiente nodo sea el que esta indica
					node = _conditions[i].next;
					conditionCheck = true;
				}
				i++; //si no se cuumple avanzamos a la siguiente condicion
			}
		}

		/**
		 * callback que retrocede en el diálogo hasta que se encuentre un nodo especial (con check, señal o decision)
		 * ESTÁ TAAAAN MAL HECHO PERO QUEDAN COMO 5 DÍAS Y HAY QUE TENER COMO 10 FUNCIONALIDADES MÁS POR FAVOR TEN PIEDAD 
		 */
		function backward() {
			if (scene.dialog?.getInteractable() // si el diálogo es interactuable
				&& node != undefined // si nodo existe
				&& !dayData[node]?.hasOwnProperty("signals") 	// si no estás justo en una señal
				&& !dayData[node]?.hasOwnProperty("conditions")// si no estás justo en una comprobación
				&& !dayData[node]?.hasOwnProperty("choices")) 	// si no estás justo antes de una decisión
			{
				// tiene que retroceder dos veces porque con cada click el nodo se deja en el siguiente para escribirlo lo primero... venga, va... no me mires asi...
				// referencia al nodo real (solo el ID)
				let real = dayData[node].parent;
				// referencia al nodo padre (solo el ID)
				let padre;
				// nodo padre (el objeto entero)
				let prevNode;
				// si tiene padre siquiera
				if (dayData[real]?.hasOwnProperty("parent")) { // me he fumao un petardacoooo con cada linea de codigo de este método del demonioooooooooooooOOOOooOoo
					padre = dayData[real].parent; // le asigna su referencia y su nodo
					prevNode = dayData[padre];
				}

				if (padre != undefined // si la referencia al padre existe
					&& padre != "root" // y no es la raiz (no estás el primer nodo)
					&& prevNode != undefined // si el padre existe
					&& !prevNode.hasOwnProperty("choices") // si no vas a volver a una decision
					&& !prevNode.hasOwnProperty("conditions") // ni a una condicion
					&& !prevNode.hasOwnProperty("signals")) {  // ni a una señal
					node = dayData[node].parent; // vuelve atrás
					speak(prevNode, false); // blablabla
				}
			}
		}

		// escribir el texto en el cuadro de dialogo :-)
		function speak(currentNode, animate) {
			let name = currentNode.name;
			const names = Object.values(characters).map(character => character.nombre);
			let valid = names.includes(name);
			let caracter = currentNode.text.es[0];
			if (name == undefined || !valid) // si el nombre del nodo es undefined, habla y/n
			{
				name = "Y/N";
				if (
					caracter === '(') {
					Character.unfocusEveryone(characters);
				}
				else
					Character.focusEveryone(characters);
			}
			scene.dialog?.setText(name + ":\n" + currentNode.text.es, animate); // se escribe el último msj
		}

		/** 
		 * para interceptar comportamientos indeseados 
		*/
		function disableBehaviours() {
			scene.input.mouse.disableContextMenu();
			scene.cursor = scene.input.keyboard.createCursorKeys();
		}

		/**
		 * Método para parar de saltar texto
		 */
		function clearSkip() {
			if (scene.skipInterval) {
				clearInterval(scene.skipInterval);
				scene.skipInterval = undefined;
			}
		}

		/**
		 *  Método para inicializar el salto de texto
		 */
		function setSkip() {
			if (scene.decision === undefined && scene.skipInterval === undefined) {
				scene.skipInterval = setInterval(forward, 50);
			}
		}



		///////////////////////////////////////////
		/////////      LISTENERS !!!     //////////
		///////////////////////////////////////////
		// con sus callbacks

		/// BLOQUE DE ESCUCHA PARA ENTRADA Y SALIDA DE PERSONAJES
		// OJO: El FORMATO para lanzar un evento desde el programa de los JSON sería tal que:
		// EMIT eventName STRING characterEnter
		// EMIT characterEnter STRING camille
		// -------------
		// Nombre del evento: 'characterEnter'
		// Personaje: 'camille'
		// Ambos strings, excepto con los de everyoneExit/Enter, que no necesitan personajes

		// Un personaje en concreto entra en escena
		scene.eventEmitter.on('characterEnter', function (character) {
			let name = character.toLowerCase();
			characters[name].onEnter(characters);
		})

		// Un personaje en concreto sale de escena
		scene.eventEmitter.on('characterExit', function (character) {
			let name = character.toLowerCase();
			characters[name].onExit(characters);
		})

		// Todos los personajes entran en escena
		scene.eventEmitter.on('everyoneEnter', function () {
			Character.onEnterEveryone(characters);
		})

		// Todos los personajes salen de escena
		scene.eventEmitter.on('everyoneExit', function () {
			Character.onExitEveryone(characters);
		})

		/**
		 * Receptor del evento decided, que viene de decisionButton.
		 * Cuando una opcion es escogida, actualiza el nodo en corcondancia
		 */
		scene.eventEmitter.on('decided', function (valor) {
			blip?.play(); // si el sonido existe lo reproduce
			let decidida = dayData[node].choices[valor]
			Character.focusEveryone(characters); // se enfoca a todo el mundo al hablar
			speak(decidida, true);
			node = decidida.next; // pasa al siguiente nodo
			scene.dialog?.setInteractable(true); // devuelve la interaccion al cuadro de diálogo
			scene.decision?.destroy(); // destruye la decison
			scene.decision = undefined;
			clearSkip();
		});

		/**
		 * Receptor del evento affinityUp, que viene de esta misma clase.
		 * Cuando se recoge una señal de este tipo, sube la afinidad del personaje indicado
		 */
		scene.eventEmitter.on('affinityUp', function (valor) {
			playerManager?.increaseAffinity(valor);

			//Colocamos el fedback de afinidad
			scene.animateAffinity(valor);
		});

		scene.eventEmitter.on('changeBg', function (valor) {
			scene.changeScenary(valor);
		});

		scene.eventEmitter.on('changeMusic', function (valor) {
			scene.changeMusic(valor);
		});
	}
}


/**
 * Este método comprueba que la condición dada (recibida por un evento en el json) es mayor 
 * o igual a la afinidad que el jugador tiene con el personaje de la condicion
 * @param {*} condicion - la condicion a comprobar
 * @param {*} playerManager - referencia al jugador
 * @returns 
 */
function checkConditions(condicion, playerManager) {
	let charName;
	switch (condicion.charNum.value) //por desgracia los nodos de condiciones no dejan tener como parametro una string asi que se utiliza la codificacion de los personajes usada anteriormente
	{
		case 0: charName = "camille"; break;
		case 1: charName = "delilah"; break;
		case 2: charName = "matthew"; break;
		case 3: charName = "richard"; break;
	}
	//console.log(charName);
	let affVal = playerManager.affinities[charName].points; //afinidad del personaje a mirar
	//console.log(affVal);
	if (condicion.affValue.operator == "lower") //dependiendo del operador de la condicion se comprueba una cosa u otra
		return affVal < condicion.affValue.value; //el value es el valor con el que se quiere comparar la afinidad actual
	else if (condicion.affValue.operator == "equal")
		return affVal == condicion.affValue.value;
	else
		return affVal > condicion.affValue.value;
}