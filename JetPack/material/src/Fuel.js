export default class Fuel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'Fuel' });

        // Asignar un identificador único al enemigo
        this.enemyId = Phaser.Math.RND.uuid(); // Usa el generador de UUID de Phaser
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = {x: 0, y: 0};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(19, 11);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Desactivar la gravedad
        this.body.setAllowGravity(true);

        // Asignar la imagen al sprite
        this.setTexture('fuel');

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.checkFloorCollision();
    }

    checkCollisionWithPlayer(player) {
        if (this.isDead) {
            // Si ya está muerto, no hay colisión
            return false;
        }

        // Verifica la colisión con el jugador
        const collision = this.scene.physics.world.overlap(this, player);

        if (collision && !this.scene.movingFuel) {
            this.scene.movingFuel = true;
            this.scene.createAuxFuel();
            this.isDead = true;
            this.destroy();
            
        }
        
        return collision;
    }

    checkFloorCollision(){
        if(this.body.blocked.down || this.body.touching.down){
            this.freeze();
        }
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