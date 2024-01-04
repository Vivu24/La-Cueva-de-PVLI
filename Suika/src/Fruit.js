export default class Fruit extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, number, data, scale) {
        super(scene.matter.world, x, y, 'fruit' + number);

        this.scene.add.existing(this);
        this.enemyId = Phaser.Math.RND.uuid();
        this.isDead = false;
        this.number = number;

        // Reducir el tamaño del sprite según la escala del cuerpo de colisión
        this.setScale(scale);

        this.setBody({
            type: 'circle',
            radius: data.radius * scale,
            frictionAir: 0.05,
            friction: 0.005,
            bounce: 0,
            offsetX: data.offsetX * scale,
            offsetY: data.offsetY * scale,
            density: 0.01, // Ajusta según sea necesario
        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    getId() {
        return this.enemyId;
    }
}
