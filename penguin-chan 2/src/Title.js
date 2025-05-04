export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
        this.selectedOption = 0; // Para rastrear la opción seleccionada
        this.options = ['1P. Game', 'VS. Game']; // Opciones del menú
    }

    create() {
        // Paramos el audio
        this.sound.stopAll();

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'Penguin-chan\nWars',
            {
                fontFamily: 'babelgam',
                fontSize: 60,
                color: 'Blue',
                stroke: 'White', 
                strokeThickness: 3, // Grosor del borde
                 align: 'center'
            }
        ).setOrigin(0.5, 0.5);

      
          // Botones
          this.buttons = [
            this.createButton('Easy', 10, 'white'),
            this.createButton('Hard', 50, 'white')
        ];

        this.ball = this.add.sprite(0, 0, 'ball');
        this.updateSelection(10);

           // Configurar teclas
           this.input.keyboard.on('keydown-W', this.moveUp, this);
           this.input.keyboard.on('keydown-S', this.moveDown, this);
           this.input.keyboard.on('keydown-SPACE', this.startGame, this);



    }

    createButton(text, yOffset, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'babelgam',
                fontSize: 40,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

       return button;
    }

    updateSelection(yOffset) 
    {

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].setColor('white');
        }
       
        this.ball.setPosition( this.cameras.main.centerX - 100, yOffset + this.cameras.main.centerY);
    }

    moveUp() {
        this.selectedOption = (this.selectedOption - 1 + this.buttons.length) % this.buttons.length;
        this.updateSelection(10);
    }

    moveDown() {
        this.selectedOption = (this.selectedOption + 1) % this.buttons.length;
        this.updateSelection(50);
    }

    startGame() {
        const nPlayers = this.selectedOption + 1;
        this.scene.start('Level', { nPlayers: nPlayers });
    }

    update() {}
}
