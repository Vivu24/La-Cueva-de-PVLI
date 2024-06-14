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
            this.cameras.main.centerY - 100,
            'Penguin-chan',
            {
                fontFamily: 'babelgam',
                fontSize: 55,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
        let title2 = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 60,
            'Wars',
            {
                fontFamily: 'babelgam',
                fontSize: 55,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        // Botones
        this.createButton('1P Game', 30, 1, 'white');
        this.createButton('2P Game', 70, 2, 'white');
    }

    createButton(text, yOffset, players, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'babelgam',
                fontSize: 30,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Level", {nPlayers : players} );
        });
    }

    update() {}
}
