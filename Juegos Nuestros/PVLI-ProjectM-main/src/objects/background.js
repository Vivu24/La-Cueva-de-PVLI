export class Background extends Phaser.GameObjects.Container {
	/**
	 * Contructor del sombrero
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} bg// txt
	 * @param {number} scale
	 * 
	 */

	constructor(scene, x, y, bg) {
		
		// super a la escena
		super(scene, x, y);

        scene.add.image(x, y, bg).setScale(scale, scale).setOrigin(0, 0);

		// añade el container
    	scene.add.existing(this);
	}

	
  }

	