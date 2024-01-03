export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){
        // Mapa
        this.load.tilemapTiledJSON('tilemap', './assets/map/mapita.json');
        this.load.image('tileset', './assets/sprites/tileset.png');    

        // Cargamos Spritesheets
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', {frameWidth: 24, frameHeight: 17});

        // Cargamos Imagenes
        this.load.image('fuel', './assets/sprites/fuel.png');

        // Cargamos Audio
        this.load.audio('drop', './assets/sounds/drop.wav');
    }

    loadAnimations(){
        // Creamos Animaciones
        this.anims.create({
            key: 'explosionAnimation',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:2}),
            frameRate: 5,
            repeat: -1
        });
    }

    create()
    {
        console.log("Boot");
        this.loadAnimations();
        this.scene.start("Title");

    }

    update(){
        
    }
}
