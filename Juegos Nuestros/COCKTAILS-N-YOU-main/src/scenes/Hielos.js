import { addCustomerPoints, addMinigame } from "./GameManager.js";
import icecube from "./icecube.js";
import PauseMenu from "../scenes/PauseMenu.js";
let ForceX = 20,
    ForceY = 10;

export default class Hielos extends Phaser.Scene {
    constructor() {
        super({ key: 'Hielos' });
        
    }

    create() {
        this.music = this.sound.add('iceMusic', { loop: true, volume: 0.75 });
        this.music.play();
        //this.scene.add('PauseMenu', PauseMenu, false);
        this.input.keyboard.on('keydown-ESC', () => {
        // Pausar el juego y mostrar el menú de pausa
        this.sound.pauseAll();
        this.scene.pause();
        this.scene.launch('PauseMenu');
        
    });
        this.win = this.add.image(400, 300, 'win').setScale(0.8).setDepth(4);
        this.win.visible = false;
        // Crear obstáculos
        this.createObstacle(765, 500, 'obstacle1', 10, 100, 0);
        this.createObstacle(635, 500, 'obstacle2', 10, 100, 0);
        this.createObstacle(700, 550, 'obstacle3', 60, 10, 0);
        //Intentos
        this.attempts = 0;
        // Background
        let background = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "backgroundIce");

        // Crear el cubo de hielo
        this.createCube();
        
        // Configurar la canasta
        this.target = this.add.sprite(700, 500, 'cubitera');
        this.target.setScale(0.40);
        //this.target.setRotation(Phaser.Math.DegToRad(300));

        this.physics.world.enable([this.target]);
        this.target.body.setAllowGravity(false);
        this.target.body.setImmovable(true);
        this.target.body.setSize(100, 5);

        // Configurar eventos del ratón
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointerup', this.onPointerUp, this);

        // Configurar colisiones con obstáculos
        this.obstacles = [this.obstacle1, this.obstacle2, this.obstacle3];
        this.physics.add.collider(this.cube, this.target, this.onCollision, null, this);
        this.physics.add.collider(this.cube, this.obstacles);

         // Cartel
        let cartel = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 8, "spaceParaReiniciar");
        cartel.setScale(0.75);


        // Marcador para comprobar si el cubo ya ha sido lanzado
        this.isCubeLaunched = false;

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.sound.stopAll();
            this.scene.restart();
        }, this);
        this.input.keyboard.on('keydown-Q', () =>{
            this.hasWon()
        }, this);
    }

    update() {
        if (this.isDragging && !this.isCubeLaunched) {
            this.cube.x = this.input.x;
            this.cube.y = this.input.y;
        }

        if (this.isCubeLaunched && 
            (this.cube.y > this.sys.game.config.height) ||
            (this.cube.y < 0) ||
            (this.cube.x > this.sys.game.config.width) ||
            (this.cube.x < 0)) {
            this.time.delayedCall(1000, () => {
                this.destroyCube();
                this.createCube();
                this.isCubeLaunched = false;
                
            }, null, this);
        }
    }

    onPointerDown(pointer) {
        // Verificar si el ratón está dentro de los límites del sprite del cubo y si el puntero está en la parte izquierda de la pantalla
        if (this.cube.getBounds().contains(pointer.x, pointer.y) && pointer.x < this.sys.game.config.width / 2) {
            this.isDragging = true;
        }
    }
    
    onPointerUp(pointer) {
        if (this.isDragging && !this.isCubeLaunched) {
            this.isDragging = false;
    
            if (pointer.x > this.sys.game.config.width / 2) {
                // Si el puntero está en la parte derecha de la pantalla reiniciamos la escena
                this.sound.stopAll();
                this.scene.restart();
            }
    
            this.isCubeLaunched = true;
    
            const velocityX = (pointer.x - this.cube.x) * ForceX;
            const velocityY = (pointer.y - this.cube.y) * ForceY;
    
            this.cube.setVelocity(velocityX, velocityY);
    
            this.physics.world.gravity.y = 800;

            this.attempt ++;
        }
    }
    

    createCube() {
        this.cube = new icecube(this, 50, Phaser.Math.Between(100, this.sys.game.config.height - 100));
        this.physics.world.enable([this.cube]);
        this.cube.setCollideWorldBounds(true);
        this.cube.body.setAllowGravity(true);
        this.cube.setVelocity(0, 0);
        this.cube.body.setBounce(0.5, 0.5);
        this.cube.body.setFriction(1, 1);
    }

    destroyCube() {
        if (this.cube) {
            this.cube.destroy();
        }
    }

    createObstacle(x, y, key, width, height, rotation) {
        const obstacle = this.add.sprite(x, y, key);
        this.physics.world.enable([obstacle]);
        obstacle.body.setAllowGravity(false);
        obstacle.body.setImmovable(true);
        obstacle.body.setSize(width, height);
        obstacle.setRotation(Phaser.Math.DegToRad(rotation));
    
        this[key] = obstacle;
    }
    

    onCollision() {
        if (!this.win.visible && this.isCubeLaunched) {
            this.hasWon()
        }
    }
    hasWon(){
        this.win.visible = true
        this.time.delayedCall(2000, () => {
            this.exitScene();
        },this);
    }
    exitScene(){
        // Paramos el audio
        this.sound.stopAll();
        this.win.visible = false;
        addMinigame()
        this.calculateFinalScore()
        this.scene.resume('barScene')
        this.scene.stop();
    }
    calculateFinalScore(){
        var stars
        if(this.attempts < 6) stars = 3
        else if(this.attempts < 10) stars = 2
        else if(this.attempts < 14) stars = 1
        else stars = 0;
        if(stars != undefined){
            addCustomerPoints(stars)
            
        }
    }
}
