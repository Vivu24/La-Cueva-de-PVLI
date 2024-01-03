export default class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, direction, { key: 'Meteor' });

        // Asignar un identificador único al enemigo
        this.enemyId = Phaser.Math.RND.uuid(); // Usa el generador de UUID de Phaser
        this.direction = direction;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = {x: 0, y: 0};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;
        this.angle += 90;
        this.angle -= this.direction;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(16, 16);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Desactivar la gravedad
        this.body.setAllowGravity(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        this.checkFloorCollision();
    }

    move() {
        if (!this.isDead) {            
            this.setVelocityY(40);
            console.log(this.direction)
            this.setVelocityX(this.direction);
            this.anims.play('fallingMeteor', true);
        }
    }

    checkCollisionWithPlayer(scene, player) {
        if (this.isDead) {
            // Si el enemigo ya está muerto, no hay colisión
            return false;
        }

        // Verifica la colisión con el jugador
        const collision = this.scene.physics.world.overlap(this, player);

        if (collision) {
            this.time.delayedCall(500, () => {    
                
            this.anims.play('explosionAnimation', true);
            }, [], this);
                        
            player.destroy();
            
        }
        
        return collision;
    }

    checkFloorCollision(){
        if(this.body.blocked.down || this.body.touching.down){

            this.destroy();
        }
    }

    selfDestroy(){
        this.destroy();
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.tween.stop();  // Detener el tween al congelar al enemigo
    }

    getId() {
        return this.enemyId;
    }
}