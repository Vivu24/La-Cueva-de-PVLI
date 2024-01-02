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
            'TwinBee',
            {
                fontFamily: 'gummy',
                fontSize: 50,
                color: 'White',
                stroke: '#' + Math.floor(Math.random() * 16777215).toString(16), // Borde de color aleatorio
                strokeThickness: 6 // Grosor del borde
            }
        ).setOrigin(0.5, 0.5);

        // Botones
        this.createButton('1 Player', 50, 1, 'blue', 'orange');
        this.createButton('2 Player', 100, 2, 'red', 'blue');
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