


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'player' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2);
        this.playerOffsetRight = {x:5, y: 16}
        this.playerOffsetLeft = {x:23, y:16}
        this.lookingRight = true;


        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(20, 35)
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y)
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interact: Phaser.Input.Keyboard.KeyCodes.E,
            esc:  Phaser.Input.Keyboard.KeyCodes.ESC
            
        });
        
       
        // Velocidad del jugador
        this.speed = 200;
    }
    preUpdate(t,dt) {
        super.preUpdate(t,dt)
        this.move();

        if(this.scene.scene.key === 'barScene' && this.cursors.interact.isDown) {
            this.scene.checkInteractions(this.x, this.y);
            // this.customerInteraction();
            // this.itemInteraction();
        }
        
    }
    move() {
        // Establecer la velocidad basada en las teclas presionadas
        this.setVelocity(0);

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
        }

        if (this.cursors.left.isDown) {
            this.moveHorizontal(-this.speed);
            if(this.lookingRight) this.flipDirection()
        } else if (this.cursors.right.isDown) {
            this.moveHorizontal(this.speed);
            if(!this.lookingRight) this.flipDirection()
        }

        // Ajusta la animación de acuerdo con la velocidad
        this.setAnimation();
    }

    moveHorizontal(velocity) {
        this.setVelocityX(velocity);}

    flipDirection() {
        this.lookingRight = !this.lookingRight;
        this.setFlipX(!this.lookingRight);
        const xOffset = this.lookingRight ? this.playerOffsetRight.x : this.playerOffsetLeft.x;
        const yOffset = this.lookingRight ? this.playerOffsetRight.y : this.playerOffsetLeft.y;
        this.body.setOffset(xOffset, yOffset);
        this.x += this.lookingRight ? 48 : -48;
    }

    setAnimation() {
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.anims.play('player_walk', true);
        } else {
            this.anims.play('player_idle', true);
        }
    }
    // move(){
    //     if (this.cursors.up.isDown) {
    //         this.setVelocityY(-this.speed);
    //         this.anims.play('player_walk', true);
    //     } else if (this.cursors.down.isDown) {
    //         this.setVelocityY(this.speed);
    //         this.anims.play('player_walk', true);
    //     } else {
    //         this.setVelocityY(0);
    //     }

    //     if (this.cursors.left.isDown) {
    //         this.setVelocityX(-this.speed);
    //         this.anims.play('player_walk', true);
    //         if (this.lookingRight) {
    //             this.lookingRight = false;
    //             this.setFlipX(true);
    //             this.body.setOffset(this.playerOffsetLeft.x, this.playerOffsetLeft.y)
    //             this.x -= 48; // Ajusta según el tamaño del sprite
    //         }
    //     } else if (this.cursors.right.isDown) {
    //         this.anims.play('player_walk', true);
    //         this.setVelocityX(this.speed);
    //         if (!this.lookingRight) {
    //             this.lookingRight = true;
    //             this.setFlipX(false);
    //             this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y)
    //             this.x += 48; // Ajusta según el tamaño del sprite
    //         }
    //     } else {
    //         this.setVelocityX(0);
    //     }
    //     if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
    //         this.anims.play('player_idle', true);
    //     }
    // }
}
