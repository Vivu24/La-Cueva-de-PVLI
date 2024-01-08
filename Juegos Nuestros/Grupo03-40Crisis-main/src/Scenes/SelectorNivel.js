import playerContenedor from '../Player/playerContenedor.js';
import CiudadLevel from './CiudadLevel.js';
import PlayaLevel from './PlayaLevel.js';
import button from '../UI/button.js';

export default class SelectorNivel extends Phaser.Scene {

    constructor(){
        super({key: 'SelectorNivel'});

        this.currentPage = 0;
        this.hatID = 0;
        this.experienciaMaxima = 7000;
        this.hatUnlocked = [];
        for(var i = 0; i < 21; ++i){
            this.hatUnlocked[i] = false;
        }
        this.getExperience();
        this.getUnlocked();
    }

    init(data){
        let number = 3;
        console.log(number + data.datos);

        number = Number(data.datos);
        console.log(data.datos);
        if (data.datos !== null && data.datos != 0) this.globalPoints[data.level] += Number(number); // Lee los puntos y el nivel del q vienes del gameover
        console.log(this.globalPoints[0]);
    }

    preload(){
        this.load.image('bestiaryButton', './Assets/Sprites/UI/Bestiary/button.png');
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

    create(){
        // Comprobar recompensas
        this.recompensas();

        this.effectConfirm = this.sound.add('confirmarEffect', {loop: false});
        this.effectMoveOptions = this.sound.add('moverOpcionesEffect', {loop: false});

        this.events.on('resume', (xp) => {
        });

        // Carga de los niveles
        this.setMaps();

        // Musica
        this.backgroundMusic = this.sound.add('selectorMusic', {loop: true, volume: 0.2});

        this.backgroundMusic.play();

        // Pagina inicial
        this.fondo = this.add.image(0, 0, this.fondos[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.mapaActual = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);

        // Imagen de sombrero
        if(this.hatUnlocked[this.hatID]){
            this.hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        }
        else{
            // Si no esta desbloqueado sale negro
            this.hat = this.add.image(this.cameras.main.centerX, 75, 'nohat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        }

        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF"); // Boton de inicio

        this.loadHatArrows(); // Flechas
        this.loadMainArrows();

        this.best = new button(this, 1100, 150, 'bestiaryButton',  0, 82, 128, 48); // Bestiario
        this.best.on('pointerdown', (event) => { 
            this.backgroundMusic.destroy(); 
            this.setExperience();
            this.scene.start('bestiary'); 
        })

        this.barraXP(); // Pase de batalla

        // Tweens del fondo
        this.tweens.add({
            targets: this.fondo,
            x: 200,
            duration: 3500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
        this.tweens.add({
            targets: this.fondo,
            x: -200,
            duration: 3500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
    }

    // Boton de inicio
    continueCreate(){
        let button = this.add.text(this.cameras.main.centerX, 650, 'SELECT', 
            { fontFamily: 'TitleFont', fontSize: 50, color: 'white' }).setOrigin(0.5,0.5);
        button.setInteractive();
        button.on("pointerdown", () => {
            this.backgroundMusic.destroy();
            this.effectConfirm.play();
            this.loadScene(); // Se carga el nivel en caso de click
        });
        
        
    }

    // Cambio de pagina
    changePage(dir){
        this.effectMoveOptions.play();

        // Comprobacion para ciclar en ambos sentidos
        if((this.currentPage + dir) < 0) this.currentPage = 3;
        this.currentPage = (this.currentPage + dir) % 3; // Cuenta para poder ciclar el array

        // Pagina nueva
        this.fondo.setTexture(this.fondos[this.currentPage]);
        this.mapaActual.setTexture(this.mapas[this.currentPage]);

        this.actualizarBarraDeProgreso();
    }

    setMaps(){
        // El nivel
        this.mapas = [];
        // El fondo en dicha pagina
        this.fondos = [];

        this.mapas[0] = 'CiudadLevel';
        this.fondos[0] = 'FondoCiudad'

        this.mapas[1] = 'PlayaLevel';
        this.fondos[1] = 'FondoPlaya';

        this.mapas[2] = 'VolcanLevel';
        this.fondos[2] = 'FondoVolcan';
    }

    getExperience(){
        // XP en cada nivel
        this.globalPoints = [0, 0, 0];
        this.globalPoints[0] = 0; // Ciudad
        this.globalPoints[1] = 0; // Playa
        this.globalPoints[2] = 0; // Volcan

		if(window.localStorage.getItem('ciudadpoints') != null) this.globalPoints[0] = Number(window.localStorage.getItem('ciudadpoints'));
        if(window.localStorage.getItem('playapoints') != null) this.globalPoints[1] = Number(window.localStorage.getItem('playapoints'));
        if(window.localStorage.getItem('volcanpoints') != null) this.globalPoints[2] = Number(window.localStorage.getItem('volcanpoints'));

        console.log(window.localStorage.getItem('ciudadpoints'), window.localStorage.getItem('playapoints'), window.localStorage.getItem('volcanpoints'));
    }

    getUnlocked(){
        // Para cada sombrero
        for(var i = 0 ; i < 21 ; ++i){
            this.hatUnlocked[i] = window.localStorage.getItem('sombrero' + i); // Se carga de memoria local
            if (this.hatUnlocked[i] == "true") this.hatUnlocked[i] = true;
            else if(this.hatUnlocked[i] == "false" || this.hatUnlocked[i] == null) this.hatUnlocked[i] = false;

        }
    }

    setUnlocked(){
        for(var i = 0 ; i < 21 ; ++i){
            window.localStorage.setItem('sombrero' + i, this.hatUnlocked[i]);
        }
    }

    // Cambio de sombrero
    changeHat(dir){
        this.effectMoveOptions.play();

        // Comprobacion para ciclar en ambos sentidos
        if((this.hatID + dir) < 0) this.hatID = 21;
        this.hatID = (this.hatID + dir) % 21;

        // Nuevo sombrero
        if(this.hatUnlocked[this.hatID]){
            this.hat.setTexture('hat', this.hatID)
        }
        else {
            this.hat.setTexture('nohat', this.hatID) 
        }
    }

    setExperience(){

        window.localStorage.setItem('ciudadpoints', this.globalPoints[0]); // Guardado de puntos
        window.localStorage.setItem('playapoints', this.globalPoints[1]);
        window.localStorage.setItem('volcanpoints', this.globalPoints[2]);  
    }

    // Carga de nueva escena
    loadScene(){
        this.setExperience();

        this.setUnlocked(); // Guardado de sombreros

        // Start de la nueva escena (nivel)
        if(this.hatUnlocked[this.hatID]){
            this.scene.start(this.mapas[this.currentPage], this.hatID);
        }
        else{       
            this.scene.start(this.mapas[this.currentPage], -1);
        }
    }

    // Flechas para selccionar nivel
    loadMainArrows(){
        let der = new button(this, 1000, 400, 'flecha', 0, 58, 128, 80);
        der.on('pointerdown', (event) => { this.changePage(1); })

        let izq = new button(this, 200, 400, 'flecha', 0, 58, 128, 80);
        izq.setFlip(true, false);
        izq.on('pointerdown', (event) => { this.changePage(-1); })
    }

    // Flechas para seleccionar sombrero
    loadHatArrows(){
        let der = new button(this, 725, 150, 'flecha', 0, 90, 128, 80);
        der.on('pointerdown', (event) => { this.changeHat(1); })

        let izq = new button(this, 475, 150, 'flecha', 0, 90, 128, 80);
        izq.setFlip(true, false);
        izq.on('pointerdown', (event) => { this.changeHat(-1); })
    }

    barraXP(){
        // Carga de la barra
        this.barraProgreso = this.add.graphics();
        this.longitudBarra = [];

        // Actualización
        this.actualizarBarraDeProgreso();
    }
    
    actualizarBarraDeProgreso() {
        // Limpiar la barra de progreso
        this.barraProgreso.clear();

        // Calcular la longitud de la barra de progreso en función de la experiencia actual y máxima
        this.longitudBarra[this.currentPage] = (this.globalPoints[this.currentPage] / this.experienciaMaxima) * 300;
    
        // Dibujar la barra de progreso actualizada
        this.barraProgreso.fillStyle(0xE6E6FA);
        this.barraProgreso.fillRect(600 - 150, 575, this.longitudBarra[this.currentPage], 20);

        // Borde
        this.barraProgreso.lineStyle(2, 0x000000);
        this.barraProgreso.strokeRect(600 - 150, 575, 300, 20);
    }

    recompensas(){
        // Verificar si se alcanzó la experiencia máxima
        for (var i = 1; i <= 3; ++i) {
            var experienciaUmbral = this.experienciaMaxima;
            // Para i = 1, k va de 6 a 0 (los 7 primeros sombreros para el nivel 1)
            // Para i = 2, k va de 13 a 7 (los 7 segundos sombreros para el nivel 2)
            // Para i = 3, k va de 20 a 14 (los 7 ultimos sombreros para el nivel 3)
            for (var k = 6 * i + i - 1; k >= ((i - 1) * 7); --k) {
                if (this.globalPoints[i - 1] + ((i - 1) * experienciaUmbral) >= (experienciaUmbral * (k + 1)) / 7) { // Por cada 1000 puntos por nivel un sombrero de ese nivel
                    this.hatUnlocked[k % (7 * i)] = true;
                }
            }
        }
    }
}