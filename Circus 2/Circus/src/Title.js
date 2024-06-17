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
            'Circus',
            {
                fontFamily: 'arcade_classic',
                fontSize: 40,
                color: 'white',
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion del texto
        title.setAlign('center');

        //Color del reborde de la letra y grosor.
        //title.setStroke('white', 8)

        // Botones
        this.createButton('Easy', 0, 1, 'white');
        this.createButton('Medium', 20, 2, 'white');
        this.createButton('Hard', 40, 3, 'white');
    }

    createButton(text, yOffset, unidades, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'arcade_classic',
                fontSize: 15,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Level", {difficulty : unidades});
        });
    }

    update() {}
}
