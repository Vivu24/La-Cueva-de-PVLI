import Breakout from './breakout.js';
const config = {
    type: Phaser.AUTO,
    width:800,
    height: 600,
    scene:[Breakout],
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 400},
            debug: false,
        }
    }
    
}
var game = new Phaser.game(config)