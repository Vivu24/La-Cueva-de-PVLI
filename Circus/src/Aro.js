export default class Aro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'aro' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(3);
        this.playerOffsetRight = {x: 10, y: 75};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(10, 10);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Desactivar la gravedad
        //this.body.setGravity(0, 0);
        this.body.setAllowGravity(false)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();        
    }

    move() {
        this.setVelocityX(-100);

        this.anims.play('walkAro', true);
    }
}
