import Player from "./Player.js";
import Aro from "./Aro.js";
import Jarron from "./Jarron.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level' });
    }

    init(data) {
        // Acceder al parámetro score pasado desde la escena Menu
        this.puntuacion = data.score || 0; // Si no se proporciona, establecer en 0 por defecto
    }

    create() {
        // Paramos el audio
        this.sound.stopAll();
        console.log("Level");
        // Cargamos la Música
        this.music = this.sound.add('stageMusic', { loop: true, volume: 0.5 });
        // Cargamos el sonido de fallo
        this.failureSound = this.sound.add('failureSound', { loop: false, volume: 0.5 });

        // Empezamos la Música
        this.music.play();

        // Crear obstáculos
        this.createObstacle(400, 700, 'floor', 50000, 100, 0);
        this.obstacles = [this.floor];

        // Crear una secuencia de imágenes de fondo
        this.backgroundImages = [];
        for (let i = 0; i < this.puntuacion; i = i + 800) {
            const background = this.add.image(i, 300, "background").setOrigin(0, 0);
            if (this.puntuacion / 100 - (i * 1.25) / 100 != this.puntuacion / 100 && (this.puntuacion / 100 - (i * 1.25) / 100) + 10 >= 10) {
                // Crear un contenedor para el texto y el rectángulo
                const container = this.add.container(i, this.cameras.main.centerY + 350);

                const rect = this.add.graphics();
                rect.fillStyle(0x000000); // Color negro
                rect.fillRect(-50, -15, 100, 30); // Ajusta el tamaño y posición del rectángulo según tus necesidades
                rect.lineStyle(2, 0xFF0000); // Ancho del contorno y color rojo
                rect.strokeRect(-50, -15, 100, 30);

                // Crear el texto y agregarlo al contenedor
                let metersText = this.add.text(0, 0, (this.puntuacion / 100 - (i * 1.25) / 100) + 10, {
                    fontFamily: 'arcade_classic',
                    fontSize: 25,
                    color: 'Red'
                }).setOrigin(0.5, 0.5);

                // Agregar el rectángulo y el texto al contenedor
                container.add(rect);
                container.add(metersText);

                // Agregar el contenedor al array de imágenes de fondo
                this.backgroundImages.push(container);
            } else {
                this.backgroundImages.push(background);
            }
        }

        this.player = new Player(this, 400, 400);
        this.physics.add.collider(this.player, this.obstacles);

        this.clown = this.add.sprite(this.player.x + 10, this.player.y - 70, "clown");
        this.clown.anims.play('walkClown');
        this.clown.setScale(3);

        this.platform = this.physics.add.sprite(this.puntuacion, 500, 'platform');
        this.platform.setScale(3);
        this.physics.add.collider(this.platform, this.obstacles);
        this.physics.add.collider(this.player, this.platform, this.finishGame.bind(this));

        this.createJarrones()
        this.camera = this.cameras.main.startFollow(this.player, true, 0.1, 0, 0, 0);
        this.camera.setFollowOffset(-300, 200);

        this.points = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 300, "Score: " + this.puntuacion,
            { fontFamily: 'arcade_classic', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);

        this.spawnerRing();
        this.scoreManager();
    };

    preUpdate(t,dt) {
        
    }

    update() {
        // Reposicionar las imágenes de fondo que salieron completamente de la vista
        const firstBackground = this.backgroundImages[0];
        const lastBackground = this.backgroundImages[this.backgroundImages.length - 1];

        // Calcular la nueva posición basada en la posición de la última imagen
        const newBackgroundX = lastBackground.x + lastBackground.width;

        // Si la primera imagen de fondo ha salido completamente de la vista a la izquierda
        if (firstBackground.x + firstBackground.width < this.camera.scrollX) {
            firstBackground.x = newBackgroundX;
            this.backgroundImages.shift();
            this.backgroundImages.push(firstBackground);
        }
        // Actualizar la posición del texto de puntuación en relación con la cámara
        this.points.setPosition(this.camera.scrollX + this.cameras.main.centerX, this.cameras.main.centerY - 200);
        this.clown.destroy();
        if (this.player.isDead){
            this.clown = this.add.sprite(this.player.x + 10, this.player.y - 40, "clown");
            this.clown.setScale(3);
            this.clown.anims.play('deadClown', true)
        }        
        else {
            this.clown = this.add.sprite(this.player.x + 10, this.player.y - 40, "clown");
            this.clown.setScale(3);
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

    spawnerRing() {
        const createRing = () => {
            if (!(this.player.x > this.platform.x - 1000)) {
                this.ring = new Aro(this, this.player.x + 1000, 500)
                this.physics.add.collider(this.player, this.ring, this.handleDamageCollision, null, this)
            }
        }
        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: createRing,
            callbackScope: this
        });
    };

    handleDamageCollision() {
        console.log("Colisiona bro");
        this.failureSound.play();
    
        // Desactivar el input del jugador
        this.player.isDead = true;
    
        // Detener la animación del jugador
        this.player.anims.play('deadLion', true);

        // Agregar un retraso de 3 segundos antes de saltar al menú
        this.time.delayedCall(3000, this.delayedMenuTransition, [], this);
    }
    
    
    delayedMenuTransition() {
        // Saltar a la escena del menú
        this.scene.start("Menu");
    }

    finishGame() {
        console.log("Victoria magistral")

        // Detener la velocidad en el eje X de la plataforma
        this.platform.body.setVelocityX(0);

        // Destruir al jugador
        this.player.selfDestroy();

        this.clown = this.add.sprite(this.platform.x + 10, this.platform.y - 70, "clown")
        this.clown.anims.play('victoryClown');
        this.clown.setScale(3);
    }

    createJarrones() {
        for (let i = 1400; i < this.platform.x - 1000; i = i + 1000) {
            this.jarron = new Jarron(this, i, 625);
            this.physics.add.collider(this.player, this.jarron, this.handleDamageCollision, null, this);

            console.log("Se crea jarron en " + this.jarron.x)
        }
    }

    scoreManager() {
        const updateScore = () => {
            // Actualizar el puntaje (score)
            this.puntuacion -= 50; // Cambia esto según tus necesidades

            // Eliminar el texto anterior
            this.points.destroy();

            // Crear el nuevo texto actualizado
            this.points = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 300, "Score: " + this.puntuacion,
                { fontFamily: 'arcade_classic', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
        };

        // Establecer un evento que actualice el puntaje cada 2000 milisegundos (2 segundos)
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateScore,
            callbackScope: this
        });
    }

}
