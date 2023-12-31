import Player from "./Player.js"
import Enemy from "./Enemy.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        this.amountOfPlayers = data.nPlayers || 0;
    }

    create() {
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0.75).setScrollFactor(0.25);

        this.players = [];  // Array para almacenar las instancias de jugadores
    
        for (let i = 1; i <= this.amountOfPlayers; i++) {
            console.log("Creo Player número " + i)
            const player = new Player(this, (this.cameras.main.width / (this.amountOfPlayers + 1)) * i, 200, i);
            this.players.push(player);  // Agrega la instancia al array
            console.log(player);
        }

        this.spawnNabo();
        console.log("level")
    }
    

    update() {
    }

    spawnNabo() {
        const createEnemy = () => {
            this.enemy = new Enemy(this, Phaser.Math.Between(0, this.cameras.main.width), -50)
            //this.physics.add.collider(this.player, this.Enemy, this.handleDamageCollision, null, this)
        }
        
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: createEnemy,
            callbackScope: this
        });
    };
}
