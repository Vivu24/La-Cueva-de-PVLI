import Button from "../objects/button.js";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		
		super({ key: 'mainMenu'});
	}

	preload () {
		this.canvas = this.sys.game.canvas;
		const { width, height } = this.canvas; // la anchura y altura del canvas

		////////////////////////////////
		////////    PRELOADER     //////
		////////////////////////////////
		// segmento sacado de:
		// https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
		// gracias a toni <3
		//progressbar
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		let bar_width = width/2;
		let bar_height = 70;
		let bar_x = (width - bar_width)/2;
		let bar_y = (height - bar_height)/2;
		let size_diff = 10;
		progressBox.fillStyle(0xFF799A, 0.8);
		progressBox.fillRect(bar_x, bar_y, bar_width, bar_height);

		//loading text
		let loadingText = this.make.text({
			x: width / 2,
			y: bar_y + 150,
			text: 'Loading...',
			style: {
				font: '24px monospace',
				fill: '#FFFFFF'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		// percent text
		let percentText = this.make.text({
			x: width / 2,
			y: bar_y + 200,
			text: '0%',
			style: {
				font: 'bold 24px monospace',
				fill: '#FF799A'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		// asset text
		let assetText = this.make.text({
			x: width / 2,
			y: height - 60,
			text: 'Asset:',
			style: {
				font: '18px monospace',
				fill: '#FFFFFF'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		 
		// listeners
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(bar_x + size_diff, bar_y + size_diff, (bar_width - size_diff * 2) * value, bar_height - size_diff* 2);
		});
					
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
		////////////////////////////////////////////

		// fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.image('fondo_main', './assets/images/fondoweb/fondoraro.png');

		// boton de play
		this.load.image('logo', './assets/images/logo/logoconsombrapeque.png');

		//Musica de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.audio('main_music', "./assets/sounds/bgm/dogs-and-cats/Dogs_and_Cats.mp3");
	}

	create (){
		//Añadimos la musiquita y le damos al play
		this.music = this.sound.add("main_music", { loop: true });
		this.music.play();

		const scene = this // referencia a esta misma escena
		// pone el fondo
		let bg = this.add.image(0, 0, 'fondo_main').setScale(0.5).setOrigin(0, 0);
		bg.depth = -2;

		// boton de play
		let playButton = new Button(this, 315, 175, ' ', 2, 'logo', { "ClickCallback": () => this.changeScene("Demo", scene),
																			"EnterCallback": () =>this.overButton(playButton),
																			"ExitCallback": () => this.exitButton(playButton) } );
		playButton.box.setScale(0.75, 0.75);
		playButton.box.setOrigin(0.5,0.5);
		
		this.playTween = this.tweens.add({
			targets: playButton.box,
			ease: 'Sine.easeInOut',
			scale: 0.85,
			duration: 500,
			yoyo: true,
			repeat: -1,
			persist: true
		})

	}

	changeScene(newScene, escena){
		escena.scene.switch(newScene);
		
		//pausamos la música para poder cambiarla
		this.music.pause();
	}

	overButton(but) {
		but.box.tint = "0xc24d6d" ;
		this.playTween.pause();
		
	}

	exitButton(but) {
		but.box.tint = "0xF6F6F6" ;
		this.playTween.play();
	}

  }