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
            'SUIKA',
            {
                fontFamily: 'suikaFont',
                fontSize: 25,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        // Botones
        this.createButton('Play', 10, 2, 2, 'white');
    }

    createButton(text, yOffset, unidades, sec, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'suikaFont',
                fontSize: 10,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Level");
        });
    }

    update() {}
}
