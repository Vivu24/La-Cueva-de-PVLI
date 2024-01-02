export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, directionX) {
        super(scene, x, y, directionX, 'Bullet'); // La clave 'Bullet' se usa para cargar la imagen

        // Asignar un identificador único a la bala
        this.bulletId = Phaser.Math.RND.uuid(); // Usa el generador de UUID de Phaser

        this.directionX = directionX;

        // Agregar el sprite al escenario y habilitar las físicas
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.playerOffsetRight = { x: 0, y: 0 };
        this.playerOffsetLeft = { x: 0, y: 0 };

        this.setImmovable(true);
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(7, 7);
        this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y);

        // Desactivar la gravedad
        // this.body.setGravity(0, 0);
        this.body.setAllowGravity(true);

        // Asignar la imagen al sprite
        this.setTexture('bullet');

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
    }

    move() {
        this.setVelocityY(-175);
        this.setVelocityX(this.directionX);
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    getId() {
        return this.bulletId;
    }
}
