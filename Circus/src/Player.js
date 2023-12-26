export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'player' });
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2);


        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(20, 35);
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
        } else if (this.cursors.right.isDown) {
            this.moveHorizontal(this.speed);
        }

        // Ajusta la animación de acuerdo con la velocidad
        this.setAnimation();
    }

    moveHorizontal(velocity) {
        this.setVelocityX(velocity);
    }


    setAnimation() {
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.anims.play('walkClown', true);
        } else {
            this.anims.play('walkLion', true);
        }
    }
}
