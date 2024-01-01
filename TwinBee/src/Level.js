import Player from "./Player.js"
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";

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
        this.enemiesPool = [] // Pool de objetos de escena
        this.bulletsPool = []
    
        for (let i = 1; i <= this.amountOfPlayers; i++) {
            console.log("Creo Player número " + i)
            const player = new Player(this, (this.cameras.main.width / (this.amountOfPlayers + 1)) * i, 200, i);
            this.players.push(player);  // Agrega la instancia al array
            console.log(player);
        }

        this.spawnNabo();

        this.physics.add.collider(this.enemiesPool, this.bulletsPool, this.enemiesAndBulletCollision.bind(this));
        console.log("level")
    }
    
    update() {
        // Itera sobre todos los enemigos en el objectsPool
        this.enemiesPool.forEach(enemy => {
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
            this.enemiesPool.push(myEnemy);  // Agrega la instancia al array
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

    enemiesAndBulletCollision(enemy, bullet) {
        // Obtener el identificador único de cada enemigo y bala
        const enemyId = enemy.getId();  // Asumiendo que hay un método getId en la clase Enemy
        const bulletId = bullet.getId();  // Asumiendo que hay un método getId en la clase Bullet
    
        // Eliminar la bala del array de balas
        const bulletIndex = this.bulletsPool.indexOf(bullet);
        if (bulletIndex !== -1) {
            this.bulletsPool.splice(bulletIndex, 1);
            bullet.destroy();  // Destruir la instancia de la bala
        }
    
        // Eliminar el enemigo del array de enemigos después de esperar 3 segundos
        const enemyIndex = this.enemiesPool.indexOf(enemy);
        if (enemyIndex !== -1) {
            // Reproducir la animación de explosión del enemigo
            this.enemiesPool[enemyIndex].anims.play('explosionNabo', true);
    
            this.enemiesPool[enemyIndex].isDead = true;
            // Llamar al método freeze del enemigo
            this.enemiesPool[enemyIndex].freeze();
    
            // Esperar 3 segundos antes de ejecutar las líneas marcadas como "//BUENAS//"
            this.time.delayedCall(3000, () => {
                // Eliminar el enemigo del array de enemigos
                this.enemiesPool.splice(enemyIndex, 1);
                enemy.destroy(); // Destruir la instancia del enemigo
            }, [], this);
        }
    
        // Puedes realizar otras acciones aquí, como aumentar la puntuación del jugador, etc.
    }
    
    
    
}
