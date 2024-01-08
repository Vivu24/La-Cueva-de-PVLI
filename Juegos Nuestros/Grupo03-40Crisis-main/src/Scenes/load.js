

export default class load extends Phaser.Scene{

    constructor(){
        super({key: 'load'})
        
    }

    preload(){
        //Cargado de spritessheets de entidades del juego
        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('zombieattack', './Assets/Sprites/Enemigos/Zombie/Zombie-attack-SpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('skeleton', './Assets/Sprites//Enemigos/Esqueleto/esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('burger', './Assets/Sprites/Enemigos/Hamburguesa/hamburguesa-spriteSheet.png', {frameWidth: 64, frameHeight:64})
        this.load.spritesheet('robot', './Assets/Sprites/Enemigos/Robot/Robot-walk-SpriteSheet.png',{frameWidth: 256, frameHeight: 256})
        this.load.spritesheet('lutano', './Assets/Sprites/Enemigos/Lutano/Lutano-Walk-SpriteSheet.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('lutanoAttack', './Assets/Sprites/Enemigos/Lutano/Lutano-attack-SpriteSheet.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('cepo', './Assets/Sprites/Enemigos/Lutano/Bear_Trap.png',{frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('caracol', './Assets/Sprites/Enemigos/Caracol/Caracol-Walk-SpriteSheet.png',{frameWidth: 48, frameHeight: 32});
        this.load.spritesheet('caracolattack', './Assets/Sprites/Enemigos/Caracol/Caracol-Attack-SpriteSheet.png',{frameWidth: 512, frameHeight: 768});
        this.load.spritesheet('mono', './Assets/Sprites/Enemigos/Mono/Monkey-walk-SpriteSheet.png',{frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('deathEnemy', './Assets/Sprites/Enemigos/Enemies-death-SpriteSheet.png',{frameWidth: 32, frameHeight: 32});
        
        //Cargado de imagenes de objetos del juego

        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 64, frameHeight: 64});

        //Cargado de armas y balas

        //Centinela
        this.load.image('pistola', './Assets/Sprites/Armas/pistola.png');
        this.load.image('metralleta', './Assets/Sprites/Armas/machinegun.png');
        this.load.image('franco', './Assets/Sprites/Armas/franco.png');
        this.load.image('bala', './Assets/Sprites/Armas/bala.png');
        this.load.image('balaRobot', './Assets/Sprites/Armas/balaRobot.png');
        this.load.image('bulletAmmo', './Assets/Sprites/Armas/munitionBox_Sprite.png');
        //Explorador
        this.load.image('fist', './Assets/Sprites/Armas/fist.png');
        this.load.image('bate', './Assets/Sprites/Armas/bat.png');
        this.load.image('espada', './Assets/Sprites/Armas/sword.png');
        //Analista
        this.load.image('muro', './Assets/Sprites/Armas/muro.png');
        this.load.image('mina', './Assets/Sprites/Armas/mine.png');
        this.load.image('c4', './Assets/Sprites/Armas/c4.png');
        this.load.spritesheet('explosion', './Assets/Sprites/Armas/explosion.png', {frameWidth: 32, frameHeight: 32});
        //Pacifista
        this.load.image('paralizador', './Assets/Sprites/Armas/paralizador.png');
        this.load.image('empuje', './Assets/Sprites/Armas/empuje.png');
        this.load.image('varita', './Assets/Sprites/Armas/varita.png');
        this.load.image('balaMagica', './Assets/Sprites/Armas/balaMagica.png')

        //Cargado de imagenes de UI de juego
        this.load.spritesheet('heart', './Assets/Sprites/UI/PlayGame/UI_Heart_SpriteSheet.png',{frameWidth: 64, frameHeight: 64});
        this.load.image('inventory', './Assets/Sprites/UI/PlayGame/inventory.png');
        this.load.image('inventoryYellow', './Assets/Sprites/UI/PlayGame/inventoryYellow.png');
        this.load.image('inventoryBlue', './Assets/Sprites/UI/PlayGame/inventoryBlue.png');
        this.load.image('inventoryPurple', './Assets/Sprites/UI/PlayGame/inventoryPurple.png');
        this.load.image('inventoryGreen', './Assets/Sprites/UI/PlayGame/inventoryGreen.png');
        this.load.image('slot', './Assets/Sprites/UI/PlayGame/slotSel.png');

        //Cargado del Selector de niveles
        this.load.image('CiudadLevel', './Assets/Sprites/UI/Selector/MapaCiudadSelection.png');
        this.load.image('FondoCiudad', './Assets/Sprites/UI/Selector/MapaCiudadSelectionFondo.png');
        this.load.image('PlayaLevel', './Assets/Sprites/UI/Selector/TilePlayaSelection.png');
        this.load.image('FondoPlaya', './Assets/Sprites/UI/Selector/TilePlayaSelectionFondo.png');
        this.load.image('VolcanLevel', './Assets/Sprites/UI/Selector/MapaVolcanSelection.png');
        this.load.image('FondoVolcan', './Assets/Sprites/UI/Selector/MapaVolcanSelectionFondo.png');
        this.load.image('flecha', './Assets/Sprites/UI/Selector/flecha1.png');
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('nohat', './Assets/Sprites/Jugador/Sombreros/sombreros_bloqueados.png', {frameWidth: 256, frameHeight: 256});

        //Cargado Bestiario
        

        //Eventos
        this.load.image('bocaIncendios', './Assets/Sprites/Eventos/bocaIncendios.png')
        this.load.image('coche', './Assets/Sprites/Eventos/coche.png')
        this.load.image('wave','./Assets/Sprites/Eventos/wave.png')
        this.load.image('humo','./Assets/Sprites/Eventos/humo.png')
        this.load.image('lavaRock', './Assets/Sprites/Eventos/lavaRock.png')
        this.load.image('lava', './Assets/Sprites/Eventos/lava.png');

        //Cargado de musica de fondo
        this.load.audio('selectorMusic', ['./Assets/Audio/Music/SelectorNiveles.wav']);
        this.load.audio('ciudadMusic', ['./Assets/Audio/Music/CiudadLevel.wav']);
        this.load.audio('playaMusic', ['./Assets/Audio/Music/PlayaLevel.wav']);
        this.load.audio('volcanMusic', ['./Assets/Audio/Music/VolcanLevel.wav']);
        this.load.audio('gameOverMusic', ['./Assets/Audio/Music/GameOver.wav']);

        //Efectos de sonido

        //Jugador
        this.load.audio('walkEffect', ['./Assets/Audio/Effects/Player/caminar.wav']);
        this.load.audio('botiquinEffect', ['./Assets/Audio/Effects/Player/botiquin.wav']);
        this.load.audio('serGolpeadoEffect', ['./Assets/Audio/Effects/Player/serGolpeado.wav']);
        this.load.audio('speedUpEffect', ['./Assets/Audio/Effects/Player/speed.wav']);
        this.load.audio('dormirEffect', ['./Assets/Audio/Effects/Player/vivu.wav']);

        //Armas
        this.load.audio('disparoEffect', ['./Assets/Audio/Effects/Armas/disparo.wav']);
        this.load.audio('explosionEffect', ['./Assets/Audio/Effects/Armas/explosion.wav']);
        this.load.audio('meleeEffect', ['./Assets/Audio/Effects/Armas/melee.wav']);

        //Enemy
        this.load.audio('arañarEffect', ['./Assets/Audio/Effects/Enemy/arañar.wav']);
        this.load.audio('morderEffect', ['./Assets/Audio/Effects/Enemy/morder.wav']);
        this.load.audio('morirEffect', ['./Assets/Audio/Effects/Enemy/morir.wav']);

        //UI
        this.load.audio('confirmarEffect', ['./Assets/Audio/Effects/UI/confirmar.wav']);
        this.load.audio('moverOpcionesEffect', ['./Assets/Audio/Effects/UI/moverOpcion.wav']);
        this.load.audio('pausaEffect', ['./Assets/Audio/Effects/UI/pausa.wav']);
        this.load.audio('despausaEffect', ['./Assets/Audio/Effects/UI/despausa.wav']);

        
        
    }

    loadAnimations()
    {
        this.anims.create({
            key: 'walkzombie',
            frames: this.anims.generateFrameNumbers('zombie', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackzombie',
            frames: this.anims.generateFrameNumbers('zombieattack', {start: 0, end: 3}),
            frameRate: 8
        });
        this.anims.create({
            key: 'walkskeleton',
            frames: this.anims.generateFrameNumbers('skeleton', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackskeleton',
            frames: this.anims.generateFrameNumbers('skeleton', {start: 4, end: 10}),
            frameRate: 8
        });
        this.anims.create({
            key: 'walkburger',
            frames: this.anims.generateFrameNumbers('burger', {start: 8, end:10}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'attackburger',
            frames: this.anims.generateFrameNumbers('burger', {start: 0, end:7}),
            frameRate: 10
        });
        this.anims.create({
            key: 'walkrobot',
            frames: this.anims.generateFrameNumbers('robot', {start: 0, end:3}),
            frameRate: 5
        });
        this.anims.create({
            key: 'attackrobot',
            frame: this.anims.generateFrameNumbers('robot', {start: 0, end:0})
        })
        this.anims.create({
            key: 'walklutano',
            frames: this.anims.generateFrameNumbers('lutano', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attacklutano',
            frames: this.anims.generateFrameNumbers('lutanoAttack', {start: 0, end:1}),
            frameRate: 10
        })
        this.anims.create({
            key: 'attackcepo',
            frames: this.anims.generateFrameNumbers('cepo', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'walkcaracol',
            frames: this.anims.generateFrameNumbers('caracol', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attackcaracol',
            frames: this.anims.generateFrameNumbers('caracolattack', {start: 0, end:10}),
            frameRate: 10
        })
        this.anims.create({
            key: 'walkmono',
            frames: this.anims.generateFrameNumbers('mono', {start: 0, end: 1}),
            frameRate: 7,
            repeat: -1
        })
        this.anims.create({
            key: 'enemydeath',
            frames: this.anims.generateFrameNumbers('deathEnemy', {start: 0, end: 6}),
            frameRate: 10
        })
        this.anims.create({
            key: 'explosionAnimation',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:7}),
            frameRate: 5,
            repeat: 0
        })
    }

    create()
    {
        this.loadAnimations();
        this.scene.start("PantallaInicial");

    }

}