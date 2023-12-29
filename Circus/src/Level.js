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
        // Empezamos la Música
        this.music.play();

        // Crear obstáculos
        this.createObstacle(400, 700, 'floor', 50000, 100, 0);
        this.obstacles = [this.floor];

        // Crear una secuencia de imágenes de fondo
        this.backgroundImages = [];
        for (let i = 0; i < 2; i++) {
            const background = this.add.image(i * this.cameras.main.width, 300, "background").setOrigin(0, 0);
            this.backgroundImages.push(background);
        }


        this.player = new Player(this, 400, 400);
        this.physics.add.collider(this.player, this.obstacles);


        this.platform = this.physics.add.sprite(this.puntuacion, 500, 'platform');
        this.platform.setScale(3);
        this.physics.add.collider(this.platform, this.obstacles);
        this.physics.add.collider(this.player, this.platform, this.finishGame.bind(this));

        this.createJarrones()
        this.camera = this.cameras.main.startFollow(this.player);
        this.camera.setFollowOffset(-300, 200);

        this.spawnerRing();
    };

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

            console.log(this.platform.x - this.player.x);
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
            if (!(this.player.x > this.platform.x - 1000)){
                this.ring = new Aro(this, this.player.x + 1000, 500)
                this.physics.add.collider(this.player, this.ring, this.handleDamageCollision, null, this)                
            }
        }
        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: createRing,
            callbackScope: this
        });
    };

    handleDamageCollision() {
        console.log("Colisiona bro");
        // Aquí es donde puedes manejar la lógica cuando el jugador colisiona con un aro
        // Por ejemplo, puedes reiniciar el nivel o cambiar a otra escena
        this.scene.start("Menu");
    }

    finishGame(){
        console.log("Victoria magistral")

        // Detener la velocidad en el eje X de la plataforma
        this.platform.body.setVelocityX(0);

        // Destruir al jugador
        this.player.selfDestroy();

        this.clown = this.add.sprite(this.platform.x + 10, this.platform.y - 70, "clown")
        this.clown.anims.play('victoryClown');
        this.clown.setScale(3);
    }

    createJarrones(){
        for (let i = 1400; i < this.platform.x - 1000; i = i+1000){
            this.jarron = new Jarron(this, i, 625);
            this.physics.add.collider(this.player, this.jarron, this.handleDamageCollision, null, this);   

            console.log("Se crea jarron en " + this.jarron.x)
        }    
    }
}
