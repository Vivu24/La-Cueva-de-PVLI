import Player from "./Player.js";
import Aro from "./Aro.js";

export default class Level extends Phaser.Scene{

    constructor(score){
        super({key: 'Level'});
    }

    create(){
        // Paramos el audio
        this.sound.stopAll();
        console.log("Level");
        // Cargamos la Música
        this.music = this.sound.add('stageMusic', {loop: true, volume: 0.5});
        // Empezamos la Música
        this.music.play();

        // Crear obstáculos
        this.createObstacle(400, 700, 'floor', 1000, 100, 0);
        this.obstacles = [this.floor];

        this.background = this.add.image(0,200, "background").setOrigin(0,0);

        this.player = new Player(this, 400, 400);
        this.physics.add.collider(this.player, this.obstacles);        

        this.spawnerRing();
    };

    update(){
        this.background.x = this.cameras.main.scrollX * 5;     
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
    
    spawnerRing() {
        const createRing = () => {
            this.ring = new Aro(this, this.cameras.main.width + 300, 500)
            this.physics.add.collider(this.player, this.ring);  
        }            
        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
        this.time.addEvent({
        delay: 4000, 
        loop: true,
        callback: createRing,
        callbackScope: this
        });
    };
    
}