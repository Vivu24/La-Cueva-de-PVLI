export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.playerOffsetRight = { x: 0, y: 0 };
        this.playerOffsetLeft = { x: 0, y: 0 };
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(17, 24);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.anims.play('idlePlayer', true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
    }

    move() {
        if (!this.isDead) {
            if (this.cursors.left.isDown) {
                this.setVelocityX(-75);
                this.setFlipX(true); // Voltear el sprite hacia la izquierda
                if (this.body.blocked.down || this.body.touching.down) {
                    this.anims.play('walkingPlayer', true);
                }
            } else if (this.cursors.right.isDown) {
                this.setVelocityX(75);
                this.setFlipX(false); // Restaurar la orientación original del sprite
                if (this.body.blocked.down || this.body.touching.down) {
                    this.anims.play('walkingPlayer', true);
                }
            } else {
                this.setVelocityX(0);
                if (this.body.blocked.down || this.body.touching.down) {
                    this.anims.play('idlePlayer');
                }
            }

            if (this.cursors.up.isDown) {
                this.setVelocityY(-100);
                this.anims.play('flyingPlayer');
            }
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }
    
    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    selfDestroy() {
        this.destroy();
    }
}
