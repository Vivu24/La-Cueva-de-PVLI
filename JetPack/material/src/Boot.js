export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){
        // Cargamos Spritesheets
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', {frameWidth: 24, frameHeight: 17});
        this.load.spritesheet('jetpac', './assets/sprites/jetpac.png', {frameWidth: 17, frameHeight: 24});
        this.load.spritesheet('meteor', './assets/sprites/meteor.png', {frameWidth: 16, frameHeight: 14});

        // Cargamos Imagenes
        this.load.image('fuel', './assets/sprites/fuel.png');
        this.load.image('spaceship', './assets/sprites/spaceship.png');
        this.load.image('tileset', './assets/sprites/tileset.png');

        // Cargamos Audio
        this.load.audio('drop', './assets/sounds/drop.wav');
        this.load.audio('explosion', './assets/sounds/explosion.wav');
        this.load.audio('lose', './assets/sounds/lose.wav');
        this.load.audio('pick', './assets/sounds/pick.wav');
        this.load.audio('win', './assets/sounds/win.wav');
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
