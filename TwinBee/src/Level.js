import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import Green from "./Green.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.isPaused = false; // Nuevo estado para controlar la pausa
    }

    init(data) {
        this.amountOfPlayers = data.nPlayers || 0;
    }

    create() {
        this.background = this.add.image(0, this.cameras.main.height, "background").setOrigin(0, 1);

        this.players = [];
        this.enemiesPool = [];
        this.bulletsPool = [];
        this.greensPool = [];

        for (let i = 1; i <= this.amountOfPlayers; i++) {
            console.log("Creo Player número " + i)
            const player = new Player(this, (this.cameras.main.width / (this.amountOfPlayers + 1)) * i, 200, i);
            player.setCollideWorldBounds(true);            
            this.players.push(player);            
        }
        
        this.spawnNabo();
        this.spawnGreen();


        // Dentro de la función create de Level.js, después de this.spawnGreen();
        this.input.keyboard.on('keydown-Q', () => {
            this.isPaused = !this.isPaused; // Alternar estado de pausa al presionar 'Q'

            if (this.isPaused) {
                this.scene.pause();
                this.scene.launch('Pause'); // Mostrar el menú de pausa
            } else {
                this.scene.stop('Pause');
                this.scene.resume();
                
            }
        });

        this.physics.add.collider(this.enemiesPool, this.bulletsPool, this.enemiesAndBulletCollision.bind(this));
        console.log("level");
    }

    update() {
        // Comprobar si el fondo ha llegado al final de la imagen
        if (!(this.background.y >= this.background.height - this.cameras.main.height)) {
            this.background.y += 0.5;
        }
        else{
            this.victoryAnimation();
        }

        // Itera sobre todos los enemigos en el objectsPool
        this.enemiesPool.forEach(enemy => {
            // Verifica la colisión con cada jugador
            this.players.forEach(player => {
                enemy.checkCollisionWithPlayer(this, player);
            });
        });
        this.greensPool.forEach(green => {
            // Verifica la colisión con cada jugador
            this.players.forEach(player => {
                green.checkCollisionWithPlayer(this, player);
            });
        });
    }

    victoryAnimation() {
        this.gameCompleted = true;
        this.levelConclusionText("Victory");
    
        this.players.forEach(player => {
            player.setCollideWorldBounds(false); 
            player.freeze();
            player.desactivateInput();
            if (player.number == 1){
                player.anims.play('twinbeeMoveRight', true);
            }
            else {
                player.anims.play('winbeeMoveRight', true);
            }
    
            this.time.delayedCall(500, () => {
                player.setVelocityY(-50);
            }, [], this);
    
            for (let i = 0; i < 75; i++) {
                this.time.delayedCall(30, () => {
                    player.setVelocityY(player.body.velocity.y - 1);
                    console.log(player.body.velocity.y)
                }, [], this);
            }
        });  

        // Agregar un retraso de 5 segundos antes de saltar al menú
        this.time.delayedCall(5000, this.delayedMenuTransition, [], this);
    }

    handlePlayerDamageCollision() {
        // Agregar un retraso de 3 segundos antes de saltar al menú
        this.time.delayedCall(2000, this.delayedMenuTransition, [], this);
    }

    delayedMenuTransition() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    spawnNabo() {
        const createEnemy = () => {
            if(!this.gameCompleted){
                const myEnemy = new Enemy(this, Phaser.Math.Between(75, this.cameras.main.width - 75), -50, Phaser.Math.RND.sign());
                this.enemiesPool.push(myEnemy);
            }
        };

        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: createEnemy,
            callbackScope: this
        });
    }

    spawnGreen() {
        const createGreen = () => {
            if(!this.gameCompleted){
                const myGreen = new Green(this, Phaser.Math.Between(75, this.cameras.main.width - 75), -50);
                this.greensPool.push(myGreen);
            }
        };

        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: createGreen,
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