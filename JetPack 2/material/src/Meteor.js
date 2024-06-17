export default class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'meteor');
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(16, 14);
        this.body.setAllowGravity(false);

        this.anims.play('meteorIdle', true);

        // Generar un ángulo aleatorio entre -20 y 20 grados
        this.angle = this.scene.getRandomNumber(-20, 20);
        
        // Convertir el ángulo a radianes para calcular la dirección del movimiento
        this.radianAngle = Phaser.Math.DegToRad(this.angle);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        this.checkToroid();
        this.checkFloorCollision();
    }

    checkFloorCollision(){
        if(this.body.blocked.down || this.body.touching.down || this.body.blocked.left || this.body.blocked.right){
            this.isDead = true;
            this.freeze();
            this.anims.play('meteorBoom', true);

            this.scene.time.delayedCall(2000, () => { 
                this.destroy();
            }, [], this);  
        }
    }

    move() {
        if (!this.isDead) {
            // Calcular la velocidad en X e Y basado en el ángulo
            const velocityX = Math.cos(this.radianAngle) * 20;
            const velocityY = Math.sin(this.radianAngle) * 20;

            this.setVelocityX(velocityX);
            this.setVelocityY(velocityY);

            // Calcular el ángulo de rotación basado en la dirección del movimiento
            const angle = Math.atan2(velocityY, velocityX);
            this.rotation = angle;

            this.anims.play('meteorIdle', true);
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }

    checkToroid(){
        if(this.x >= this.scene.cameras.main.width){
            this.x = 0;
        } else if(this.x < 0){
            this.x = this.scene.cameras.main.width;
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
