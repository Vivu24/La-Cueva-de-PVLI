import Level from "./Level.js";
import Boot from "./Boot.js";
import Title from "./Title.js";

let config = {
	type: Phaser.AUTO,
	parent: 'juego',
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		width: 512,
		height: 512,
		zoom: 1
	},
	scene: [Boot, Title, Level],
	physics: { 
		default: 'arcade', 
		arcade: { 
			//gravity: { y: 200 }, 
			debug: true 
		},
		checkCollision: {
			up: true,
			down: true,
			left: true,
			right: true
		}
	},
	title: "PVLI Ordinaria 23/24",
	version: "1.0.0",
	transparent: false
};

new Phaser.Game(config);