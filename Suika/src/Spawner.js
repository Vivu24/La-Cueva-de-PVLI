export default class Spawner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spriteN) {
        super(scene, x, y, spriteN, { key: "Spawner" });

        this.spriteN = spriteN;
        this.scene.add.existing(this);
        this.isDead = false;

        this.setTexture("fruit" + spriteN);

        this.cursors = scene.input.keyboard.addKeys({
            drop: Phaser.Input.Keyboard.KeyCodes.SPACE,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this.dropCooldown = 0;  // Inicializa el cooldown a 0
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move(dt);
        
        this.setTexture("fruit" + this.spriteN);
    }

    move(dt) {
        if (!this.scene.gameCompleted) {
            // Actualiza el cooldown
            this.dropCooldown = Math.max(0, this.dropCooldown - dt / 1000);

            if (this.cursors.left.isDown) {
                this.x -= 3;
            } else if (this.cursors.right.isDown) {
                this.x += 3;
            }

            // Verifica si se puede soltar una fruta (cooldown ha terminado)
            if (this.cursors.drop.isDown && this.dropCooldown === 0) {
                this.scene.checkLimit();
                this.scene.generateRandomFruit();
                this.dropCooldown = 1;  // Establece el cooldown a 1 segundo
            }
        }
    }

    initializeTexture(scale){
        this.setScale(scale);
    }

    changeTexture(scale){
        this.spriteN = this.scene.nextFruitNumber;  // Actualiza el número de fruta del spawner
        this.setTexture("fruit" + this.spriteN);  // Establece la textura correspondiente
        this.setScale(scale);  // Establece la escala según la información de la fruta
    }
    
    

    selfDestroy() {
        this.destroy();
    }
}
