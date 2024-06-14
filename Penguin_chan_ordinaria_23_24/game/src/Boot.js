export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){ 

        // Cargamos Spritesheets
        this.load.spritesheet('penguin', './assets/penguin40.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('rat', './assets/rat32.png', {frameWidth: 32, frameHeight: 32});

        // Cargamos Imagenes
        this.load.image('background', './assets/background.png');
        this.load.image('ball', './assets/ball16.png');
        this.load.image('score', './assets/score.png');
        this.load.image('table', './assets/table.png');

        // Cargamos Audio
        //this.load.audio('drop', './assets/sounds/drop.wav');
    }

    loadAnimations(){
        // Creamos Animaciones

        // Pingüino quieto (sin bola)
        this.anims.create({
            key: 'penguinIdle',
            frames: this.anims.generateFrameNumbers('penguin', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });

        // Pingüino quieto (sin bola)
        this.anims.create({
            key: 'penguinIdleBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        });

        // Pingüino en movimiento (sin bola)
        this.anims.create({
            key: 'penguinMove',
            frames: this.anims.generateFrameNumbers('penguin', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        });

        // Pingüino en movimiento (con bola)
        this.anims.create({
            key: 'penguinMoveBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:6, end:7}),
            frameRate: 5,
            repeat: -1
        });

        // Pingüino estuneado
        this.anims.create({
            key: 'penguinStun',
            frames: this.anims.generateFrameNumbers('penguin', {start:9, end:10}),
            frameRate: 5,
            repeat: -1
        });

        // Pingüino que ha ganado
        this.anims.create({
            key: 'penguinWin',
            frames: this.anims.generateFrameNumbers('penguin', {start:11, end:12}),
            frameRate: 5,
            repeat: -1
        });

        // Pingüino que ha perdido
        this.anims.create({
            key: 'penguinLoose',
            frames: this.anims.generateFrameNumbers('penguin', {start:8, end:8}),
            frameRate: 5,
            repeat: -1
        });


        // Rata quieta (sin bola)
        this.anims.create({
            key: 'ratIdle',
            frames: this.anims.generateFrameNumbers('rat', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        });

        // Rata quieta (con bola)
        this.anims.create({
            key: 'ratIdleBall',
            frames: this.anims.generateFrameNumbers('rat', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });

        // Rata en movimiento (sin bola)
        this.anims.create({
            key: 'ratMove',
            frames: this.anims.generateFrameNumbers('rat', {start:3, end:4}),
            frameRate: 5,
            repeat: -1
        });

        // Rata en movimiento (con bola)
        this.anims.create({
            key: 'ratMoveBall',
            frames: this.anims.generateFrameNumbers('rat', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        });

        // Rata estuneada
        this.anims.create({
            key: 'ratStun',
            frames: this.anims.generateFrameNumbers('rat', {start:8, end:10}),
            frameRate: 5,
            repeat: -1
        });

        // Rata que ha ganado
        this.anims.create({
            key: 'ratWin',
            frames: this.anims.generateFrameNumbers('rat', {start:6, end:6}),
            frameRate: 5,
            repeat: -1
        });

        // Rata que ha perdido
        this.anims.create({
            key: 'ratLoose',
            frames: this.anims.generateFrameNumbers('rat', {start:11, end:12}),
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
