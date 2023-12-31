export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'Enemy' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = {x: 0, y: 0};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(10, 10);
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

        this.anims.play('naboRotando', true);
    }
}
