import Player from "./Player.js";

export default class Level extends Phaser.Scene{

    constructor(score){
        super({key: 'Level'});
    }

    create(){
        console.log("Level");

        // Crear obstáculos
        this.createObstacle(400, 700, 'floor', 1000, 100, 0);
        this.obstacles = [this.floor];

        this.background = this.add.image(0,200, "background").setOrigin(0,0);

        this.player = new Player(this, 400, 400);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.obstacles);

    }

    update(){
        this.background.x = this.cameras.main.scrollX * 5; // Adjust the multiplier
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
}