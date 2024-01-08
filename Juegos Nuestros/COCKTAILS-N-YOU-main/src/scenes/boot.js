export default class Boot extends Phaser.Scene{
    
    constructor(){
        super({key: "Boot"});
    }

    preload(){
        console.log("Preload de Bootloader")

        /*----- / SPRITES / -----*/
        this.load.image("cursor", "./assets/cursor.png");
        this.load.image("background", "./assets/sprites/FondoTemporal.jpg");
        this.load.image("cartelGame", "./assets/sprites/CartelGame.png");
        this.load.image("mainMenuBackground", "./assets/sprites/bgp.png");
        this.load.image('dialogueCloude', './assets/sprites/cloud.png')
        this.load.image('candado', './assets/sprites/candado.png')
        this.load.image('pistasButton', './assets/sprites/fondoGuia.png')
        this.load.image('pistas', './assets/sprites/Cartel.png')
        this.load.image('cocteleraButton', './assets/sprites/coctelera.png')
        this.load.image('star', './assets/sprites/star.png')
        this.load.image('star_empty', './assets/sprites/emptyStar.png')
        this.load.image('cool', './assets/sprites/cool.png')
        this.load.image('nice', './assets/sprites/nice.png')
        this.load.image('excellent', './assets/sprites/excellent.png')
        this.load.image('fail', './assets/sprites/failBueno.png')
        this.load.image('FondoLevel', './assets/sprites/FondoPixel.png')
        /*----- / COCTELES /-----*/
        this.load.image('purple_sky','./assets/sprites/PurpleSky.png' )
        this.load.image('blue_lagoon','./assets/sprites/BlueLagoon.png' )
        this.load.image('margarita','./assets/sprites/Margarita.png' )
        this.load.image('mojito','./assets/sprites/Mojito.png' )
        /*----- / INTERACTIVE ITEMS /-----*/
        this.load.image('Bebidas', './assets/sprites/Objetos/Bebidas.png');
        this.load.image('BebidasIluminadas', './assets/sprites/Objetos/BebidasIluminadas.png');
        this.load.image('Alcohol', './assets/sprites/Objetos/Cocteles.png');
        this.load.image('AlcoholIluminado', './assets/sprites/Objetos/CoctelesIluminados.png');
        this.load.image('Cubitera', './assets/sprites/Objetos/Cubitera.png');
        this.load.image('CubiteraIluminada', './assets/sprites/Objetos/CubiteraIluminada.png');
        this.load.image('Especias', './assets/sprites/Objetos/Especias.png');
        this.load.image('EspeciasIluminadas', './assets/sprites/Objetos/EspeciasIluminadas.png');
        this.load.image('Frutas', './assets/sprites/Objetos/Frutas.png');
        this.load.image('FrutasIluminadas', './assets/sprites/Objetos/FrutasIluminadas.png');
        /*----- / BOTONES / -----*/
        this.load.image("playButton", "./assets/sprites/Buttons/Buttons Pixel Animation Pack/play/343px/play01.png");
        this.load.image("playButton_hover", "./assets/sprites/Buttons/Buttons Pixel Animation Pack/play/343px/play03.png");
        this.load.image("resumeButton","./assets/sprites/Buttons/Buttons Pixel Animation Pack/back/343px/back01.png");
        this.load.image("resumeButton_hover","./assets/sprites/Buttons/Buttons Pixel Animation Pack/back/343px/back03.png");
        this.load.image("resumeButton","./assets/sprites/Buttons/Buttons Pixel Animation Pack/back/343px/back01.png");
        this.load.image("resumeButton_hover","./assets/sprites/Buttons/Buttons Pixel Animation Pack/back/343px/back03.png");
        this.load.image('homeButton', './assets/sprites/Buttons/Buttons Pixel Animation Pack/home/343px/home01.png')
        this.load.image('homeButton_hover', './assets/sprites/Buttons/Buttons Pixel Animation Pack/home/343px/home03.png')
         /*----- / MENU / -----*/
        this.load.image('libro', './assets/sprites/Menu/Menu.png');
        this.load.image('Mb', './assets/sprites/Menu/MenuBreakout.png');
        this.load.image('Md', './assets/sprites/Menu/MenuDisparo.png');
        this.load.image('mf', './assets/sprites/Menu/MenuFrutas.png');
        this.load.image('Mh', './assets/sprites/Menu/MenuHielo.png');
        this.load.image('Mr', './assets/sprites/Menu/MenuRefrescos.png');
        
        /*----- / BREAKOUT / -----*/
        this.load.image('backgroundBreakout', './assets/sprites/Breakout/background.png');
        this.load.image('paddle', './assets/sprites/Breakout/paddle.png');
        this.load.image('ball', './assets/sprites/Breakout/ball.png');
        this.load.image('block', './assets/sprites/Breakout/block.png');
        this.load.image('gameOver', './assets/sprites/Breakout/gameOver.png');
        this.load.image('blockhierbabuena', './assets/sprites/Breakout/blocklima.png');
        this.load.image('blockazucar', './assets/sprites/Breakout/blockazucar.png');
        this.load.image('win','./assets/sprites/Breakout/win.png');
        
        /*----- / REFRESCOS / -----*/
        this.load.image("coke", "./assets/sprites/Refrescos/Coke.png");
        this.load.image("blue", "./assets/sprites/Refrescos/Blue.png");
        this.load.image("lemon", "./assets/sprites/Refrescos/Lemon.png");
        this.load.image("orange", "./assets/sprites/Refrescos/Orange.png");
        this.load.image("estante", "./assets/sprites/Refrescos/Estante.png");
        this.load.image("contador", "./assets/sprites/Refrescos/contador.png");

   
        /*----- / TIGERBALL / -----*/
        this.load.image("icecube", "./assets/sprites/TigerBall/Icecube.png");
        this.load.image("cubitera", "./assets/sprites/TigerBall/Cubito.png");
        this.load.image("backgroundIce", "./assets/sprites/TigerBall/Fondo2.jpg");
        this.load.image("cubiteraTransparente", "./assets/sprites/TigerBall/CubitoTransparente.png");
        this.load.image("spaceParaReiniciar", "./assets/sprites/TigerBall/Cartel.png");

        /*----- /AIM/ -----*/
        this.load.image('aimbackground', './assets/sprites/aim/background.png');
        this.load.image('tequila', './assets/sprites/aim/tequila.png');
        this.load.image('white_ron', './assets/sprites/aim/ron.png');
        this.load.image('vodka', './assets/sprites/aim/vodka.png');
        this.load.image('gin', './assets/sprites/aim/gin.png');

        /*----- /FRUTAS/ -----*/
        this.load.image('frutasBackground', './assets/sprites/Frutas/frutasBackground.png');
        this.load.image('frutasSuelo', './assets/sprites/Frutas/Suelo.png');
        this.load.image('blackberry_fruit', './assets/sprites/Frutas/mora.png');
        this.load.image('lime_fruit', './assets/sprites/Frutas/lima.png');
        this.load.image('lemon_fruit', './assets/sprites/Frutas/limon.png');
        this.load.image('cesta', './assets/sprites/Frutas/cesta.png');
        this.load.image('tree1', './assets/sprites/Frutas/tree03.png');
        this.load.image('tree2', './assets/sprites/Frutas/tree05.png');
        this.load.image('tree3', './assets/sprites/Frutas/tree06.png');

        /*----- / MAPA / -----*/
        this.load.image("floor", "./assets/sprites/floorTiles.png");
        this.load.image("barObjects", "./assets/sprites/tilesetBar.png");
        this.load.tilemapTiledJSON("barTiled", "./assets/barTiled.json");
        
        this.load.image("tree_item", "./assets/sprites/Objetos/Frutas.png")
        this.load.image("tree_item_interact", "./assets/sprites/Objetos/FrutasIluminadas.png")
        this.load.image("platforms_item", "./assets/sprites/Objetos/Bebidas.png")
        this.load.image("platforms_item_interact", "./assets/sprites/Objetos/BebidasIluminadas.png")
        this.load.image("shoot_item", "./assets/sprites/Objetos/Cocteles.png")
        this.load.image("shoot_item_interact", "./assets/sprites/Objetos/CoctelesIluminados.png")
        this.load.image("ices_item", "./assets/sprites/Objetos/Cubitera.png")
        this.load.image("ices_item_interact", "./assets/sprites/Objetos/CubiteraIluminada.png")
        this.load.image("breakout_item", "./assets/sprites/Objetos/Especias.png")
        this.load.image("breakout_item_interact", "./assets/sprites/Objetos/EspeciasIluminadas.png")
        /*----- / ELADIO/ -----*/
        this.load.image("radio", "./assets/radio.png")
        /*----- / AUDIO / -----*/
        this.load.audio('breakoutMusic', ['./assets/OST/BreakoutTheme.mp3']);
        this.load.audio('aimMusic', ['./assets/OST/ValorantTheme.mp3']);
        this.load.audio('iceMusic', ['./assets/OST/iceTheme.mp3']);
        this.load.audio('jumpMusic', ['./assets/OST/JumpTheme.mp3']);
        this.load.audio('fruitsMusic', ['./assets/OST/FrutasTheme.mp3']);
        this.load.audio('CanonInD', ['./assets/OST/Canon in D.mp3']);
        this.load.audio('eladiomusic', ['./assets/OST/EasterEggTheme.wav']);

        this.load.audio('boing', ['./assets/FX/boing.mp3']);
        this.load.audio('destroy', ['./assets/FX/destroy.mp3']);
        this.load.audio('reboundWall', ['./assets/FX/reboundWall.mp3']);
        this.load.audio('break', ['./assets/FX/break.mp3']);
        this.load.audio('shoot', ['./assets/FX/shoot.mp3']);
        this.load.audio('drink', ['./assets/FX/drink.mp3']);
        this.load.audio('frutas', ['./assets/FX/frutas.mp3']);
        this.load.audio('pop', ['./assets/FX/pop.mp3']);
        this.load.audio('pipipibu', ['./assets/FX/pipipibu.mp3']);
        
        /*----- / TILEMAP / -----*/
        this.load.image('floor', 'floorTiles.png');
        this.load.image('barObjects', 'tilesetBar.png');
        this.load.tilemapTiledJSON('barTiled', 'barTiled.json');

        /*----- / PLAYER / -----*/
        //Player - idle 
        this.load.spritesheet('player_idleSprite', "./assets/sprites/Player/player_idle.png",
        {frameWidth: 48, frameHeight: 48})   
        //Player - walk
        this.load.spritesheet('player_walkSprite', "./assets/sprites/Player/player_walk.png",
        {frameWidth: 48, frameHeight: 48})   
        //Player - jump
        this.load.spritesheet('player_jumpSprite', "./assets/sprites/Player/sprites-jump_up.png",
        {frameWidth: 48, frameHeight: 48})

        /*----- / CUSTOMERS / -----*/
        this.load.spritesheet('customers', "./assets/sprites/customers.png",
        {frameWidth: 48, frameHeight: 60})

        /*----- / LEVELS / -----*/
        this.load.image('levelsBackground',"./assets/sprites/cocteles2.jpg")
        this.load.image('levelsButton',"./assets/sprites/cocteles1.png")
       
    }
    create(){

        /*----- / ANIMACIONES / -----*/
        //Player
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNames('player_idleSprite', { start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk',
            frames: this.anims.generateFrameNames('player_walkSprite', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'player_jump',
            frames: this.anims.generateFrameNames('player_jumpSprite', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        
        //Customer
        /*-- 0 --*/
        this.anims.create({
            key: 'customer_walkBackWards_0',
            frames: this.anims.generateFrameNames('customers', { start: 27, end: 29}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'customer_idle_0',
            frames: this.anims.generateFrameNames('customers', { start: 28, end: 28}),
            frameRate: 10,
            repeat: 1
        });
         /*-- 1 --*/
        this.anims.create({
            key: 'customer_walkBackWards_1',
            frames: this.anims.generateFrameNames('customers', { start: 30, end: 32}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'customer_idle_1',
            frames: this.anims.generateFrameNames('customers', { start: 31, end: 31}),
            frameRate: 10,
            repeat: 1
        });
         /*-- 2 --*/
        this.anims.create({
            key: 'customer_walkBackWards_2',
            frames: this.anims.generateFrameNames('customers', { start: 33, end: 35}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'customer_idle_2',
            frames: this.anims.generateFrameNames('customers', { start: 34, end: 34}),
            frameRate: 10,
            repeat: 1
        });

        this.scene.start("MainMenu");
    }
}

