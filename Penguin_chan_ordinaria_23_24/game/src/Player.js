import Ball from "./Ball.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'penguin' });

        this.scene.add.existing(this);
        this.playerOffsetRight = { x: 5, y: 5 };
        this.playerOffsetLeft = { x: 5, y: 5 };
        this.scene.physics.world.enable(this);
        this.isDead = false;
        this.inputEnable = true;
        this.lastShotTime = 0;  // Tiempo del último disparo
        this.shootCooldown = 1000;  // Cooldown en milisegundos
        this.shootingLevel = 1;

        // Ajustar el tamaño del cuerpo de físicas
        this.body.setSize(32, 32);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shoot: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Velocidad del jugador
        this.speed = 40;

        // Booleano para saber si tiene bola o no
        this.hasBall = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move(t);
    }

    move(t) {

        if (this.inputEnable){
            // Establecer la velocidad basada en las teclas presionadas
            this.setVelocity(0);
    
            if (this.cursors.left.isDown && this.x > 120) {
                this.moveHorizontal(-this.speed);
            } else if (this.cursors.right.isDown && this.x < 340) {
                this.moveHorizontal(this.speed);
            }

            // Movimiento de la bola que recoge
            if(this.hasBall && !this.thrown){
                this.ball.x = this.x + 15; 
                this.ball.y = this.y;
            }
            
            if (this.cursors.shoot.isDown && !this.hasBall) {
                this.pickBall();
            }

            // Ajusta la animación de acuerdo con la velocidad
            this.setAnimation();
        }
    }
    
    pickBall() {
        this.ball = new Ball(this.scene, this.x + 15, this.y);
        this.hasBall = true;
        this.scene.ballCollided.destroy();
    }

    desactivateInput(){
        this.inputEnable = false;
    }

    moveHorizontal(velocity) {
        this.setVelocityX(velocity);
    }

    setAnimation() { 
        if (this.body.velocity.x < 0) {
            this.anims.play('penguinMove', true);
        } 
        else if (this.body.velocity.x > 0){
            this.anims.play('penguinMove', true);
        }
        else if(this.hasBall){
            this.anims.play('penguinMoveBall', true);
        }
        else {
            this.anims.play('penguinIdle', true);
        }
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }

}
