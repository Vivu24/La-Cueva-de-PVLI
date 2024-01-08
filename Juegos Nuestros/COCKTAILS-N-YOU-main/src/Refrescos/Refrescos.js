import PlayerRefrescos from "./PlayerRefrescos.js";
import Estantes from "./Estantes.js";
import { addCustomerPoints, addMinigame, refreshment } from "../scenes/GameManager.js";
import PauseMenu from "../scenes/PauseMenu.js";
let info;

export default class Refrescos extends Phaser.Scene {
    constructor() {
        super({ key: 'refrescos' })
        this.runCounter = true
    }

    create() {
    this.music = this.sound.add('jumpMusic', { loop: true, volume: 0.75 });
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
        this.drinkSound = this.sound.add('drink',{volume: 0.50});

        // BackGround
        this.background = this.add.image(400, 300, 'aimbackground').setDepth(0);
        this.background.setScale(0.8);

        this.type = refreshment
        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);
      
        // Se instancia al jugador
        this.Player = new PlayerRefrescos(this, 100, 300, true);
        this.Player.setCollideWorldBounds(true);

        // Número de refrescos para pasar al siguiente nivel
        this.num = 4/* = desiredNum*/

        // Contador de refrescos
        this.cont = 0;
        this.contadorText = this.add.text(16, 16, 'Refrescos: ' + this.cont + ' / ' + this.num, {
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
            fill: '#fff'
            
        });
        this.prevNum;
        
        this.tempSprite = this.add.sprite(850, -29, 'contador');
        this.tempSprite.setScale(0.7);

        // Temporizador
        this.temporizador = 30 /*= temp*/
        
        this.temporizadorText = this.add.text(620, 20, 'Tiempo: ' + this.temporizador, { 
            fontFamily: 'Comic Sans MS',
            fontSize: '32px',
             fill: '#fff'
        });
          
        // Instanciar los estantes 
        this.estante1 = new Estantes(this, 130, 400);
        this.estante2 = new Estantes(this, 325, 200);
        this.estante3 = new Estantes(this, 520, 400);
        this.estante4 = new Estantes(this, 715, 200); 


        // Definir posición aleatoria del refresco
        this.refresco = this.spawnRefresco();
        this.refresOffSet = 15;
        
        // Física
        this.cargarFisicas();

        this.infoLvl = 1;

        //Sprites win y gameOver
        this.gameoverImage = this.add.image(400, 300, 'gameOver').setScale(0.8);
        this.gameoverImage.visible = false;

        this.win = this.add.image(400, 300, 'win').setScale(0.8);
        this.win.visible = false;
    }
    
    update(time,delta) {
        
        if(this.runCounter){
            this.temporizador -= (delta / 1000)
        }
        if(this.temporizador <= 0) this.hasDied();
      
        this.temporizadorText.setText('Tiempo: ' + Math.ceil(this.temporizador));
        
    }
      

    handleColision(player, refresco) {
        // Elimina solo el refresco
        refresco.destroy();
        this.drinkSound.play();
        // Incrementa el contador de refrescos
        this.cont++;
        this.contadorText.setText('Refrescos: ' + this.cont + ' / ' + this.num);

        // Verifica si se alcanzó el número deseado para pasar al siguiente nivel
        if (this.cont >= this.num) {
            // Cambiar de escena y eso
            this.hasWon();
        } else {
            this.refresco = this.spawnRefresco();
            this.physics.add.collider(this.Player, this.refresco, this.handleColision.bind(this));
        }
    }
    
    randomPos(){
        let rnd
        do{
            rnd = Phaser.Math.RND.between(0, 3);
        }
        while(this.prevNum === rnd)
        this.prevNum = rnd;
        switch(rnd){
            case 0: return [this.estante1.x, this.estante1.y]
            case 1: return [this.estante2.x, this.estante2.y]
            case 2: return [this.estante3.x, this.estante3.y]
            case 3: return [this.estante4.x, this.estante4.y]
        }
    }
    spawnRefresco() {
        let nuevoRefresco;
        let pos = this.randomPos()
        nuevoRefresco = this.physics.add.image(pos[0], pos[1], this.type);
        
        if (nuevoRefresco) {
            nuevoRefresco.setScale(0.07);
            nuevoRefresco.setSize(400, 800);
            nuevoRefresco.setOffset(225, 0);
            nuevoRefresco.setDepth(1);
        }
        return nuevoRefresco;
    }
    
    hasWon(){
    
            this.win.visible = true;
            this.runCounter = false;
            this.time.delayedCall(2000, () => {
                this.exitScene();
                //setTimeout(this.scene.start('MainMenu'), 3000);}
                })
        
    }
    hasDied(){
            this.gameoverImage.visible = true
            this.runCounter = false;
            this.time.delayedCall(2000, () => {
            this.exitScene();
            //setTimeout(this.scene.start('MainMenu'), 3000);}
            })
    }
    exitScene(){
        // Paramos el audio
        this.sound.stopAll();
        addMinigame()
        this.calculateFinalScore();
        this.runCounter = true
        this.scene.resume('barScene')
        this.scene.stop()
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

    cargarFisicas(){
        this.physics.add.collider(this.Player, this.refresco, this.handleColision.bind(this));
        this.physics.add.collider(this.Player, this.estante1);
        this.physics.add.collider(this.Player, this.estante2);
        this.physics.add.collider(this.Player, this.estante3);
        this.physics.add.collider(this.Player, this.estante4);
    }
}
