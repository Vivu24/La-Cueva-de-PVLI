export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'Enemy' });

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

        // Desactivar la gravedad
        this.body.setAllowGravity(true);

        // Asignar la imagen al sprite
        this.setTexture('green');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();     
    }

    move() {
        if (!this.isDead) {            
            this.setVelocityY(25);
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
            console.log("Colisión Green con player");

            // Por ejemplo, podrías desencadenar la lógica de colisión aquí
            player.upgradeShootingLevel();
            this.isDead = true;
            this.destroy();
        }

        return collision;
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
        return this.enemyId;
    }
}
