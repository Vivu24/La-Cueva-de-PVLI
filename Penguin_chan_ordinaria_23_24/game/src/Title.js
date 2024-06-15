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
            this.cameras.main.centerY - 150,
            'Penguin-Chan\nWars',
            {
                fontFamily: 'babelgam',
                fontSize: 80,
                color: 'Blue',
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion del texto
        title.setAlign('center');

        //Color del reborde de la letra y grosor.
        title.setStroke('white', 8)

        // Botones
        this.createButton('1P Game', 0, 2, 'white');
        this.createButton('VS Game', 50, 2, 'white');
    }

    createButton(text, yOffset, unidades, textColor) {
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
            this.scene.start("Level", {nPlayers : unidades});
        });
    }

    update() {}
}
