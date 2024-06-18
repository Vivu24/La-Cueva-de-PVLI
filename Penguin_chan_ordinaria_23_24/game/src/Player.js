import Ball from "./Ball.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, 'player'); // Corrige la forma en que se crea el sprite

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

        if (this.number === 1) {
            this.cursors = scene.input.keyboard.addKeys({
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE
            });
        } else {
            this.cursors = scene.input.keyboard.addKeys({
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER
            });
        }

        // Velocidad del jugador
        this.speed = 40;

        // Booleano para saber si tiene bola o no
        this.hasBall = false;

        // Listener para el evento de pulsar la tecla
        this.cursors.shoot.on('down', () => {
            if (this.shootKeyReleased) {
                if (number === 1) {
                    const ballCollided = this.scene.collisionPlayerBall1();
                    if (!this.hasBall && ballCollided != null) {
                        this.pickBall(ballCollided);
                        console.log("pillo");
                    } else if (this.hasBall) {
                        this.throwBall();
                        console.log("disparo");
                    }
                } else {
                    const ballCollided = this.scene.collisionPlayerBall2();
                    if (!this.hasBall && ballCollided != null) {
                        this.pickBall(ballCollided);
                        console.log("pillo");
                    } else if (this.hasBall) {
                        this.throwBall();
                        console.log("disparo");
                    }
                }
                this.shootKeyReleased = false;
            }
        });

        // Listener para el evento de soltar la tecla
        this.cursors.shoot.on('up', () => {
            this.shootKeyReleased = true;
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
            
            if (this.cursors.left.isDown && this.x > 120) {
                this.moveHorizontal(-this.speed);
            } else if (this.cursors.right.isDown && this.x < 340) {
                this.moveHorizontal(this.speed);
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
    
    throwBall() {
        if (this.number === 1) {
            this.ball.setVelocityY(-this.speed);
        } else {
            this.ball.setVelocityY(this.speed);
        }
        this.ball.isShooted = true;
        this.hasBall = false;
        this.thrown = true;
    }

    pickBall(ballCollided) {
        if (this.number === 1) {
            this.ball = new Ball(this.scene, this.x + 15, this.y);
        } else {
            this.ball = new Ball(this.scene, this.x + 15, this.y + 20);
        }

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
        if (this.number === 1) {
            if (this.stunned){
                this.anims.play('penguinStun', true);
            } else if (this.body.velocity.x < 0) {
                this.anims.play('penguinMove', true);
            } else if (this.body.velocity.x > 0) {
                this.anims.play('penguinMove', true);
            } else if (this.hasBall) {
                this.anims.play('penguinMoveBall', true);
            } else {
                this.anims.play('penguinIdle', true);
            }
        } else {
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
    }

    freeze() {
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }
}
