export default class Pelota extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene,x,y,'ball')
        //añadir a escena pasada a constructor
        this.scene.physics.world.enable(this);
        scene.add.existing(this);
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.isBallReleased = false;
        this.velocity = 400;
        this.setBounce(1);
    }
    preUpdate(){
        if (!this.isBallReleased && this.spaceKey.isDown) {
            this.isBallReleased = true;
            if (Phaser.Math.Between(0, 10) > 5) {
                this.velocity = -this.velocity;
            }
            let speed = 300;
            this.setVelocity(this.velocity, speed);
        }
 
        
    }
}