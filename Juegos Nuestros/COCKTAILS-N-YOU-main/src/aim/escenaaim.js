import Aim from "./aim.js"

const config = {
    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.CANVAS,
    scene: [Aim],
    scale: {
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,

      // Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
      // con un mínimo y un máximo de tamaño
      mode: Phaser.Scale.FIT,
      min: {
              width: 240,
              height: 120
          },
      max: {
              width: 800,
              height: 600
          },
      zoom: 1
    },
    physics: { 
      default: 'arcade', 
      arcade: { 
          gravity: { y: 0 }, 
          debug: true
      },
      checkCollision: {
        up: true,
        down: true,
        left: true, 
        right: true
      }  
    }
   
}
var game = new Phaser.Game(config)