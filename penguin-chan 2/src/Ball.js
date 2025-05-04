
export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, directionX) {
        super(scene, x, y, 'Ball'); // La clave 'Bullet' se usa para cargar la imagen

        // Asignar un identificador único a la bala
        this.bulletId = Phaser.Math.RND.uuid(); // Usa el generador de UUID de Phaser

        this.directionX = 0;

        // Agregar el sprite al escenario y habilitar las físicas
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.playerOffsetRight = { x: 0, y: 0 };
        this.playerOffsetLeft = { x: 0, y: 0 };

        this.setImmovable(true);
        this.isDead = false;


        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(16, 16);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);
        this.body.setCircle(8);
        // Desactivar la gravedad
        // this.body.setGravity(0, 0);
        this.body.setAllowGravity(true);

        // Asignar la imagen al sprite
        this.setTexture('ball');

        this.isIdle = true;
        this.isShooted = false

        this.originalDirectionX = directionX;

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
      //  this.setDirectionX(this.directionX);
       
        this.checkCollisionWithOtherBalls(this.scene.ballsPool);
    }

    move(x, y) {
        this.setVelocityY(y);
        this.setVelocityX(x);
    }
    setDirectionX(x) {
        this.setVelocityX(x);

    }

    checkCollisionWithPlayer(scene, player) {
        if (this.isDead) {
            // Si el enemigo ya está muerto, no hay colisión
            return false;
        }
        // Verifica la colisión con el jugador
        const collision = this.scene.physics.world.overlap(this, player);
        if (collision ) {
             
            // Colisión detectada, realiza acciones necesarias
            //console.log("Colisión Green con player");
            
            // Por ejemplo, podrías desencadenar la lógica de colisión aquí
            //player.upgradeShootingLevel();
                if(player.number == 1 && !player.isBalling1 ){
                    player.isBalling1 = true;
                    player.carryingBall = this;
                    player.canShoot = true;
                    this.scene.createAuxBall(1);
                    this.isDead = true;
                    this.setVisible(false);
                    this.body.enable = false;
                    this.destroy();
                    
                }
                else if(player.number == 2 && !player.isBalling2) {
                    player.isBalling2 = true;
                    player.carryingBall = this;
                    player.canShoot = true;
                    this.scene.createAuxBall(2);
                    this.isDead = true;
                    this.setVisible(false);
                    this.body.enable = false;
                    this.destroy();
                }
           
  
        }
        return collision;
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

    checkCollisionWithPlayer2(scene, player) {
        const choca = scene.physics.world.overlap(this, player);

        if (choca && this.body.velocity.y !== 0 ) {
            player.stun();
        }
    }
   

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    getId() {
        return this.bulletId;
    }
}
