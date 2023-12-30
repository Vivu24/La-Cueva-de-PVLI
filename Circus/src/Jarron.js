export default class Jarron extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'jarron' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(3);
        this.playerOffsetRight = {x: 2, y: 0};
        this.playerOffsetLeft = {x: 0, y: 0};
        this.setImmovable(true);

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(20, 30);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Desactivar la gravedad
        //this.body.setGravity(0, 0);
        this.body.setAllowGravity(false)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt); 
        this.anims.play('walkJarron', true);
    }
}
