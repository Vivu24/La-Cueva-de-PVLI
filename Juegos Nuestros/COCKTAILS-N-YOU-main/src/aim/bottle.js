export default class Bottle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x ,y, key){
        super(scene, x ,y, key)
        this.type = key;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setInteractive();
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.move();
        this.setScale(0.15);
        this.body.setSize(125,350);
    }
    create(){
        this.image = this.scene.add.image(this.x, this.y, 'this.type');
        this.image.setDepth(1);
    }
    move(){
        this.setVelocity(Phaser.Math.RND.integerInRange(-100,100) +1, Phaser.Math.RND.integerInRange(-100,100) +1);
    }
    
}