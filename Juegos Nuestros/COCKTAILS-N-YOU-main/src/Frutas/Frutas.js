import PlayerRefrescos from '../Refrescos/PlayerRefrescos.js'
import { addCustomerPoints, addMinigame, fruit } from '../scenes/GameManager.js';
import Fruta from './Fruta.js';
export default class Frutas extends Phaser.Scene{
    constructor(){
        super({key: 'frutas'});
        this.runCounter = true
    }
    create(){
        this.music = this.sound.add('fruitsMusic', { loop: true, volume: 0.5 });
        this.music.play();
        //Pausa
        //this.scene.add('PauseMenu', PauseMenu, false);
    this.input.keyboard.on('keydown-ESC', () => {
        // Pausar el juego y mostrar el menú de pausa
        this.sound.pauseAll();
        this.scene.pause();
        this.scene.launch('PauseMenu');
    });
        // Audio
        this.frutasSound = this.sound.add('frutas',{volume: 0.50});

        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);
      
        // Background de la escena y suelo
        const background = this.add.image(400, 250, 'frutasBackground').setDepth(0);
        background.setScale(1);

        this.suelo = this.physics.add.image(400,250, 'frutasSuelo').setImmovable();
        this.suelo.setScale(1);
        this.suelo.setSize(this.sys.game.canvas.width, 150);
        this.suelo.setOffset(320, 670);

        // Poner los arboles de la escena
        const tree1 = this.add.image(600 ,this.sys.game.canvas.height - 351,'tree3');  
        tree1.setScale(0.5);
        const tree2 = this.add.image(250 ,this.sys.game.canvas.height - 375,'tree1');  
        tree2.setScale(0.55);
        
        
        // Imagen de win
        this.win = this.add.image(400, 300, 'win').setScale(0.8);
        this.win.visible = false;

        // Imagen de lose
        this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
        this.gameoverImage.visible = false;

        // Se instancia al jugador
        this.Player = new PlayerRefrescos(this, this.sys.game.canvas.width / 2, 425, false);
        this.Player.setCollideWorldBounds(true);
        this.cesta = this.physics.add.image(this.Player.x + 17, this.Player.y + 10 , 'cesta')
        this.cesta.setScale(3.5);

         // Temporizador
         this.tempSprite = this.add.sprite(850, -29, 'contador');
         this.tempSprite.setScale(0.7);
         this.temporizador = 30 /*= temp*/
         
         this.temporizadorText = this.add.text(620, 20, 'Tiempo: ' + this.temporizador, { 
             fontFamily: 'Comic Sans MS',
             fontSize: '32px',
              fill: '#fff'
         });

        // Creacion de array
        this.prevNum;
        this.arrayFrutas = [];
        this.i = 0;
        this.canSpawn = true;
       
        this.targetFruta = fruit
        this.add.image(25, 40, this.targetFruta).setScale(0.4);

        // Contador
        this.num = 4; // desiredNum
        this.cont = 0;
        this.contadorText = this.add.text(25, 16,  ` ${'  '+this.cont}` + ' / ' + this.num, {
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
            fill: '#fff'
            
        });

        

       

        // Fisicas
        
        this.physics.add.collider(this.Player, this.suelo);
    }

    update(t, dt){
        if(this.runCounter){
            if(this.Player.lookingRight){
                this.cesta.x = this.Player.x + 17;
            }
            else{
                this.cesta.x = this.Player.x - 17;
            }
            this.temporizador -= (dt / 1000);
            if(this.canSpawn){
                this.spawnFruta();
                this.frutasSound.play();
                this.tiempo = Math.ceil(this.temporizador);
                this.canSpawn = false;
            }
            if(this.temporizador <= 0) {
                this.hasDied();
                this.temporizador = 0;
            }
            this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));
            this.calcularTiempo(this.temporizador);
        }
        
    }

    calcularTiempo(tiempo){
        if(Math.ceil(tiempo) != this.tiempo){
            this.canSpawn = true;
        }
}

    handleDelete(fruta, suelo){  
        if(fruta.getType() == this.targetFruta){
            this.temporizador -= 1;
        }
        fruta.destroy();
}
    randomPos(){
        let rnd = Phaser.Math.RND.between(50, this.sys.game.canvas.width - 50);;
        return [rnd, 10];
    }

    handleColision(player, fruta){
        fruta.destroy();
        if(fruta.getType() == this.targetFruta)
            this.cont++;
        else this.temporizador -= 3

        this.contadorText.setText('   '+ this.cont + ' / ' + this.num);

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Cambiar de escena y eso
            this.hasWon()
        }

    }

    cargarFisicas(){
        this.physics.add.overlap(this.Player, this.fruta, this.handleColision.bind(this));
        this.physics.add.collider(this.fruta, this.suelo, this.handleDelete.bind(this));
        this.physics.add.overlap(this.cesta, this.fruta, this.handleColision.bind(this));
    }
    randomFruta(){
        let fruit;
        let rnd;
        do{
            rnd = Phaser.Math.RND.between(0, 2);
        }
        while(this.prevNum === rnd)
        this.prevNum = rnd;
        switch(rnd){
            case 0:
                 fruit = 'blackberry_fruit'
                 break;
            case 1:  
                fruit = 'lime_fruit'
                break;
            case 2:
                fruit = 'lemon_fruit'
                break;
        }
        return fruit;
    }
    spawnFruta(){
        this.pos = this.randomPos();
        
        this.fruta = new Fruta(this, this.pos[0], this.pos[1], this.randomFruta())
        this.cargarFisicas();
        this.arrayFrutas.push(this.fruta); 
        
    }

    hasWon(){
        this.win.visible = true;
        this.runCounter = false;
        this.time.delayedCall(2000, () => {
            this.exitScene();
        })
    }
    exitScene(){
        // Paramos el audio
        this.sound.stopAll();
        addMinigame()
        this.calculateFinalScore();
        this.scene.resume('barScene')
        this.scene.stop()
    }
    hasDied(){
        this.gameoverImage.visible = true
        this.runCounter = false;
        this.time.delayedCall(2000, () => {
            
        this.exitScene();
        })
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