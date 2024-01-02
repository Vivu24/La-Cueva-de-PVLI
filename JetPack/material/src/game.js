import Level from './Level.js';
import Title from './Title.js';
import Boot from './Boot.js';

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ Boot, Title, Level ]
    };

    new Phaser.Game(config);
};