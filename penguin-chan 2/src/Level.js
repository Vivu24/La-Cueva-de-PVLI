import Player from "./Player.js";
import Ball from "./Ball.js";
import Rat from "./Rat.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.timeIsUp = false;
    }

    init(data) {
        this.amountOfPlayers = data.nPlayers || 0;
    }

    create() {
        this.gameCompleted = false;

        //Cargar fondo
        this.background = this.add.image(0, this.cameras.main.height, "background").setOrigin(0, 1);
        this.table = this.add.image(80, 200, "table").setOrigin(0, 1);
        this.table.setRotation(Math.PI / 2);
        this.number = this.add.image(200, this.cameras.main.height - 320, "score").setOrigin(0, 1);

        this.players = [];
        this.ballsPool1 = [];
        this.ballsPool2 = [];
        this.ballsPool = [];
        this.numBallUp = 0;
        this.numBallDown = 0;
        //Crear countdown
        this.createCountdown();
       
       
       

        // for (let i = 1; i <= this.amountOfPlayers; i++) {
        //     console.log("Creo Player número " + i)
        //     const player = new Player(this, 200, (this.cameras.main.height / (this.amountOfPlayers + 0.5)) * i, i);
        //     player.setCollideWorldBounds(true);            
        //     this.players.push(player);            
        // }
        if(this.amountOfPlayers == 1) {
            const player1 = new Player(this, 90, 400, 1);
            player1.setCollideWorldBounds(true);   
            this.players.push(player1);    
            const ratAI = new Rat(this, 200, 170, 2);
            ratAI.setCollideWorldBounds(true);
            this.players.push(ratAI);
        }
        else {
            const player1 = new Player(this, 200, 455, 1);
            player1.setCollideWorldBounds(true);   
            this.players.push(player1);    
            const player2 = new Player(this, 200, 170, 2);
            player2.setCollideWorldBounds(true);   
            this.players.push(player2);  
        }

        this.createBalls();

        const ball = new Ball(this, 200, 250);
        ball.setVelocityX(50);
        this.ballsPool.push(ball);


         this.zone1 = this.createZone(90, 320, 15, 236); //ZOna izuqierda (inicial)
         this.zone2 = this.createZone(375, 320, 15, 236); //ZOna derecha
         this.zone3 = this.createZone(230, 200, 300, 15); //ZOna arriba
         this.zone4 = this.createZone(230, 440, 300, 15); //ZOna abajo
         //this.zone5 = this.createZone(130, 320, 15, 236); //ZOna izuqierda (inicial)
         console.log(this.numBallDown);
         console.log(this.numBallUp);

         this.physics.add.overlap(this.ballsPool, this.zone1, this.handleBallZoneCollision, null, this);
         this.physics.add.overlap(this.ballsPool, this.zone2, this.handleBallZoneCollision2, null, this);
         this.physics.add.overlap(this.ballsPool, this.zone3, this.handleBallZoneCollision3, null, this);
         this.physics.add.overlap(this.ballsPool, this.zone4, this.handleBallZoneCollision3, null, this);

         // this.physics.add.overlap(this.ballsPool, this.zone5, this.handleBallZoneCollision2, null, this);

         //this.checkNumBalls();  
        
        //this.physics.add.overlap(this.players, this.trigger, this.handlePlayerTriggerCollision, null, this);

    }

    update() {

        if (this.timeIsUp) {
            this.players.forEach(player => {
                player.inputEnable = false;
            });
        }

        this.ballsPool.forEach(ball => {
            ball.checkCollisionWithPlayer2(this, this.players[0]);
        });
        this.ballsPool.forEach(ball => {
            ball.checkCollisionWithPlayer2(this, this.players[1]);
        });
        //console.log(this.ballsPool1.length);
  
    }

    createAuxBall(num){
        let id = num;
        if(id == 1){
            this.auxBall1 = this.add.sprite(this.players[0].x + 5, this.players[0].y - 10, "ball");
        }
        else if (id == 2){
            this.auxBall2 = this.add.sprite(this.players[1].x + 5, this.players[1].y - 10, "ball");

        }
        
    }

    updateAuxBall(num){
        let id = num;
        if(id == 1){
            this.auxBall1.x = this.players[0].x + 20;
            this.auxBall1.y = this.players[0].y - 15;
        }
        else if (id == 2){
            this.auxBall2.x = this.players[1].x - 15;
            this.auxBall2.y = this.players[1].y - 10;

        }
       
    }
    handleBallZoneCollision(ball, zone) {
       
        // ball.setVelocityY(0); 
        // if (zone === this.zone1) {
        //     this.numBallUp++;
        //     this.numBallDown--;
        // } else if (zone === this.zone2) {
        //     this.numBallDown++;
        //     this.numBallUp--;
        // }
        console.log("choca rebote");
        ball.setVelocityX(0); 
        ball.setVelocityY(0);
     
  
        if (zone === this.zone1 && !ball.inZone1) {
            this.numBallUp++;
            this.numBallDown--;
            ball.inZone1 = true;
            ball.inZone2 = false;
        } else if (zone === this.zone2 && !ball.inZone2) {
            this.numBallDown++;
            this.numBallUp--;
            ball.inZone2 = true;
            ball.inZone1 = false;
        }

        // Asegurarse de que el total de bolas no supere 10
        if (this.numBallUp + this.numBallDown > 10) {
            if (this.numBallUp > this.numBallDown) {
                this.numBallUp--;
            } else {
                this.numBallDown--;
            }
        }
    }

    handleBallZoneCollision2(ball, zone){
        ball.setVelocityX(-ball.body.velocity.x * 1.05);
        let directionY = Phaser.Math.Between(-50, 50);
        ball.setVelocityY(directionY * 1.05);
    }

    handleBallZoneCollision3(ball, zone){
        if(zone === this.zone3){
            ball.setVelocityY(Math.abs(ball.body.velocity.y) * 1.05);
        }
        else if(zone === this.zone4){
            ball.setVelocityY(-(Math.abs(ball.body.velocity.y) * 1.05));
        }
       
        let directionX = Phaser.Math.Between(-50, 50);
        ball.setVelocityX(directionX * 1.05);
    }



  

    goToTitle() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    createBalls() {
    

        let ballY = 220;
        for (let i = 0; i < 5; i++) {
            const ball = new Ball(this, 100, ballY);
            ball.inZone1 = false;
            ball.inZone2 = true;
            this.ballsPool.push(ball);
            ballY += 50;
            this.numBallDown++;
        }

       
    }


    createZone(x, y, w, h) {
        const zone = this.add.zone(x, y, w, h);
        this.physics.world.enable(zone);
        zone.body.setAllowGravity(false);
        zone.body.setImmovable(true);
        return zone;
    }

    handlePlayerTriggerCollision(player, trigger) {
        console.log(`Player ${player.playerId} collided with the trigger!`);
        // Aquí puedes manejar la colisión, por ejemplo, terminando el juego, sumando puntos, etc.
    }

    checkNumBalls(){
        this.numBallUp = 0;
        this.numBallDown = 0;

        this.ballsPool.forEach(ball => {
        // Verifica la colisión con cada zona             
        const collision = this.physics.world.overlap(ball, this.zone1);  
        const collision2 = this.physics.world.overlap(ball, this.zone2);    
       console.log(collision2);
        if(collision){    
            this.numBallUp++;
        }  

        if(collision2){
            this.numBallDown++;
            console.log("hola?");
        }
        });
        
    }

    textoFinal() {
        if(this.numBallUp > this.numBallDown){
            this.levelConclusionText("PLAYER 2 WIN");
          
            console.log("nono");
        }
        else if(this.numBallUp < this.numBallDown) {
            this.levelConclusionText("PLAYER 1 WIN");
        }
        else if(this.numBallUp == 10) {
            this.levelConclusionText("PLAYER 2 WIN");
            console.log("a");
        }
        else if(this.numBallDown == 10) {
            this.levelConclusionText("PLAYER 1 WIN");
        }
        else
            this.levelConclusionText("DRAW");
    }


    levelConclusionText(resolution) {
        console.log("Texto de: " + resolution);
        let finalText = resolution + "\n" + this.numBallUp + " / " + this.numBallDown;
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            finalText,
            {
                fontFamily: 'babelgam',
                fontSize: 50,
                color: 'White',
                stroke: '0x' + Math.floor(Math.random() * 16777215).toString(16),
                strokeThickness: 6,
                align: 'center'  // Asegurar que el texto esté centrado
            }
        ).setOrigin(0.5, 0.5);
    }

    // victoryAnimation() {
    //     this.gameCompleted = true;

    //     this.time.delayedCall(2000, () => {

    //     }, [], this);

    //     // Agregar un retraso de 5 segundos antes de saltar al menú
    //     this.time.delayedCall(5000, this.goToTitle, [], this);
    // }

    createCountdown() {
        this.timeLeft = 90;
        this.countdownText = this.add.text(this.cameras.main.centerX, 50, ` ${this.timeLeft}`, {
            fontFamily: 'babelgam',
            fontSize: 25,
            color: 'White'
        }).setOrigin(0.5, 0.5);
    
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.updateCountdown,
            callbackScope: this
        });
    }
    
    updateCountdown() {
        this.timeLeft--;
        this.countdownText.setText(` ${this.timeLeft}`);
        if (this.timeLeft < 0) {
            
            this.countdownText.visible = false;
           // this.checkNumBalls();
            
           this.time.delayedCall(5000, this.delayedMenuTransition, [], this);
        }
        
    }

    delayedMenuTransition() {
        // Saltar a la escena del Título
        this.time.delayedCall(5000, this.menuTransition, [], this);
        
    }

    menuTransition(){
        this.scene.start("Title");
    }
    

}
