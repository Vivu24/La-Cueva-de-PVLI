import Level from './Level.js';
import Title from './Title.js';
import Boot from './Boot.js';

const config = {
    type: Phaser.AUTO,
	parent: 'game',
    scale: {
        width: 600,
        height: 850,
        zoom: 0.8,
        autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            enableSleeping: true
        }
    },
    backgroundColor: '#f5e393',
    scene: [ Boot, Title, Level ],
	title: "Suika",
	version: "1.0.0"
};

new Phaser.Game(config);