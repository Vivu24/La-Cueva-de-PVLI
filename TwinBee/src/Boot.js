export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){
        // Cargamos Spritesheets
        this.load.spritesheet('enemy', './assets/images/enemy.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('explosion', './assets/images/explosion.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('twinbee', './assets/images/twinbee.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('winbee', './assets/images/winbee.png', {frameWidth: 16, frameHeight: 16});

        // Cargamos Imagenes
        this.load.image('background', './assets/images/background.png');
        this.load.image('stars', './assets/images/background_hcontrast.png');
        this.load.image('platform', './assets/images/bullet.png');
        this.load.image('platform', './assets/images/green.png');

        // Cargamos Audio
        this.load.audio('deadSound', './assets/sounds/dead.wav');
    }

    loadAnimations(){
        // Creamos Animaciones
        this.anims.create({
            key: 'walkClown',
            frames: this.anims.generateFrameNumbers('clown', {start:0, end:1}),
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