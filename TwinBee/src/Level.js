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
        this.objectsPool = [] // Pool de objetos de escena
    
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
        // Itera sobre todos los enemigos en el objectsPool
        this.objectsPool.forEach(enemy => {
        // Verifica la colisión con cada jugador
            this.players.forEach(player => {
                enemy.checkCollisionWithPlayer(this, player);
            });
        });
    }

    handlePlayerDamageCollision() {
        console.log("Colisiona bro");
    
        // Agregar un retraso de 3 segundos antes de saltar al menú
        this.time.delayedCall(3000, this.delayedMenuTransition, [], this);
    }

    delayedMenuTransition() {
        console.log("delayedmenu")
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    spawnNabo() {
        const createEnemy = () => {
            console.log("Creo nabo")
            const myEnemy = new Enemy(this, Phaser.Math.Between(0, this.cameras.main.width), -50)
            this.objectsPool.push(myEnemy);  // Agrega la instancia al array
        }
                
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: createEnemy,
            callbackScope: this
        });
    };

    levelConclusionText(resolution){
        console.log("Texto de: " + resolution)
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            resolution,
            {
                fontFamily: 'gummy',
                fontSize: 50,
                color: 'White',
                stroke: '0x' + Math.floor(Math.random()*16777215).toString(16), // Borde de color aleatorio
                strokeThickness: 6 // Grosor del borde
            }
        ).setOrigin(0.5, 0.5);
    }
}
