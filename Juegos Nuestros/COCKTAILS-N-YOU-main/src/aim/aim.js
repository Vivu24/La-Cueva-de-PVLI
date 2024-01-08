import Bottle from "./bottle.js"
import { alcoholicDrinks } from "../Cocktails.js";
import { addCustomerPoints, addMinigame, alcohol } from "../scenes/GameManager.js";


export default class Aim extends Phaser.Scene {
    
    //  Meter parametro de entrada
    constructor(){
        super({ key: 'Aim' });
        //Lista botellas
        this.bottleList = []
        //Asignar desde constructor
        this.runCounter = true;
        this.CounterValue  = 0;
    }
 create(){
    //Pausa
    //this.scene.add('PauseMenu', PauseMenu, false);
    this.input.keyboard.on('keydown-ESC', () => {
        // Pausar el juego y mostrar el menú de pausa
        this.sound.pauseAll();
        this.scene.pause();
        this.scene.launch('PauseMenu');
    });
    // Añadimos la música
    this.add.music = this.sound.add('aimMusic', { loop: true, volume: 0.30 });
    //audio
    this.shootSound = this.sound.add('shoot',{volume: 0.50});
    this.breakSound = this.sound.add('break');

    // Reproduce la música
    this.add.music.play();

    this.targetBottle = alcohol;
     this.background = this.add.image(400, 300, 'aimbackground').setDepth(0);
     this.background.setInteractive();
     this.background.setScale(0.8);
   
     //temporizador
     this.temporizador = 15
        
     this.temporizadorText = this.add.text(800 - 200, 30, 'Tiempo: ' + this.temporizador, { 
     fontFamily: 'Comic Sans MS',
     fontSize: '32px',
     fill: '#fff'
    });
    this.temporizadorText.setDepth(3);
     //gameOver
     this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
     this.gameoverImage.visible = false;
     this.gameoverImage.setDepth(6);
     //win
     this.win = this.add.image(400, 300, 'win').setScale(0.8);
     this.win.setDepth(6);
     this.win.visible = false;

     this.physics.world.setBoundsCollision(true,true,true,true);

     this.bottlesGroup = this.physics.add.group();
     this.targetCounter = this.add.text(50, 30, ` ${this.targetBottle}: ${this.CounterValue}`, {fontFamily: 'Comic Sans MS', fontSize: '32px', fill: '#fff' });
     this.targetCounter.setDepth(3);
     this.add.image(20, 44, this.targetBottle).setScale(0.15);

     const bottleTypes = ['gin', 'ron', 'vodka', 'tequila'];
     // Habilitar la interactividad del ratón
     this.input.on('gameobjectdown', (pointer,gameObject) => {
        if (gameObject instanceof Bottle) {
            this.handleClick(gameObject);
        }
        else{
            this.temporizador--;
        }
    });
    this.createBottle();
 }
 handleClick(bottle) {
   
    if (bottle.type === this.targetBottle) {
        this.CounterValue++;
        this.updateCounterText();
    }
    else{
        this.temporizador -= 5;
    }
    this.shootSound.play();
    this.breakSound.play();
    bottle.destroy();
}
 createBottle() {
    for(var i = 1; i <= 4; i++){
        this.createIndividualBottle(alcoholicDrinks[i])
    }
 }
 createIndividualBottle(bottletype){
    for(var i = 0; i < 4; i++){
        this.bottleList.push(new Bottle(this, Phaser.Math.RND.integerInRange(50, 550), Phaser.Math.RND.integerInRange(50, 450), bottletype))
    }
   }

 updateCounterText() {
    
    this.targetCounter.setText(`${this.targetBottle}: ${this.CounterValue}`);
        if (this.CounterValue >= 4) {
            this.runCounter = false;
         this.win.visible = true;
         this.bottleList.length = 0
         this.time.delayedCall(2000, () => {
            this.exitScene();
        })
        }
    }
    update(time,delta) {
        if(this.runCounter){
            this.temporizador -= (delta / 1000)
        }
        if(this.temporizador <= 0){
            this.runCounter = false;
            this.gameoverImage.visible = true;
            this.bottleList.length = 0
            this.time.delayedCall(2000, () => {
                this.exitScene();
                
            })
            
        }
        this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));
        
    }
    exitScene(){
        // Paramos el audio
        this.sound.stopAll();
        addMinigame()
        this.calculateFinalScore()
        this.bottleList = []
        //Asignar desde constructor
        this.runCounter = true;
        this.CounterValue  = 0;
        this.scene.resume('barScene')
        this.scene.stop()
        
    }
    calculateFinalScore(){
        var stars
        if(this.CounterValue == 4) stars = 3;
        else if(this.CounterValue == 3) stars = 2
        else if(this.CounterValue == 2) stars = 1
        else stars = 0

        if(stars != undefined){
            addCustomerPoints(stars)
           
        }
    }
}