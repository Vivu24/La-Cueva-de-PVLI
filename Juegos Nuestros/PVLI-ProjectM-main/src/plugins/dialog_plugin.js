/*
 * Código extraído de https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/
 * Código extraído de https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-2/ 
 */

/**
 * Esta clase está pensada para crear cuadros de diálogo
 * Las funciones que empiezan por "_" no deberían llamarse nunca desde otras escenas. Pueden romer cosas.
 */
export default class DialogText{

	constructor(scene, opts){
		this.scene = scene;
		this.init(opts);
		// CUSTOM: sonidito en cada letrita
		//this.clack1 = this.scene.sound.add('clack1', { volume: 2}); // sonido de diálogo
		this.clack2 = this.scene.sound.add('clack2', { volume: 10}); // sonido de diálogo
		this.clack3 = this.scene.sound.add('clack3', { volume: 10}); // sonido de diálogo
		this.clacks = [ this.clack2, this.clack3 ];
	}

	init(opts) {
		// Mira si hay parámetros que se pasan, en caso de que no, se usan los por defecto
		if (!opts) opts = {};
		
		// set properties from opts object or use defaults
		this.borderThickness = opts.borderThickness || 3;
		this.borderColor = opts.borderColor || 0x907748;
		this.borderAlpha = opts.borderAlpha || 1;
		this.windowBorderRadius = opts.windowBorderRadius || 4;
		this.windowAlpha = opts.windowAlpha || 0.8;
		this.windowColor = opts.windowColor || 0x303030;
		this.windowHeight = opts.windowHeight || 150;
		this.padding = opts.padding || 32;
		this.hasCloseBtn = opts.hasCloseBtn || false;
		this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
		this.dialogSpeed = opts.dialogSpeed || 3;
		this.fontSize = opts.fontSize || 24
		this.fontFamily = opts.fontFamily || undefined

		//////////////////////////////
		this.animating = false;
		this.fullText;
		//////////////////////////////

		// se usa para animar el texto
		this.eventCounter = 0;
		
		// si la ventana de diálogo se muestra
		this.visible = true;
		
		// texto que hay en la ventana
		this.text;
		
		// texto que se renderizará en la ventana
		this.dialog;
		this.graphics;
		this.closeBtn;
		
		//Crea la ventana de dialogo
		this._createWindow();
	}

	// Método que cierra y abre la ventana de diálogo
	toggleWindow() {
		this.visible = !this.visible;
		if (this.text) 
			this.text.visible = this.visible;
		if (this.graphics) 
			this.graphics.visible = this.visible;
		if (this.closeBtn) 
			this.closeBtn.visible = this.visible;
	}

	/**
	 * 
	 * @returns - si el texto ha acabado de animarse o no
	 */
	getAnimating() {
		return this.animating; 
	}

	setAnimating(animate) {
		this.animating = animate;
	}

	// con esta función se nos permite añadir texto a la ventana
	// Este método se llamara desde la escena que corresponda
	setText(text, animate) {
		//el parametro animate nos permite saber si el texto sera animado o no
		this.eventCounter = 0;
		this.fullText = text;
		//se crea un array con cada caracter en la cadena de texto y se 
		// guarda en la propiedad diálogo
		this.dialog = text.split('');

		//se mira si hay otro evento de tiempo corriendo y lo elimina
		if (this.timedEvent) 
			this.timedEvent.remove();

		//esta variable es un string vacio si animate es true, de otra manera es la variable text
		var tempText = animate ? '' : text;
		
		//llama al metodo que calcula la pos del texto y lo crea
		this._setText(tempText); 

		if (animate) {
			//se crea un evento temporizado
			this.timedEvent = this.scene.time.addEvent({
				//delay indica el tiempo en ms hasta que se empieza el evento      
				delay: 150 - (this.dialogSpeed * 30),
				//se llama a la funcion de animar el texto
				//Cada vez que se llama a la funcion de animar se aumenta el eventCounter
				callback: this._animateText,
				//especifica en qué scope se muestra el texto
				callbackScope: this,
				//el evento se repite
				loop: true
			});
		}
		else {
			this.animating = false;
		}
	}

	// IMPORTANTE: para que sea clickable y tenga onpointerdown en caso de true y para esperar a una decision en caso de false
	setInteractable(value) {
		//Obtenemos las dimensiones del juego
		var gameHeight = this._getGameHeight();
		var gameWidth = this._getGameWidth();

		//Se calcula la dimension de la ventana de diálogo
		var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);

