export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }

    create() {
        console.log("Title");

        // Paramos el audio
        this.sound.stopAll();
        // Cargamos la Música
        this.music = this.sound.add('music', { loop: true, volume: 0.25 });
        // Empezamos la Música
        this.music.play();

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 250,
            'SUIKA',
            {
                fontFamily: 'suikaFont',
                fontSize: 150,
                color: 'Purple',
            }
        ).setOrigin(0.5, 0.5);

        // Botones
        this.createButton('PLAY', 250, 2, 2, 'Orange');

        this.fruit = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "fruit11")
    }

    createButton(text, yOffset, unidades, sec, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'suikaFont',
                fontSize: 100,
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
