export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'Enemy' });

        // Asignar un identificador único al enemigo
        this.enemyId = Phaser.Math.RND.uuid(); // Usa el generador de UUID de Phaser

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = {x: 0, y: 0};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(16, 16);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Desactivar la gravedad
        this.body.setAllowGravity(true);

        // Añadir tween para movimiento armónico simple con duración más larga
        this.tween = this.scene.tweens.add({
            targets: this,
            x: x + 75, // Ajusta la amplitud del movimiento
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000 // Ajusta la duración del tween (en milisegundos)
        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();     
    }

    move() {
        if (!this.isDead) {            
            this.setVelocityY(40);
            this.anims.play('naboRotando', true);
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
            // Colisión detectada, realiza acciones necesarias
            console.log("Colisión con el jugador");

            // Por ejemplo, podrías desencadenar la lógica de colisión aquí
            player.destroy();

            scene.levelConclusionText("Defeat");

            scene.handlePlayerDamageCollision();
        }

        return collision;
    }

    selfDestroy(){
        console.log("Me destruyo antes");
        this.destroy();
        console.log("Me destruyo despues");
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
        console.log("freeze del enemy");
        this.tween.stop();  // Detener el tween al congelar al enemigo
    }

    getId() {
        return this.enemyId;
    }
}
