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
        this.load.image('background_hcontrast', './assets/images/background_hcontrast.png');
        this.load.image('bullet', './assets/images/bullet.png');
        this.load.image('green', './assets/images/green.png');

        // Cargamos Audio
        this.load.audio('deadSound', './assets/sounds/dead.wav');
    }

    loadAnimations(){
        // Creamos Animaciones
        this.anims.create({
            key: 'twinbeeMoveLeft',
            frames: this.anims.generateFrameNumbers('twinbee', {start:1, end:1}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'twinbeeMoveRight',
            frames: this.anims.generateFrameNumbers('twinbee', {start:2, end:2}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'twinbeeMove',
            frames: this.anims.generateFrameNumbers('twinbee', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'winbeeMoveLeft',
            frames: this.anims.generateFrameNumbers('winbee', {start:1, end:1}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'winbeeMoveRight',
            frames: this.anims.generateFrameNumbers('winbee', {start:2, end:2}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'winbeeMove',
            frames: this.anims.generateFrameNumbers('winbee', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'naboRotando',
            frames: this.anims.generateFrameNumbers('enemy', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'explosionNabo',
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