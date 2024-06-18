export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'ball' });

        // Asignar un identificador único al enemigo
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = {x: 0, y: 0};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(16, 16);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);
        this.body.setCircle(8);
        // Desactivar la gravedad
        this.body.setAllowGravity(false);
        this.directionX = 0;
        // Asignar la imagen al sprite
        this.setTexture('ball');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.setDirectionX(this.directionX);
        this.checkCollisionWithOtherBalls(this.scene.ballPool);
    }

    setDirectionX(x) {
        this.setVelocityX(x);

    }

    checkCollisionWithOtherBalls(balls) {
        balls.forEach(ball => {
            if (ball !== this && ball.isShooted && this.isShooted) { // Evitar colisiones consigo misma y con bolas inactivas
                const collision = this.scene.physics.world.overlap(this, ball);
                if (collision) {
                    this.handleCollisionWithBall(ball);
                }
            }
        });
    }

    handleCollisionWithBall(otherBall) {
        // Calcular la nueva dirección para cada bola
        console.log("siuuu");
       
        this.directionX = Phaser.Math.Between(-50, 50);
        otherBall.directionX = Phaser.Math.Between(-50, 50);
    }

    selfDestroy(){
        this.destroy();
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    getId() {
        return this.ballId;
    }
}
