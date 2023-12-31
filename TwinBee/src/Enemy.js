export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'Enemy' });
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
        //this.body.setGravity(0, 0);
        this.body.setAllowGravity(true)

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();     
    }

    move() {
        this.setVelocityY(20);

        if (!this.isDead){
            this.anims.play('naboRotando', true);
        }
        else{
            this.anims.play('explosionNabo', true);
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

            scene.levelConclusionText("Defeat")

            scene.handlePlayerDamageCollision()
        }

        return collision;
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
        console.log("freeze")
    }
}
