/*MÉTODOS BÁSICOS DE UNA ESCENA
El motor llama a estos métodos automáticamente:

init: se ejecuta cuando se carga la escena. Aquí se pueden pasar datos entre escenas.
preload: aquí hay que cargar los recursos antes de que sean usados.
create: una vez que la clase está instanciada y el motor está a punto, se llama a este método para inicializar.
update(time, delta): se llama cada ciclo de juego, para modificar el estado.



ALGUNOS SUBSISTEMAS
Accesibles desde el objeto Scene con scene.add, scene.load…:

add: La factoría de GameObject
cameras: La cámara
input: La entrada de Phaser
load: el cargador de recursos
sound: el sistema de sonido
scene: el SceneManager
time: el manager de tiempo
physics: el sistema de físicas


UTILIDADES MATEMÁTICAS
Phaser.Math contiene métodos que ayudan a realizar ciertas operaciones matemáticas típicas de un motor de videojuegos

Además, tiene un generador de números aleatorios muy útil, accesible a través de Phaser.Math.RND


CARGAR
Se le añade una key (clave o nombre) al recurso para poder identificarlo

// this es un objeto Scene
function preload() {
    // Para cargar desde el sitio de Phaser
    this.load.setBaseURL("https://examples.phaser.io/");
    this.load.image('player', 'assets/sprites/phaser-dude.png');
    this.load.image('platform', 'assets/sprites/platform.png');
}


ELIMINACION MEMORIA
Si cambiamos de escena y la desactivamos, es muy probable que haya recursos que ya no utilizaremos nunca

En este caso podemos eliminarlos de la caché de Game

image1.destroy();
sound4.destroy();


SPRITES:
Son las imágenes 2D que sirven para visualizar los objetos en un juego 2D. En Phaser se instancian así:

// this es una Scene
player = this.add.sprite(100, 200, 'player');
Hay que usar la clave que se le puso en la carga. El objeto, obviamente, debe estar cargado memoria con scene.load


ANIMACIONES:
Sirve también para crear animaciones por frames

// this es un objeto scene
function preload() {
    // Recordad: solo para cargar desde el sitio de Phaser
    this.load.setBaseURL("https://examples.phaser.io/");
    this.load.spritesheet('mummy_spritesheet', 
                          'assets/sprites/metalslug_mummy37x45.png',
                          { frameWidth: 37, frameHeight: 45, endFrame: 17 });
}

function create() {
    let mummy = this.add.sprite(300, 200, 'mummy_spritesheet');

    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNumbers('mummy_spritesheet', { start: 0, end: 16 }),
      frameRate: 10,
      repeat: -1
    });

    mummy.play('walking');
}





*/