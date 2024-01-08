import pelota from "./pelota.js"
import Barra from "./barra.js";
import { others } from "../Cocktails.js";
import PauseMenu from "../scenes/PauseMenu.js";

import {  addCustomerPoints, addMinigame, other } from "../scenes/GameManager.js";
export default class Breakout extends Phaser.Scene {
   constructor() {
       super({ key: 'Breakout' });
       this.blockConfig = {
           width: 80,
           height: 30,
           cols: 8,
           rows: 4,
           xOffset: 60,
           yOffset: 100,
       };

       
   }
   create() {
    //Pausa
    //this.scene.add('PauseMenu', PauseMenu, false);
    this.input.keyboard.on('keydown-ESC', () => {
        // Pausar el juego y mostrar el menú de pausa
        this.sound.pauseAll();
        this.scene.pause();
        this.scene.launch('PauseMenu');
    });
    // Añadimos la música
    this.add.music = this.sound.add('breakoutMusic', { loop: true, volume: 0.35 });
    this.paddleHitSound = this.sound.add('boing',{volume: 0.50});
    this.borderHitSound = this.sound.add('reboundWall',{volume: 0.50});
    this.blockDestroySound = this.sound.add('destroy',{volume: 0.50});
    // Reproduce la música
    this.add.music.play();

    this.fruta = other
       this.physics.world.setBoundsCollision(true, true, true, false);
       this.background = this.add.image(400, 300, 'backgroundBreakout').setDepth(0);
       this.background.setScale(1);

       this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
       this.gameoverImage.visible = false;

       this.win = this.add.image(400, 300, 'win').setScale(0.8);
       this.win.visible = false;
       

       

       // barra
       this.paddle = new Barra(this,400,560).setImmovable();
       this.paddle.setCollideWorldBounds(true);

       // pelota
       this.ball = new pelota(this, this.paddle.x, this.paddle.y -25)
       this.ball.setCollideWorldBounds(true);
       
        // movimiento con cursores
        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            p: Phaser.Input.Keyboard.KeyCodes.P
        });

       // tecla de espacio
       //this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

       // colisiones
       this.physics.add.collider(this.ball, this.paddle,() => this.paddlecollision());
       

       // Crear bloques
       this.createBlocks();

       // Contadores de frutas
       this.cont = 0
       this.azucarCount = 0;
       this.hierbabuenaCount = 0;

       // Frutas disponibles
      
       let x;
       let y;
       let xf;
       let yf;
       let col;
       //frutita contador
       if(this.fruta == 'azucar'){
        this.azucarCountText = this.add.text(20,550, `Azúcar: ${this.cont} /4`, {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            fill: '#fff'
        }).setDepth(1);
       }
       else{
        this.hierbabuenaCountText = this.add.text(20,550, `Hierbabuena: ${this.cont} /4`, {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            fill: '#fff'
        }).setDepth(1);
       }
       // Crear bloques
       for (let row = 0; row < 4; row++) {
        let rnd = Phaser.Math.Between(0, 7);
           col = rnd;
           xf = (col * this.blockConfig.width+56) + this.blockConfig.xOffset;
           yf = (row * this.blockConfig.height-80) + this.blockConfig.yOffset;
           switch (this.fruta) {
               case "azucar":
                   let azucar = this.physics.add.image(xf, yf, 'blockazucar').setImmovable();
                   this.physics.add.collider(this.ball, azucar, () => this.handleFruitCollision(azucar));
                   
                   break;
               case "hierbabuena":
                   let hierbabuena = this.physics.add.image(xf, yf, 'blockhierbabuena').setImmovable();
                   this.physics.add.collider(this.ball, hierbabuena, () => this.handleFruitCollision(hierbabuena));
                   break;
           }
           for (col = 0; col < 8; col++) {
               x = (col * this.blockConfig.width+56) + this.blockConfig.xOffset;
               y = (row * this.blockConfig.height-80) + this.blockConfig.yOffset;
               if(x != xf || y != yf){
                const block = this.physics.add.image(x, y, 'block').setImmovable();
                this.physics.add.collider(this.ball, block, () => this.handleBlockCollision(block));
               }
           }
        }
   }
   handleFruitCollision(block){
    block.destroy();
    this.blockDestroySound.play();
    this.cont++;
    this.updateFrutaCounter();
   }
   handleBlockCollision(block) {
    block.destroy();
    this.blockDestroySound.play();
  }
   paddlecollision(){
    this.paddleHitSound.play();
    let relative = this.ball.x - this.paddle.x;
    if(relative<0.1 && relative> -0.1){
    this.ball.setVelocityX(Phaser.Math.Between(-10,10))
   }else{
    this.ball.setVelocityX(10 * relative);
   }
   }


   createBlocks() {
       // Configuración de los bloques
       const blockConfig = {
           width: 20,
           height: 5,
           cols: 8,
           rows: 4,
           xOffset: 60,
           yOffset: 100,
       };
   }


updateFrutaCounter() {
    switch (this.fruta) {
        case "azucar":
            this.azucarCountText.setText(`Azúcar: ${this.cont}/4`);
            break;
        case "hierbabuena":
            this.hierbabuenaCountText.setText(`Hierbabuena: ${this.cont}/4`);
    }
}
update() {
    // if(Phaser.Input.Keyboard.KeyCodes.Esc.isDown){
    //         this.scene.start('PauseScene');
    //         this.scene.pause();
    //         this.sound.stopAll();
    // }
    
    if (this.ball.isBallReleased) {
        if (this.cursors.left.isDown) {
            this.paddle.setVelocityX(-500);
        } else if (this.cursors.right.isDown) {
            this.paddle.setVelocityX(500);
        } else {
            this.paddle.setVelocityX(0);
        }
    }
    else{
        if (this.cursors.left.isDown) {
            this.paddle.setVelocityX(-500);
            this.ball.setVelocityX(-500);
        } else if (this.cursors.right.isDown) {
            this.paddle.setVelocityX(500);
            this.ball.setVelocityX(500);
        } else {
            this.paddle.setVelocityX(0);
            this.ball.setVelocityX(0);

        }
    }
    if (this.ball.body.blocked.left || this.ball.body.blocked.right) {
        this.borderHitSound.play();
    }


        this.hasDied();
        this.hasWon();
}

hasWon(){
    if (this.cont == 4) {
        this.win.visible = true;
        this.exitScene()
    }
}
hasDied(){
    if (this.ball.y > 700) {
        this.gameoverImage.visible = true
        this.time.delayedCall(2000, () => {
        this.exitScene();
        //setTimeout(this.scene.start('MainMenu'), 3000);}
    })}
}
exitScene(){
    // Paramos el audio
    this.sound.stopAll();
    addMinigame()
    this.calculateFinalScore();
    this.scene.stop()
    this.scene.resume('barScene')
}
calculateFinalScore(){
    var stars
    if(this.cont < 2) stars = 0;
    else if(this.cont == 2) stars = 1
    else if(this.cont == 3) stars = 2
    else if(this.cont == 4) stars = 3
    if(stars != undefined){
        addCustomerPoints(stars)
      
    }

}
}
