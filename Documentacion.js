/*+++++++Button+++++++*/
let button = this.add.text(x, y, 'Texto', 
        { fontFamily: 'Fuente', fontSize: 50 /*Tamaño*/, color: 'Color' }).setOrigin(0.5,0.5);
button.setInteractive();
button.on("pointerdown", () => {
    // Acciones a realizar cuando se clica el botón
});

/*+++++++Incluir Canvas+++++++*/
<div class = "canvas">
    <script src = "src/game.js" type="module"></script>
</div>


/*+++++++Crear Escena+++++++*/
export default class NombreEscena extends Phaser.Scene{

    constructor(){
        super({key: 'NombreEscena'});
    }
}

/*+++++++Añadir Texto+++++++*/ // Esto parece que peta en el circus xd
this.texto = this.generateText(this.cameras.main.centerX, this.cameras.main.centerY, 'Texto', 
        { fontFamily: 'Fuente', fontSize: 50 /*Tamaño*/, color: 'Color' }).setOrigin(0.5,0.5);

        // Se puede usar esto:
let title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'CIRCUS', 
{ fontFamily: 'arcade_classic', fontSize: 50 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);
