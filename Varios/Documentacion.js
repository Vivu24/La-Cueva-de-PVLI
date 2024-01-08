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


/*+++++++Animacion+++++++*/
this.anims.create({
    key: 'nombreAnimacion',
    frames: this.anims.generateFrameNumbers('nombreSpriteSheet', {start:0, end:3}),
    frameRate: 5,
    repeat: -1
});


/*+++++++Input+++++++*/
this.cursors = scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    interact: Phaser.Input.Keyboard.KeyCodes.E,
    esc:  Phaser.Input.Keyboard.KeyCodes.ESC    
});

if (this.cursors.left.isDown){
    // Condicion
};


/*+++++++Audio+++++++*/
// Cargamos la Música
this.music = this.sound.add('menuMusic', {loop: true, volume: 0.5});
// Empezamos la Música
this.music.play();

// Parar Audio
 this.sound.stopAll();

// Audio para salto:
this.jumpSound = scene.sound.add('jumpSound', {loop : false, volume: 0.5}); // En el constructor del player
this.jumpSound.play();  // En la accion del salto


/*+++++++Movimiento+++++++*/
function move() {       // Sin el Function logicamente
    if (this.cursors.left.isDown)
    {
        this.setVelocityX(-160);

        this.anims.play('walkLion', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.setVelocityX(160);

        this.anims.play('walkLion', true);
    }
    else
    {
        this.setVelocityX(0);

        this.anims.play('walkLion');
    }

    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.setVelocityY(-400);
    }
}


/*+++++++Timer+++++++*/
function spawnerRing() {        // Sin el Function logicamente
    const createRing = () => {
        this.ring = new Aro(this, this.cameras.main.width + 300, 500)
        this.physics.add.collider(this.player, this.ring);  
    }            
    // Cada 4 segundos realiza el método createRing que vemos arriba
    this.time.addEvent({
    delay: 4000, 
    loop: true,
    callback: createRing,
    callbackScope: this
    });
};

/*+++++++Camara+++++++*/
this.camera = this.cameras.main.startFollow(this.player);



/*+++++++Eror Guapo que ha salido+++++++*/
/*El error que estás experimentando se debe a que la función finishGame 
se está llamando sin tener correctamente vinculado el contexto (this). 
Al llamar a this.player.selfDestroy();, this no está apuntando a la 
instancia de la clase Level como se espera, y por lo tanto, this.player es undefined.

Para solucionar este problema, puedes hacer uso de la función bind para
 asegurarte de que this en finishGame sea siempre la instancia de la clase Level. 
 Modifica la línea donde asignas this.finishGame en el colisionador de la siguiente manera:

  
//this.physics.add.collider(this.player, this.platform, this.finishGame.bind(this));

Además, asegúrate de tener el método selfDestroy definido en la clase Player 
y que este método elimina correctamente el sprite del jugador.

Por ejemplo, en tu clase Player, podrías tener algo así:


// ... Resto del código de la clase Player

selfDestroy() {
    this.destroy();
}

// ... Resto del código de la clase Player
Con estos cambios, deberías evitar el error que estás experimentando. Asegúrate de realizar estos ajustes y prueba nuevamente.*/



/*+++++++TILEMAP+++++++*/

this.load.tilemapTiledJSON('tilemap', './assets/map/mapita.json');
this.load.image('tileset', './assets/sprites/tileset.png');   

const map = this.make.tilemap({
    key: "tilemap",
    tileWidth: 8,
    tileHeight: 8
})

const tileset = map.addTilesetImage("ground_ts","tileset");     //("NombreDePestañaDeTiled", "tilesetQueHemosDeclaradoArriba")

const groundLayer = map.createLayer('ground', tileset);         //("NombreCapaDeTiled")

groundLayer.setCollisionByProperty({ collides: true });         //("HayQuePonerEstaPropiedadEnElEditorDeTiled")

this.physics.add.collider(player, groundLayer);                 // Lógicamente necesitamos un player para activar sus colisiones


/*+++++++DELAY+++++++*/

this.time.delayedCall(5000, metodo(), [], this);                // 5 segs y se llama al método


/*+++++++POOL+++++++*/

this.pool = [];
const element = new Element(this, x, y);
this.pool.push(element);


/*+++++++LEVEL+++++++*/

import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import Green from "./Green.js";
import Pause from "./Pause.js";

/*export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.isPaused = false; // Agregar una bandera para verificar si la escena está pausada
    }

    // ... (código existente)

    create() {
        // ... (código existente)

        this.input.keyboard.on('keydown-Q', this.togglePause, this); // Cambiar a 'keydown-Q' para manejar el evento de presionar Q
    }

    update() {
        if (this.isPaused) {
            return; // No actualizar si la escena está pausada
        }

        // ... (código existente)
    }

    togglePause() {
        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    pauseGame() {
        this.isPaused = true;

        // Puedes agregar lógica adicional de pausa aquí (por ejemplo, mostrar un menú de pausa)
        const pauseMenu = new Pause(this); // Asume que tienes una clase Pause para mostrar un menú de pausa
    }

    resumeGame() {
        this.isPaused = false;

        // Puedes agregar lógica adicional de reanudación aquí (por ejemplo, ocultar el menú de pausa)
    }

    // ... (resto del código)   
}
*/
