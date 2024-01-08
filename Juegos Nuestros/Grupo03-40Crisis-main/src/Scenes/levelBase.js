import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import Robot from '../Enemies/robot.js'
import EnemigoBasico from '../Enemies/enemigoBasico.js';
import lutano from '../Enemies/lutano.js';
import Mono from '../Enemies/mono.js';
import cepo from '../Enemies/cepo.js';
import UIManager from '../UI/uiManager.js';
import Bala from '../Armas/armaDisparos/balas.js'
import EnemigoSpawner from '../enemySpawner.js';
import municionBalas from '../Armas/armaDisparos/municionBalas.js';
import explosive from '../Armas/armaSpawneadora/explosive.js';
import Enemigo from "../Enemies/enemigo.js";
import BalaMagica from '../Armas/armaDisparos/balasMagicas.js';

export default class Level extends Phaser.Scene{

    constructor(levelName){
        super({key: levelName})

        // ENEMIES DATA
        this.speedEnemigos = new Map([
            ['zombie', 75], ['skeleton', 160], ['burger', 50], ['lutano', 85], ['caracol', 15], ['robot', 75], ['mono', 135]
        ]);
        this.damageEnemigos = new Map([
            ['zombie', 1], ['skeleton', 4], ['burger', 35], ['lutano', 2], ['caracol', 9999], ['robot', 10], ['mono', 0]
        ]);
        this.attackDistEnemigos = new Map([
            ['zombie', 30], ['skeleton', 30], ['burger', 30], ['lutano', 30], ['caracol', 10], ['robot', 300], ['mono', 0]
        ]);
        this.vidaEnemigos = new Map([
            ['zombie', 8], ['skeleton', 5], ['burger', 50], ['lutano', 15], ['caracol', 999999], ['robot', 20], ['mono', 15]
        ]);
        this.scaleEnemigos = new Map([
            ['zombie', 2], ['skeleton', 2], ['burger', 2], ['lutano', 2], ['caracol', 0.5], ['robot', 0.25], ['mono', 1.25]
        ]);5
        this.puntosEnemigos = new Map([
            ['zombie', 1], ['skeleton', 2], ['burger', 10], ['lutano', 5], ['caracol', 25], ['robot', 10], ['mono', 10]
        ]);
        this.anchoColliderEnemigos = new Map([
            ['zombie', 18], ['skeleton', 16], ['burger', 30], ['lutano', 24], ['caracol', 18], ['robot', 100], ['mono', 24]
        ]);
        this.altoColliderEnemigos = new Map([
            ['zombie', 26], ['skeleton', 24], ['burger', 30], ['lutano', 30], ['caracol', 26],  ['robot', 180], ['mono', 24]
        ]);
        this.posXColliderEnemigos = new Map([
            ['zombie', 9], ['skeleton', 8], ['burger', 14], ['lutano', 12], ['caracol', 9], ['robot', 50], ['mono', -12]
        ]);
        this.posYColliderEnemigos = new Map([
            ['zombie', 10], ['skeleton', 14], ['burger', 2], ['lutano', 14], ['caracol', 10], ['robot',90], ['mono', -12]
        ]);

        // en porcentajes
        this.munitionDropMaxProbability = new Map([
            ['zombie', 10], ['skeleton', 10], ['burger', 40], ['lutano', 20], ['caracol', 100], ['robot', 30], ['mono', 100]
        ]);

        
    }

    preload(){
   
    }

    loadFont(name, url) {
		let self = this;
	    let newFont = new FontFace(name, `url(${url})`);
	    newFont.load()
	    .then(function (loaded) { 
	        document.fonts.add(loaded);
	        self.continueCreate();
	    }).catch(function (error) {
	        return error;
    	});
	}


    create()
    {
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");
        
        this.textCreated = false;
        this.scaleEffect = false;
        this.letterColor = 0;

        // grupo de balas
        this.grupoBalas = this.add.group({
            classType: Bala,
            maxSize: 100
        })

        this.grupoBalasRobot = this.add.group({
            classType: Bala,
            maxSize: 100
        })

        this.grupoBalasMagicas = this.add.group({
            classType: BalaMagica,
            maxSize: 50
        })

        this.grupoMunicionBalas = this.add.group({
            classType: municionBalas,
            maxSize: 50
        })

        this.grupoEnemigos = this.add.group({
            runChildUpdate: true,

        })

        Phaser.Actions.SetDepth(this.grupoEnemigos, 1);

        this.grupoExplosivos = this.add.group({
            classType: explosive,
            runChildUpdate: true,

        })
       
    }

    // crea el config del enemigo (json) para instanciar los enemigos
    generateEnemyConfig(enemyType)
    {
        let config = {
            speed: this.speedEnemigos.get(enemyType),
            damage: this.damageEnemigos.get(enemyType),
            attackDistance: this.attackDistEnemigos.get(enemyType),
            vida: this.vidaEnemigos.get(enemyType),
            scale: this.scaleEnemigos.get(enemyType),
            puntos: this.puntosEnemigos.get(enemyType),
            anchoCollider: this.anchoColliderEnemigos.get(enemyType),
            altoCollider: this.altoColliderEnemigos.get(enemyType),
            posXCollider: this.posXColliderEnemigos.get(enemyType),
            posYCollider: this.posYColliderEnemigos.get(enemyType),
            ammoDrop: this.munitionDropMaxProbability.get(enemyType)
        }
        return config;
    }
}