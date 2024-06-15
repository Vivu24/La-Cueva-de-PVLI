import Player from "./Player.js";
import Ball from "./Ball.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.gameTime = 90; // 90 segundos para el juego


    }

    init(data) {
        this.amountOfPlayers = data.nPlayers || 0;
    }

    create() {
        this.gameCompleted = false;

        // Imagenes
        this.background = this.add.image(0, this.cameras.main.height, "background").setOrigin(0, 1);
        this.table = this.add.image(115, this.cameras.main.height - 50, "table").setOrigin(0, 1);
        this.scoreboard = this.add.image(350, this.cameras.main.height - 150, "scoreboard").setOrigin(0, 1);

        this.players = [];
        this.ratBallPool = [];
        this.pengBallPool = [];

        // Player Penguin
        this.player = new Player(this, 115, 424);
        this.players.push(this.player);

        // Zonas
        this.createZone(120, 150, 220, 40);
        this.createZone(120, 420, 220, 40);

        // Bolas
        this.spawnBolas();

        // Configurar una superposición entre el jugador y la zona
        //this.physics.add.overlap(this.player, this.zone, this.metodoAqui, null, this);

        // HUD - Tiempo
        this.timerText = this.add.text(20, 20, this.gameTime,
            { fontFamily: 'babelgam', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
        this.timerHUD();

    }

    update() {
        this.checkCollision();
        //this.updateHUD();
    }

    spawnBolas(){
        for(let i = 0; i < 5; i++){
            this.ball = new Ball(this, 130 + i*50, 168);
            this.ratBallPool.push(this.ball);
        }
        for(let i = 0; i < 5; i++){
            this.ball = new Ball(this, 130 + i*50, 430);
            this.pengBallPool.push(this.ball);
        }

    }

    createZone(x,y,w,h){
        this.zone = this.add.zone(x,y,w,h);
        this.physics.world.enable(this.zone);
        this.zone.body.setAllowGravity(false);
        this.zone.body.setImmovable(false);
        this.zone.setOrigin(0,0);
    }

    checkCollision(){
        // Colision pinguino con bolas
        this.pengBallPool.forEach(ball => {
            // Verifica la colisión con cada jugador
            this.players.forEach(player => {
                const collision = this.physics.world.overlap(ball, player);
                if(collision){
                    this.ballCollided = ball; //?¿¿?¿?
                }
            });
        });
    }

    goToTitle() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    HUD(){
        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            "Score",
            {
                fontFamily: 'babelgam',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    // Lo llamas en el create
    timerHUD(){
        const updateTimer = () => {
            // Vamos restando de uno en uno
            this.gameTime -= 1; // Cambia esto según tus necesidades

            // Eliminar el texto anterior
            this.timerText.destroy();

            // Crear el nuevo texto actualizado en el mismo sitio
            this.timerText = this.add.text(20, 20, this.gameTime,
                { fontFamily: 'babelgam', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
        };
        // Evento que actualice timer
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateTimer,
            callbackScope: this
        });
    }
    updateHUD(){
        this.score.destroy();
        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            "Score",
            {
                fontFamily: 'babelgam',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    victoryAnimation() {
        this.gameCompleted = true;

        this.time.delayedCall(2000, () => {

        }, [], this);

        // Agregar un retraso de 5 segundos antes de saltar al menú
        this.time.delayedCall(5000, this.goToTitle, [], this);
    }

}
