export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }

    create() {
        // Paramos el audio
        this.sound.stopAll();

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            'JETPAC',
            {
                fontFamily: 'Pixeled',
                fontSize: 25,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        // Botones
        this.createButton('Easy', 10, 2, 2, 'white');
        this.createButton('Medium', 30, 3, 1, 'white');
        this.createButton('Hard', 50, 5, 0.5, 'white');
    }

    createButton(text, yOffset, unidades, sec, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'Pixeled',
                fontSize: 10,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Level", {maxFuel : unidades, meteorCooldown : sec});
        });
    }

    update() {}
}
