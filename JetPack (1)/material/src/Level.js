import Player from "./Player.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameTime = 90; // 90 segundos para el juego

    }

    init(data) {
        this.diff = data.difficulty || 0;
    }

    create() {

        // *** TILEMAP *** // en el enunciado nos dice q los tiles son 8x8
        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("ground_ts", "tileset");
        this.groundLayer = map.createLayer('ground', tileset);

        // Colision con el suelo / plataformas
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.groundLayer);

        this.player = new Player(this,100,100);
    }

    update() {
        //this.checkCollision();

    }

    finishGame(){

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
