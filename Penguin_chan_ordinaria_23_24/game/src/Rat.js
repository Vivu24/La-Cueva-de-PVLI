import Ball from "./Ball.js";

export default class Rat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, 'rat'); // Corrige la forma en que se crea el sprite

        this.number = number;
        this.scene.add.existing(this);
        this.playerOffsetRight = { x: 5, y: 5 };
        this.playerOffsetLeft = { x: 5, y: 5 };
        this.scene.physics.world.enable(this);
        this.isDead = false;
        this.inputEnable = true;
        this.shootKeyReleased = true; // Variable para controlar el estado de la pulsación

        // Ajustar el tamaño del cuerpo de físicas
        this.body.setSize(32, 32);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Velocidad del jugador
        this.speed = 40;
        this.movingRight = true;

        // Booleano para saber si tiene bola o no
        this.hasBall = false;

        // Llamar a la función cada 3 segundos
        this.scene.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                this.autoShoot();
            }
        });

        // Estado de aturdimiento
        this.stunned = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move(t);
    }

    move(t) {
        if (this.inputEnable) {
            // Establecer la velocidad basada en las teclas presionadas
            this.setVelocity(0);
            
            if (this.x <= 120 ) {
                this.movingRight = true;
            } else if (this.x >= 340) {
                this.movingRight = false;
            }

            if (this.movingRight){                
                this.moveHorizontal(this.speed)
            }else{
                this.moveHorizontal(-this.speed)
            }

            // Movimiento de la bola que recoge
            if (this.hasBall && !this.thrown) {
                if (this.number === 1) {
                    this.ball.x = this.x + 15; 
                    this.ball.y = this.y;
                } else {
                    this.ball.x = this.x + 15; 
                    this.ball.y = this.y + 20;
                }
            }

            // Ajusta la animación de acuerdo con la velocidad
            this.setAnimation();
        }
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    autoShoot(){
        const ballCollided = this.scene.collisionRatBall();
        console.log(ballCollided == null)
        if (!this.hasBall && ballCollided != null) {
            this.pickBall(ballCollided);
        } else if (this.hasBall) {
            this.throwBall();
        }
    }

    throwBall() {
        this.ball.setVelocityY(this.speed);

        this.hasBall = false;
        this.thrown = true;
    }

    pickBall(ballCollided) {
        this.ball = new Ball(this.scene, this.x + 15, this.y + 20);

        this.scene.ballPool.push(this.ball);
        this.hasBall = true;
        this.thrown = false;

        ballCollided.destroy();
    }

    stun(){
        console.log("Stun");
        this.desactivateInput();
        this.stunned = true;
        this.setAnimation();
        this.setVelocityX(0);

        const restartState = () => {
            this.inputEnable = true;  
            this.stunned = false;
            this.setAnimation();
            console.log("restartstate");
        };

        // Evento que actualice el temporizador
        this.scene.time.addEvent({
            delay: 2000,
            loop: false,
            callback: restartState,
            callbackScope: this
        });
    }

    desactivateInput() {
        this.inputEnable = false;
    }

    moveHorizontal(velocity) {
        this.setVelocityX(velocity);
    }

    setAnimation() { 
        if (this.stunned){
            this.anims.play('ratStun', true);
        } else if (this.body.velocity.x < 0) {
            this.anims.play('ratMove', true);
        } else if (this.body.velocity.x > 0) {
            this.anims.play('ratMove', true);
        } else if (this.hasBall) {
            this.anims.play('ratMoveBall', true);
        } else {
            this.anims.play('ratIdle', true);
        }
    }

    freeze() {
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }
}
