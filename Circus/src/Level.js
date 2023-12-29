import Player from "./Player.js";
import Aro from "./Aro.js";

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
        for (let i = 0; i < 3; i++) {
            const background = this.add.image(i * this.cameras.main.width, 300, "background").setOrigin(0, 0);
            this.backgroundImages.push(background);
        }

        this.platform = this.add.image(this.puntuacion, 600, "platform")
        this.platform.setScale(3);
        this.player = new Player(this, 400, 400);
        this.physics.add.collider(this.player, this.obstacles);

        this.camera = this.cameras.main.startFollow(this.player);
        this.camera.setFollowOffset(-300, 200);

        this.spawnerRing();
    };

    update() {
        // Reposicionar las imágenes de fondo que salieron completamente de la vista
        const firstBackground = this.backgroundImages[0];
        const lastBackground = this.backgroundImages[this.backgroundImages.length - 1];

        // Si la primera imagen de fondo ha salido completamente de la vista a la izquierda
        if (firstBackground.x + firstBackground.width < this.camera.scrollX) {
            const newBackgroundX = lastBackground.x + lastBackground.width - 1; // Ajuste para evitar espacios
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
            this.ring = new Aro(this, this.player.x + 1000, 500)
            this.physics.add.collider(this.player, this.ring, this.handleRingCollision, null, this)
        }
        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
        this.time.addEvent({
            delay: 4000,
            loop: true,
            callback: createRing,
            callbackScope: this
        });
    };

    handleRingCollision() {
        console.log("Colisiona bro");
        // Aquí es donde puedes manejar la lógica cuando el jugador colisiona con un aro
        // Por ejemplo, puedes reiniciar el nivel o cambiar a otra escena
        this.scene.start("Menu");
    }
}
