import Demo from './scenes/Demo.js';
import Movil from './scenes/Movil.js';
import MainMenu from './scenes/MainMenu.js';
import MelonFlippeador from './scenes/MelonFlippeador.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */

let config = {
  width: 1280,              
  height: 720,            
  type: Phaser.AUTO,      
  parent: 'juego',
  scale: {
    mode: Phaser.Scale.FIT, // cyn: que alguien le pregunte a alguien por que si pongo fit pasan cosas malas
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, 
    min: { // cyn: como le deje escalar se pone a hacer unas cosas rarísimas 
          width: 720,
          height: 480
      },
    max: {
          width: 1280,
          height: 720
      }
  },
  
  scene: [MainMenu, Demo, Movil, MelonFlippeador],
  physics: {
    default: 'arcade', // elegir motor
    arcade: {
      gravity: { y : 500 },
    },
    /*
    matter: {
      gravity: { y: 2 },
      setBounds: {
        left: true,
        right: true,
        top: true,
        bottom: true,
      }
      */
  },

  title: "MBTI",
  version: "1.0.0"
}

new Phaser.Game(config);
