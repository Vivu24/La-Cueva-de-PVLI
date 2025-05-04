import Ball from './Ball.js';

export default class Rat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, 'rat');
        this.scene = scene;
        this.number = number;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetLeft = { x: 0, y: 0 };
        this.isDead = false;
        this.isBalling2 = false;
        this.carryingBall = null;
        this.canShoot = false;
        this.stunned = false;
        this.speed = 40;
        this.direction = 1; // 1: derecha, -1: izquierda
        this.inputEnable = true;

        this.body.setSize(32, 32);
        this.body.setOffset(this.playerOffsetLeft.x, this.playerOffsetLeft.y);
        this.setCollideWorldBounds(true);
        
        this.scene.time.addEvent({
            delay: 1000,
            callback: this.randomAction,
            callbackScope: this,
            loop: true
        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        if (this.isBalling2) {
            this.scene.updateAuxBall(2);
        }
    }

    move() {
        if (this.stunned) {
            this.setVelocityX(0);
            this.setAnimation();
            return;
        }
        
        if(this.inputEnable){
            this.setVelocityX(this.speed * this.direction);

            // Cambiar dirección al llegar a los bordes
            if (this.x <= 100) {
                this.direction = 1;
            } else if (this.x >= 300) {
                this.direction = -1;
            }
            
            this.setAnimation();
        }
        else {
            this.setVelocityX(0);
            this.canShoot = false;
        }
     
       
    }

    randomAction() {
        if (this.canShoot && Math.random() < 0.5) {
            this.shoot();
        } else if (!this.carryingBall) {
            this.pickBall();
        }
    }

    stun() {
        this.stunned = true;
        this.setVelocityX(0);
        this.scene.time.delayedCall(2000, () => {
            this.stunned = false;
        }, [], this);
    }

    pickBall() {
        this.scene.ballsPool.forEach(ball => {
            ball.checkCollisionWithPlayer(this.scene, this);
        });
    }

    shoot() {
        if (this.carryingBall) {
            const ball = new Ball(this.scene, this.x, this.y + 30);
            this.scene.ballsPool.push(ball);
            ball.setVelocityY(150);

            this.canShoot = false;
            this.isBalling2 = false;
            this.carryingBall = null;
            this.scene.auxBall2.destroy();
        }
    }

    setAnimation() {
        if(!this.stunned){
            if (this.body.velocity.x < 0) {
                if(!this.isBalling2) {
                    this.anims.play('ratMove', true);
                } else {
                    this.anims.play('ratMoveBall', true);
                }
            } else if (this.body.velocity.x > 0){
                if(!this.isBalling2) {
                    this.anims.play('ratMove', true);
                } else {
                    this.anims.play('ratMoveBall', true);
                }
            } else {
                if(!this.isBalling2) {
                    this.anims.play('ratIdle', true);
                } else {
                    this.anims.play('ratIdleBall', true);
                }
            }
        } else {
            this.anims.play('ratStun', true);
        }
    }
}
