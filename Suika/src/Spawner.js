export default class Spawner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, {key: "Spawner"});  // 'transparentPixel' es una textura de 1x1 píxel transparente
        this.scene.add.existing(this);
        this.isDead = false;

        // Asignar la imagen al sprite
        this.setTexture('spawner');

        this.cursors = scene.input.keyboard.addKeys({
            drop: Phaser.Input.Keyboard.KeyCodes.SPACE,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move();
        console.log(this.x + " " + this.y);
    }

    move() {
        if (!this.isDead) {
            if (this.cursors.left.isDown) {
                this.x -= 2;  // Ajusta la velocidad según sea necesario
            } else if (this.cursors.right.isDown) {
                this.x += 2;  // Ajusta la velocidad según sea necesario
            }

            if (this.cursors.drop.isDown) {
                this.scene.generateRandomFruit();
            }
        }
    }

    selfDestroy() {
        this.destroy();
    }
}
