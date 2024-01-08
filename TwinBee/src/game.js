import Level from './Level.js';
import Title from './Title.js';
import Boot from './Boot.js';
import Pause from './Pause.js'

let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    width:  656,
    height: 376,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
        width: 256,
        height: 256,
		zoom: 1
    },
    scene: [Boot, Title, Level, Pause],
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
    title: "PVLI Extraordinaria 22/23",
    version: "1.0.0",
    transparent: false
};

new Phaser.Game(config);