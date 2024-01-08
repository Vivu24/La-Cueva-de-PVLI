
/**
 * Clase que representa a un boton clickable para cambiar de escena.
 * @extends Container
 */
export default class Button extends Phaser.GameObjects.Container {
	/**
	 * Contructor del boton 
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} text // txt
	 * @param {int} depth - numero de capa (frente o fondo)
	 * @param {String} boxSprite // sprite de la caja
	 * @param {number} nextbg // escenario al que va
	 */

	constructor(scene, x, y, text, depth, boxSprite, { ClickCallback, EnterCallback, ExitCallback }) {

		// super a la escena
		super(scene, x, y);

		// crea la caja
		this.box = new Phaser.GameObjects.Sprite(scene, x, y, boxSprite);
		this.box.setScale(2, 2);
		this.add(this.box);
		this.depth = depth;
		x -= 30
		y -= 10;
		const tryout = scene.make.text({
			x,
			y,
			text,
			style: {
				fontSize: 20,
				fontFamily: 'lato'
			}
		})

		this.add(tryout);

		// añade el container
		scene.add.existing(this);

		// lo hace interactivo
		this.box.setInteractive();

		// interaccion con la caja
		if (ClickCallback)
			this.box.on('pointerdown', ClickCallback);

		//Reconoce que el ratón está encima de la función
		if (EnterCallback)
			this.box.on('pointerover', EnterCallback);

		//Reconoce que el raton sale del botón
		if (ExitCallback)
			this.box.on('pointerout', ExitCallback);
	}
}