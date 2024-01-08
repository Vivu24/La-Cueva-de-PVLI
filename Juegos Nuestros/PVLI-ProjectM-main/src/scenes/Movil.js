import Button from "../objects/button.js";

export default class Movil extends Phaser.Scene {
	constructor() {
		
		super({ key: 'movil'});
	}

	preload (){
		this.canvas = this.sys.game.canvas;

		// fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.image('movilph', './assets/images/escenarios/movilPH.png');

		// boton de vuelta
		this.load.image('goBackBox', './assets/images/escenarios/goBack2.png');

		// boton melon flip
		this.load.image('melonflip', './assets/images/movil/melonFlip.png');

		// musiquita de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo(esto ultimo no importa, solo es para que quede mas bonito))
		this.load.audio('movil_music', "./assets/sounds/bgm/dogs-and-cats/Dogs_and_Cats.mp3");

	}

	create (){

		this.music  = this.sound.add("movil_music", { loop: true });
		this.music.play();

		const scene = this // referencia a esta misma escena
		// pone el fondo
		let bg = this.add.image(0, 0, 'movilph').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

		// boton de vuelta
		let but1 = new Button(this, 100, 320, ' ', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("Demo", scene) } );

		// boton de melon flip
		let but2 = new Button(this, 300, 250, ' ', 2, 'melonflip', { "ClickCallback": () => this.ChangeScene("melonFlippeador", scene) }).setScale(0.75);
	}

	//Solo se utiliza para la música
	update() {
		if(!this.music.isPlaying) {
			this.music.play()
		}
	} 

	ChangeScene(newScene, escena){
		escena.scene.switch(newScene);
		this.music.pause();

	}

  }
