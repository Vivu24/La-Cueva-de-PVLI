import Player from "./Player.js";
import Ball from "./Ball.js";
import Rat from "./Rat.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.gameTime = 90; // 90 segundos para el juego
        this.ballsZone1 = 0;
        this.ballsZone2 = 0;
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
        this.ballPool = [];

        // Player Penguin
        this.player = new Player(this, 115, 424, 1);

        // Modo 2 Jugadores
        if(this.amountOfPlayers == 2){
            console.log("2 Jugadores")
            this.player2 = new Player(this, 115, 156, 2);
            this.players.push(this.player2);
        } 
        // Modo 1 Jugador
        else {
            console.log("1 Jugador")
            this.rat = new Rat(this, 145, 156, 2)
            this.players.push(this.rat);
        }
        this.players.push(this.player);

        // Zonas
        this.zone1 = this.createZone(120, 120, 220, 40);
        this.zone2 = this.createZone(120, 440, 220, 40);

        // Bolas
        this.spawnBolas();

        // HUD - Tiempo
        this.timerText = this.add.text(20, 20, this.gameTime,
            { fontFamily: 'babelgam', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
        this.timerHUD();
    }

    update() {
        this.checkCollision();
        //this.updateHUD();

        if(this.gameTime <= 0 && !this.gameEnd){
            this.finishGame();
            this.gameEnd = true;
        }
    }

    finishGame(){
        // Configurar una superposición entre el jugador y la zona
        this.ballPool.forEach(ball => {
            // Verifica la colisión con cada zona
            const collision = this.physics.world.overlap(ball, this.zone1);
            const collision2 = this.physics.world.overlap(ball, this.zone2);
            if(collision){
                this.ballsZone1++;
            }
            if(collision2){
                this.ballsZone2++;
            }
        });

        this.victoryText();
        this.time.delayedCall(5000, () => {
            this.goToTitle();
        }, [], this);
    }

    victoryText(){
        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'Victory\n' + this.ballsZone1 + "/" + this.ballsZone2,
            {
                fontFamily: 'babelgam',
                fontSize: 80,
                color: 'Blue',
            }
        ).setOrigin(0.5, 0.5);
        title.setAlign('center');
    }

    spawnBolas(){
        for(let i = 0; i < 5; i++){
            this.ball = new Ball(this, 130 + i*50, 160);
            this.ballPool.push(this.ball);
        }
        for(let i = 0; i < 5; i++){
            this.ball = new Ball(this, 130 + i*50, 435);
            this.ballPool.push(this.ball);
        }
    }

    createZone(x, y, w, h){
        this.zone = this.add.zone(x, y, w, h);
        this.physics.world.enable(this.zone);
        this.zone.body.setAllowGravity(false);
        this.zone.body.setImmovable(true); // Cambiado a true para hacerlo inmóvil
        this.zone.setOrigin(0,0);

        return this.zone;
    }

    

    checkCollision(){
        this.ballPool.forEach(ball => {
            // Verifica la colisión con cada zona
            const collision = this.physics.world.overlap(ball, this.zone1);
            const collision2 = this.physics.world.overlap(ball, this.zone2);
            if(collision || collision2){
                ball.freeze();
            }
        });
        
        // Llama al stun cuando la pelota viene de ser lanzada
        this.ballPool.forEach(ball => {
            this.players.forEach(player => {
                const collision = this.physics.world.overlap(ball, player);
                if(collision){
                    if(player == this.player && ball.body.velocity.y > 0){
                        player.stun();
                    }
                    else if((player == this.player2 || player == this.rat) && ball.body.velocity.y < 0){
                        player.stun();
                    }
                }
            })
        });

        // Llama al stun cuando la pelota viene de ser lanzada
        this.ballPool.forEach(ball => {
            this.ballPool.forEach(ball2 => {
                const collision = this.physics.world.overlap(ball, ball2);
                if(collision){
                    if(ball != ball2){
                        ball.body.setVelocityY(ball.body.velocity.y * -1);
                        ball2.body.setVelocityY(ball2.body.velocity.y * -1);
                    }
                }
            })
        });
    }

    collisionPlayerBall1(){
        this.ballCollidedPlayer = null;
        this.ballPool.forEach(ball => {
            const collision = this.physics.world.overlap(ball, this.player);
            if(collision){
                console.log("colisionasecas")
                this.ballCollidedPlayer = ball;
            }
        });
        return this.ballCollidedPlayer;
    }

    collisionPlayerBall2(){
        this.ballCollidedPlayer = null;
        this.ballPool.forEach(ball => {
            const collision = this.physics.world.overlap(ball, this.player2);
            if(collision){
                console.log("colisionasecas")
                this.ballCollidedPlayer = ball;
            }
        });
        return this.ballCollidedPlayer;
    }

    collisionRatBall(){
        this.ballCollidedPlayer = null;
        this.ballPool.forEach(ball => {
            const collision = this.physics.world.overlap(ball, this.rat);
            if(collision){
                console.log("colisionasecas")
                this.ballCollidedPlayer = ball;
            }
        });
        return this.ballCollidedPlayer;
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

            if(this.gameTime > 0){
                // Crear el nuevo texto actualizado en el mismo sitio
                this.timerText = this.add.text(20, 20, this.gameTime,
                    { fontFamily: 'babelgam', fontSize: 15, color: 'White' }).setOrigin(0.5, 0.5);
            }
        };
        // Evento que actualice el temporizador
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
