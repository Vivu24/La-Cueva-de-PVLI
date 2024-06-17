export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){
        // Mapa
        this.load.tilemapTiledJSON('tilemap', './assets/map/tilemap.json');
        this.load.image('tileset', './assets/sprites/tileset.png');    

        // Cargamos Spritesheets
        this.load.spritesheet('jetpac', './assets/sprites/jetpac.png', {frameWidth: 17, frameHeight: 24});
        this.load.spritesheet('explosion', './assets/sprites/explosion.png', {frameWidth: 24, frameHeight: 17});
        this.load.spritesheet('meteor', './assets/sprites/meteor.png', {frameWidth: 16, frameHeight: 14});

        // Cargamos Imagenes
        this.load.image('spaceship', './assets/sprites/spaceship.png');
        this.load.image('fuel', './assets/sprites/fuel.png');

        // Cargamos Audio
        //this.load.audio('deadSound', './assets/sounds/dead.wav');
    }

    loadAnimations(){
        // Creamos Animaciones
        this.anims.create({
            key: 'jetpacFly',
            frames: this.anims.generateFrameNumbers('jetpac', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'jetpacIdle',
            frames: this.anims.generateFrameNumbers('jetpac', {start:4, end:4}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walkingPlayer',
            frames: this.anims.generateFrameNumbers('jetpac', {start:4, end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'meteorIdle',
            frames: this.anims.generateFrameNumbers('meteor', {start:0, end:1}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'meteorBoom',
            frames: this.anims.generateFrameNumbers('meteor', {start:2, end:3}),
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