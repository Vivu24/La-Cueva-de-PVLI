import Button from "../objects/button.js";
export default class MelonFlippeador extends Phaser.Scene
{

    constructor() {

		super({ key: 'melonFlippeador'});   

        // crea un emitidor de eventos
        this.emitter = new Phaser.Events.EventEmitter();
	}


    preload(){
        // fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
        this.load.image('fondo', './assets/images/escenarios/melonFlip2.png');

        // boton de vuelta
        this.load.image('goBackBox', './assets/images/escenarios/goBack2.png');

        // boton de retry
        this.load.image('retry', './assets/images/escenarios/retry.png');

        // melon flippeando
        this.load.image('melon', './assets/images/personajes/melonQueFlippea3.png');

        // tuberia flippeando
        this.load.image('pipe', './assets/images/personajes/pipe3_1_1.png');


        // musiquita de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
        this.load.audio('melon_music', ["./assets/sounds/bgm/a-short-story-loop-1/A_Short_Story_loop_1.ogg"]);
        // sonido del flipeo
        this.load.audio('flip_melon', ["./assets/sounds/sfx-magic11/sfx-magic11.mp3"]);
        // sonido de derrota
        this.load.audio('game_over', ["./assets/sounds/sfx-defeat4/sfx-defeat4.mp3"]);

    }

    create(){

        // -------------------- SETTEO INICIAL ---------------------

        this.music  = this.sound.add("melon_music", { loop: true });
        this.flip  = this.sound.add("flip_melon", { loop: false });
        this.gameOverSound  = this.sound.add("game_over", { loop: false });

        const scene = this // referencia a esta misma escena

        // si es 0 es que no ha acabado si es 1 es que ha acabado (NO SE HACER BOOLEANOS)
        this.gameEnded = 0;

        // 
        this.SCORE = 0;

        // texto para el score
        this.scoreText = this.add.text(50, 50, this.SCORE, {
            fontFamily: 'Arial',
            fontSize: 35,
            color: '#3b6e22'
        });
        this.scoreText.setScale(2,2);

        this.cursor = this.input.keyboard.createCursorKeys();

        // pone el fondo
        let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
        bg.depth = -2;

        // grupo de fisicas de tuberias
        this.PIPE = this.physics.add.group({
            defaultKey: 'pipe',
            collideWorldBounds: false
        });

        // array de pipes
        this.pipes = [];

        // crea el melon
        scene.mel = this.physics.add.sprite(150, 270, 'melon', 0).setOrigin(0.5,0.5);
        scene.mel.setScale(1.5, 1.5);

        // tween del melon
        scene.melonTween = this.tweens.add ({
            targets: this.mel,
			duration: 200,
		    angle: '+=360',
			persist: true
        })

        // ------------------- COLISIONES ----------------

        // crea las colisiones
        this.colliderObj = this.physics.add.collider(this.mel, this.PIPE,() =>{

            // cuando colisiona memite el evento
            this.emitter.emit('died', this);
            this.gameOverSound.play();
        });

        // ----------------- END GAME EVENT ---------------------

        // crea un evento y un listener para el evento (la funcion)
        this.emitter.on('died', function(scene){

            // acaba el juego
            scene.endGame();

            // limpia el grupo de colisiones
            scene.PIPE.clear();
            
            // elimina los objetos
            for(let i = 0; i<scene.pipes.length; i++){

                // destruye el objeto
                scene.pipes[i].destroy();
            }
            
            // desactiva las fisicas
            scene.mel.body.setEnable(false);

            // llama a la escena del final
            scene.endScreen(scene);

        });


        // variables para los pipes
        this.pipeCooldown = 70;
        this.cdCounter = 0;

        // input por barra espaciadora
        scene.input.keyboard.on('keydown-SPACE', function() {
            scene.melonJump();
        })

    }

    update(){

        if(this.pipes.length <= 0){
            // crea un nuebo tubo
            this.createNewPipe();
        }

        //Activamos la música si no está ya activa
        if(!this.music.isPlaying) {
			this.music.play()
		}

        // si el juego no ha acabado
        if(this.gameEnded === 0){

            // input
            if(this.cursor.up.isDown){
                // salto
                this.melonJump();
            }

            // gestiona todo sobre las tuberias
            this.pipesManager();

            // si se ha pasado de alto o de bajo
            if(this.mel.y > 750 || this.mel.y < 0){

                    // cuando colisiona memite el evento
                    this.emitter.emit('died', this);

            }
        }
    }

    melonJump() {
        this.mel.setVelocityY(-200);
        this.melonTween.play();
        this.flip.play();
    }


    pipesManager(){
        for(let i = 0; i<this.pipes.length; i++){

            if(!this.pipes[i].newPipeCreated && this.pipes[i].x < 750){
                

                // marca que se haya pasado
                this.pipes[i].newPipeCreated = true;
                this.pipes[i+1].newPipeCreated = true;

                // crea un nuebo tubo
                this.createNewPipe();

            }

            // si no se ha pasado y esta en una posicion mas baja que el melon
            else if(!this.pipes[i].passed && this.pipes[i].x < 200){

                // pone puntos
                this.addPoints();

                // marca que se haya pasado
                this.pipes[i].passed = true;

            }
            else if(this.pipes[i].x < -200){

                // si n o es undefined
                if(this.pipes[i] != undefined){

                    // elimina el elemento del array
                    this.PIPE.remove(this.pipes[i], true);

                    this.pipes[i].destroy(false, true);

                    Phaser.Utils.Array.Remove(this.pipes, this.pipes[i]);
                }
                
            }
        }
    }

    // --------------------------------- AUXILIARES -----------------------------
    createNewPipe(){

        // crea una altura
        let height = this.createNewHeight();

        // crea la tuberia de arriba
        this.TOPpipe = this.PIPE.create(1400, height).body.setAllowGravity(false);
        this.TOPpipe.setVelocity(-200 - 10 * this.SCORE, 0);
        this.TOPpipe.depth = 2;
        this.pipes.push(this.TOPpipe);


        // crea una tuberia de abajo
        this.BOTpipe = this.PIPE.create(1400, height + 700).body.setAllowGravity(false);
        this.BOTpipe.setVelocity(-200 - 10 * this.SCORE, 0);
        this.BOTpipe.depth = 2;
        this.pipes.push(this.BOTpipe);

    }

    createNewHeight(){
        // genera un numero aleatorio
        let height = Phaser.Math.Between(-20, 80)

        // devuelve la altura generada
        return height;

        // -20 - 80
    }

    endGame(){

        // cambia el 'booleano'
        this.gameEnded = 1;
    }

    addPoints(){
        // pone 0.5 puntos (triquinyuela porque pasa dos veces por lo mismo heh)
        this.SCORE += 0.5;

        // actualiza el texto
        this.updateScoreText();
    }

    updateScoreText(){
        this.scoreText.setText(this.SCORE)
    }


    endScreen(escena){
        // boton de restart
        let restart = new Button(this, 590, 200, ' ', 2, 'retry', {"ClickCallback": () => this.restartGame (this) });

        // boton para volver al movil
        let movil = new Button(this, 100, 300, ' ', 2, 'goBackBox', { "ClickCallback": () => this.changeScene("movil", this) });

    }

    restartGame(escena){
        escena.scene.restart();
        this.music.pause();
    }

    changeScene(newScene, escena){
		escena.scene.switch(newScene);
        this.music.pause();
	}
}