		if (value) {
			this.graphics.setInteractive(new Phaser.Geom.Rectangle(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
		}
		else {
			clearInterval(this.scene.skipInterval);
			this.graphics.disableInteractive();
		}
	}

	// otro método propio
	getInteractable() {
		if (this.graphics.input.enabled)
			return true;
		return false;
	}

	// Consigue el ancho del juego (en funcion del tamaño en la escena) 
	_getGameWidth() {
		return this.scene.sys.game.config.width;
	}

	// Consigue el alto del juego (en funcion del tamaño de la escena) 
	_getGameHeight() {
		return this.scene.sys.game.config.height;
	}

	// Calcula las dimensiones y pos de la ventana en funcion del tamaño de la pantalla de juego
	_calculateWindowDimensions(width, height) {
		var x = this.padding;
		var y = height - this.windowHeight - this.padding;
		var rectWidth = width - (this.padding * 2);
		var rectHeight = this.windowHeight;
		return {
			x,
			y,
			rectWidth,
			rectHeight
		};
	}

	// Crea la ventana interior, donde se muestra el texto 
	_createInnerWindow(x, y, rectWidth, rectHeight) {
		//rellena con el color y alpha especificados en las propiedades
		this.graphics.round
		this.graphics.fillStyle(this.windowColor, this.windowAlpha);
		
		//Se crea el rectangulo pasandole las propiedades de posicion y dimensiones
		this.graphics.fillRoundedRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1, this.borderRadius);
	}

	// Creates the border rectangle of the dialog window
	_createOuterWindow(x, y, rectWidth, rectHeight) {
		//Se usa para especificar el estilo de la linea exterior: grosor, color...
		this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
		
		//permite dibujar un rectangulo sin darle relleno
		this.graphics.strokeRoundedRect(x, y, rectWidth, rectHeight, this.borderRadius);
	}

	// Método que crea la ventana de diálogo
	_createWindow() {
		//Obtenemos las dimensiones del juego
		var gameHeight = this._getGameHeight();
		var gameWidth = this._getGameWidth();

		//Se calcula la dimension de la ventana de diálogo
		var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
		this.graphics = this.scene.add.graphics();
		this.graphics.setInteractive(new Phaser.Geom.Rectangle(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });

		//Se crean las ventanas interior y exterior
		this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
		this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
		
		if (this.hasCloseBtn) 
		{
			this._createCloseModalButton(); //se muestra el boton de cerrar en la ventana
			this._createCloseModalButtonBorder(); // se muestra el borde del boton de cerrar
		}
	}

	// Con el siguiente código se crea el boton de cerrar la ventana de diálogo
	_createCloseModalButton() {
		var self = this;
		this.closeBtn = this.scene.make.text({
			//se crea el boton con las posiciones x e y siguientes
			// se calculan de forma dinámica para que funcione para diferentes tamaños de pantalla
			x: this._getGameWidth() - this.padding - 14,
			y: this._getGameHeight() - this.windowHeight - this.padding + 3,
			
			//el boton queda representado como una X con su estilo debajo
			text: 'X',
			style: {
				font: 'bold 12px TimesNewRoman',
				fill: this.closeBtnColor
			}
		});
		
		this.closeBtn.setInteractive(); //hace interactuable el boton de cierre
		this.closeBtn.on('pointerover', function () {
			this.setTint(0x000000); //cuando el cursor se encuentra encima se cambia de color
		});
		this.closeBtn.on('pointerout', function () {
			this.clearTint(); //vuelve al color original al quitar el cursor
		});
		this.closeBtn.on('pointerdown', function () {
			self.toggleWindow(); //se llama al método que cierra o muestra la ventana de diálogo
			
			// elimina el game object con el texto y borra el evento
			if (self.timedEvent) 
				self.timedEvent.remove();
			if (self.text) 
				self.text.destroy();
		});
	}

	// Se crea el borde del botón
	_createCloseModalButtonBorder() {
		var x = this._getGameWidth() - this.padding - 20;
		var y = this._getGameHeight() - this.windowHeight - this.padding;
		
		//Se crea el borde del botón sin relleno
		this.graphics.strokeRoundedRect(x, y, 20, 20, this.borderRadius);
	}

	// Hace aparecer al texto lentamente en pantalla
	_animateText() {
		this.eventCounter++;
		
		//se va actualizando el texto de nuestro game object llamando a setText
		this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
		
		if (this.animating === false) 
			this.animating = true;

		////////////////////////////////////////
		if (
			//!this.clack1.isPlaying && 
			!this.clack2.isPlaying 
			&& !this.clack3.isPlaying) {
			const index = Math.floor(Math.random() * this.clacks.length);
			this.clacks[index].play();
			//this.clack.play();
		}
		///////////////////////////////////////


		//Cuando eventCounter sea igual a la longitud del texto, se detiene el evento
		if (this.eventCounter === this.dialog.length) {
			this.timedEvent.remove();
			this.animating = false;
		}
	}

	// Calcula la pos del texto en la ventana
	_setText(text) {
		// Resetea el game object del texto si ya estaba seteada la propiedad del texto del plugin
		if (this.text) 
			this.text.destroy();

		var x = this.padding + 10;
		var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

		//Crea un game object que sea texto
		this.text = this.scene.make.text({
			x,
			y,
			text,
			style: {
				//se obliga al texto a permanecer dentro de unos limites determinados
				wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 },
				fontSize: this.fontSize,
				fontFamily: this.fontFamily
			}
		});
	}
};