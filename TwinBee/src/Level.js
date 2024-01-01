import Player from "./Player.js";
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
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0.75);
        this.initialBackgroundY = this.background.y; // Guardar la posición inicial del fondo

        this.players = [];
        this.enemiesPool = [];
        this.bulletsPool = [];

        for (let i = 1; i <= this.amountOfPlayers; i++) {
            console.log("Creo Player número " + i)
            const player = new Player(this, (this.cameras.main.width / (this.amountOfPlayers + 1)) * i, 200, i);
            this.players.push(player);
            console.log(player);
        }

        this.spawnNabo();

        this.physics.add.collider(this.enemiesPool, this.bulletsPool, this.enemiesAndBulletCollision.bind(this));
        console.log("level");
    }

    update() {
        // Deslizar el fondo hacia abajo
        this.background.y += 0.5;

        // Comprobar si el fondo ha llegado al final de la imagen
        if (this.background.y >= this.initialBackgroundY + this.background.height) {
            // Detener el fondo
            this.background.y = this.initialBackgroundY + this.background.height;
        }

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
        this.time.delayedCall(2000, this.delayedMenuTransition, [], this);
    }

    delayedMenuTransition() {
        console.log("delayedmenu");
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    spawnNabo() {
        const createEnemy = () => {
            console.log("Creo nabo");
            const myEnemy = new Enemy(this, Phaser.Math.Between(0, this.cameras.main.width), -50);
            this.enemiesPool.push(myEnemy);
        };

        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: createEnemy,
            callbackScope: this
        });
    }

    levelConclusionText(resolution) {
        console.log("Texto de: " + resolution);
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            resolution,
            {
                fontFamily: 'gummy',
                fontSize: 50,
                color: 'White',
                stroke: '0x' + Math.floor(Math.random() * 16777215).toString(16),
                strokeThickness: 6
            }
        ).setOrigin(0.5, 0.5);
    }

    enemiesAndBulletCollision(enemy, bullet) {
        const enemyId = enemy.getId();
        const bulletId = bullet.getId();

        const bulletIndex = this.bulletsPool.indexOf(bullet);
        if (bulletIndex !== -1) {
            this.bulletsPool.splice(bulletIndex, 1);
            bullet.destroy();
        }

        const enemyIndex = this.enemiesPool.indexOf(enemy);
        if (enemyIndex !== -1) {
            this.enemiesPool[enemyIndex].anims.play('explosionNabo', true);
            this.enemiesPool[enemyIndex].isDead = true;
            this.enemiesPool[enemyIndex].freeze();

            this.time.delayedCall(500, () => {
                this.enemiesPool.splice(enemyIndex, 1);
                enemy.destroy();
            }, [], this);
        }
    }
}
