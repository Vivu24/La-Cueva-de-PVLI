export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'Pause', active: false });
    }

    create() {
        // Fondo semitransparente
        const rect = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7).setOrigin(0);

        // Texto de pausa
        const pauseText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 50,
            'PAUSED',
            {
                fontFamily: 'gummy',
                fontSize: 50,
                color: 'White',
                stroke: '0xffffff',
                strokeThickness: 6
            }
        ).setOrigin(0.5, 0.5);

        // Botón de resume
        const resumeButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 50,
            'RESUME',
            {
                fontFamily: 'gummy',
                fontSize: 30,
                color: 'White',
                stroke: '0xffffff',
                strokeThickness: 4
            }
        ).setOrigin(0.5, 0.5).setInteractive();

        // Evento de clic para reanudar el juego
        resumeButton.on('pointerdown', () => {
            this.scene.stop('Pause');
            this.scene.get('Level').isPaused = false; // Actualizar el estado de pausa en Level.js
            this.scene.get('Level').scene.resume();
        });
    }
}