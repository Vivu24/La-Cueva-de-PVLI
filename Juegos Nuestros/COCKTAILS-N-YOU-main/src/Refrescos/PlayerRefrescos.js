


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, canJump) {
        super(scene, x, y, { key: 'player' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2);
        this.body.gravity.y = 400


        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(20, 40)
        this.body.setOffset(5, 10)
        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.lookingRight = true;
       
        // Velocidad del jugador
        this.speed = 200;
        this.jumpSpeed = -425;
        this.canJump = canJump;
    }

    preUpdate(t, dt) {
        super.preUpdate(t,dt);
            if(this.scene.runCounter){
                this.move()
            }else this.setVelocityX(0)
    }

    move(){
        if(this.canJump){
            if(this.cursors.jump.isDown && this.body.onFloor()) {
                this.anims.play('player_jump', true);
                this.setVelocityY(this.jumpSpeed);
            }
        }
        

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);

            if(this.body.velocity.y == 0){
                this.anims.play('player_walk', true);
            }

            if (this.lookingRight) {
                this.lookingRight = false;
                this.setFlipX(true);
                this.body.setOffset(20, 10)
                this.x -= 48; // Ajusta según el tamaño del sprite
            }
        } else if (this.cursors.right.isDown) {

            if(this.body.velocity.y == 0){
                this.anims.play('player_walk', true);
            }

            this.setVelocityX(this.speed);
            if (!this.lookingRight) {
                this.lookingRight = true;
                this.setFlipX(false);
                this.body.setOffset(5, 10)
                this.x += 48; // Ajusta según el tamaño del sprite
            }
        } else {
            this.setVelocityX(0);
        }

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.play('player_idle', true);
        }
    }
}
