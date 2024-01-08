
import button from "../UI/button.js";

export default class bestiary extends Phaser.Scene{

    constructor(){

        super({key: 'bestiary'});

    }

    init(data){
    }

    preload(){
        this.load.image('BestiaryFondo', './Assets/Sprites/UI/Bestiary/paper.png');

        //info enemigos
        this.load.image('skeletonInfo', './Assets/Sprites/UI/Bestiary/esqueletoInfo.png');
        this.load.image('zombieInfo', './Assets/Sprites/UI/Bestiary/zombieInfo.png');
        this.load.image('hamburguesaInfo', './Assets/Sprites/UI/Bestiary/hamburguesaInfo.png');
        this.load.image('monoInfo', './Assets/Sprites/UI/Bestiary/monoInfo.png');
        this.load.image('robotInfo', './Assets/Sprites/UI/Bestiary/robotInfo.png');
        this.load.image('caracolInfo', './Assets/Sprites/UI/Bestiary/caracolInfo.png');
        this.load.image('lutanoInfo', './Assets/Sprites/UI/Bestiary/lutanoInfo.png');

        //info armas
        this.load.image('pistolaInfo', './Assets/Sprites/UI/Bestiary/pistolaInfo.png');
        this.load.image('metralletaInfo', './Assets/Sprites/UI/Bestiary/metralletaInfo.png');
        this.load.image('francoInfo', './Assets/Sprites/UI/Bestiary/francoInfo.png');

        this.load.image('puñoInfo', './Assets/Sprites/UI/Bestiary/puñoInfo.png');
        this.load.image('bateInfo', './Assets/Sprites/UI/Bestiary/bateInfo.png');
        this.load.image('espadaInfo', './Assets/Sprites/UI/Bestiary/espadaInfo.png');

        this.load.image('muroInfo', './Assets/Sprites/UI/Bestiary/muroInfo.png');
        this.load.image('minaInfo', './Assets/Sprites/UI/Bestiary/minaInfo.png');
        this.load.image('c4Info', './Assets/Sprites/UI/Bestiary/c4Info.png');

        this.load.image('paralizadorInfo', './Assets/Sprites/UI/Bestiary/paralizadorInfo.png');
        this.load.image('empujeInfo', './Assets/Sprites/UI/Bestiary/empujeInfo.png');
        this.load.image('varitaInfo', './Assets/Sprites/UI/Bestiary/varitaInfo.png');

        //info potenciadores
        this.load.image('botiquinInfo', './Assets/Sprites/UI/Bestiary/botiquinInfo.png');
        this.load.image('speedInfo', './Assets/Sprites/UI/Bestiary/speedInfo.png');
        this.load.image('invencibilidadInfo', './Assets/Sprites/UI/Bestiary/invencibilidadInfo.png');
        this.load.image('vivuInfo', './Assets/Sprites/UI/Bestiary/vivuInfo.png');

        this.load.image('flechaPasar', './Assets/Sprites/UI/Bestiary/flechaPasar.png');
        this.load.image('salir', './Assets/Sprites/UI/Bestiary/salir.png');
    }


    create(){
        // Entradas
        this.maxEntries = 23;

        this.indice = 0; // Indice

        this.add.image(0, 0, 'BestiaryFondo').setScale(1, 1).setOrigin(0, 0);

        this.info = ['skeletonInfo', 'zombieInfo', 'hamburguesaInfo', 'lutanoInfo', 'caracolInfo', 'monoInfo', 'robotInfo',
                        'pistolaInfo', 'metralletaInfo', 'francoInfo', 'puñoInfo', 'bateInfo', 'espadaInfo', 'muroInfo', 
                        'minaInfo', 'c4Info', 'paralizadorInfo', 'empujeInfo', 'varitaInfo', 'botiquinInfo', 'speedInfo',
                        'invencibilidadInfo', 'vivuInfo'];


        this.infoImage = this.add.image(0, 0, this.info[this.indice]).setScale(1, 1).setOrigin(-0.33, 0); 

        this.effectMoveOptions = this.sound.add('moverOpcionesEffect', {loop: false});

        this.der = new button(this, 1100, 400, 'flechaPasar', 0, 64, 128, 80);
        this.der.on('pointerdown', (event) => { this.effectMoveOptions.play(); this.changeIndice(true); })

        this.izq = new button(this, 100, 400, 'flechaPasar', 0, 64, 128, 80);
        this.izq.setFlip(true, false);
        this.izq.on('pointerdown', (event) => { this.effectMoveOptions.play(); this.changeIndice(false); })

        this.out = new button(this, 50, 150, 'salir', 0, 82, 128, 48);
        this.out.on('pointerdown', (event) => { this.scene.start('SelectorNivel', {datos: 0, level: 0}); })

    }

    // Cambio de pagina
    changeIndice(der){


        if(der){
            this.indice = (this.indice + 1) % this.maxEntries;
        }
        else{
            this.indice = (this.indice - 1) % this.maxEntries;

            if(this.indice < 0){
                this.indice = this.maxEntries - 1;
            }
        }


        this.infoImage.setTexture(this.info[this.indice]);
    }





}