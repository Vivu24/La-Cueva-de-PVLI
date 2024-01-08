import Player from "./player.js"

export default class EscenaPrueba extends Phaser.Scene{
    constructor(){
        super({key: 'A' });

        
    }

    preload(){
        console.log('preload A')
    }
    create(){
        //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        //intancia el player
        this.player = new Player(this, 300, 300);
        //se agrega player a escena
        

        console.log('create A')
    }
    update(){
        this.player.update();
        
    }
}
