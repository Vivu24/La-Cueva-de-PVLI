export default class Barra extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'paddle')
        this.scene.physics.world.enable(this);
        scene.add.existing(this);

        this.body.allowGravity = false;

    }
}