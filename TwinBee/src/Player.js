export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, number, { key: 'player' });
        this.number = number;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = {x:0, y: 0};
        this.playerOffsetLeft = {x:0, y:0};
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(16, 16)
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y)
        if (this.number == 1){
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE         
            });
        }   
        else {
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER         
            });
        }
        
        
       
        // Velocidad del jugador
        this.speed = 50;
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

        if (this.number == 1){
            if (this.body.velocity.x < 0) {
                this.anims.play('twinbeeMoveLeft', true);
            } 
            else if (this.body.velocity.x > 0){
                this.anims.play('twinbeeMoveRight', true);
            }
            else {
                this.anims.play('twinbeeMove', true);
            }

        }

        else {
            if (this.body.velocity.x < 0) {
                this.anims.play('winbeeMoveLeft', true);
            } 
            else if (this.body.velocity.x > 0){
                this.anims.play('winbeeMoveRight', true);
            }
            else {
                this.anims.play('winbeeMove', true);
            }
        }
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }
}