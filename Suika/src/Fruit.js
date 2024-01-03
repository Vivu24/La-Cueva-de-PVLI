export default class Fruit extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, number) {
        super(scene.matter.world, x, y, 'fruit' + number);
        this.scene.add.existing(this);

        this.enemyId = Phaser.Math.RND.uuid();
        this.isDead = false;

        this.setBody({ type: 'rectangle', width: 16, height: 16 });
        this.setIgnoreGravity(false);
        this.setTexture('fruit' + number);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        this.checkBounds();
        this.checkFloorCollision();
    }

    move() {
        if (!this.isDead) {
            this.setVelocityY(40);
        }
    }

    checkBounds() {
        const bounds = this.scene.physics.world.bounds;
        const buffer = 8; // Margen de seguridad para evitar que la fruta esté demasiado cerca del borde

        if (this.x < bounds.left + buffer) {
            this.x = bounds.left + buffer;
        } else if (this.x > bounds.right - buffer) {
            this.x = bounds.right - buffer;
        }

        if (this.y < bounds.top + buffer) {
            this.y = bounds.top + buffer;
        } else if (this.y > bounds.bottom - buffer) {
            this.y = bounds.bottom - buffer;
        }
    }

    selfDestroy() {
        this.destroy();
    }

    freeze() {
        this.setIgnoreGravity(true);
        this.setVelocity(0, 0);
    }

    getId() {
        return this.enemyId;
    }
}
