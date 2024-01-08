export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'Pause' });
    }

    create() {
        this.createButton('Continue', 0, 0, 'red', 'blue');
    }

    createButton(text, yOffset, players, textColor, strokeColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'gummy',
                fontSize: 25,
                color: textColor,
                stroke: strokeColor,
                strokeThickness: 2 // Grosor del borde
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Level", {nPlayers : players});
        });
    }

    update() {}
}