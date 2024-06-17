import Player from "./Player.js";
import Meteor from "./Meteor.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameTime = 90; // 90 segundos para el juego

    }

    init(data) {
        this.diff = data.difficulty || 0;

        if(this.diff == 1){
            this.fuelsNecesarios = 2;
            this.meteorCooldown = 2000;
        }
        else if(this.diff == 2){
            this.fuelsNecesarios = 3;
            this.meteorCooldown = 1000;
        }
        else{
            this.fuelsNecesarios = 5;
            this.meteorCooldown = 500;
        }
    }

    create() {

        this.fuelsRecogidos = 0;

        this.player = new Player(this,50,50);
    

        // *** TILEMAP *** // en el enunciado nos dice q los tiles son 8x8
        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("ground_ts", "tileset");
        this.groundLayer = map.createLayer('ground', tileset);

        // Colision con el suelo / plataformas
        // Abrir en Tiled sample.tmx 
        // En conjunto de patrones, click derecho y editar conj de patrones
        // Añade propiedad collides a true
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.groundLayer);

        this.fuelPool = [];
        this.meteorPool = [];

        for(let i = 0; i < this.fuelsNecesarios; i++){
            this.rand = this.getRandomNumber(1, this.cameras.main.width);
            this.instanciaFuel(this.rand, 0);
        }


        this.spaceship = this.add.sprite(160, 160, "spaceship");
        this.physics.world.enable(this.spaceship);
        this.spaceship.body.setAllowGravity(false);

        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            this.fuelsRecogidos + "/" + this.fuelsNecesarios,
            {
                fontFamily: 'Pixeled',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        this.time.addEvent({
            delay: this.meteorCooldown,
            loop: true,
            callback: () => {
                this.rand = this.getRandomNumber(1, this.cameras.main.width);
                this.instanciaMeteor(this.rand,0);
            }
        });

    }

    update() {
        this.checkCollision();

        if(this.fuelRecogido){
            this.fuel.body.setAllowGravity(false);
            this.fuel.x = this.player.x;
            this.fuel.y = this.player.y - 15;
        }

        if(this.fuelsNecesarios == this.fuelsRecogidos && !this.gameEnd){
            this.finishGame();
            this.gameEnd = true;
        }

    }

    instanciaMeteor(x,y){
        console.log("instanciameteor")
        this.meteor = new Meteor(this, x, y);
        this.physics.world.enable(this.meteor);
        this.physics.add.collider(this.meteor, this.groundLayer);

        this.meteorPool.push(this.meteor);
    }

    instanciaFuel(x,y){
        this.fuel = this.add.sprite(x, y, "fuel");
        this.physics.world.enable(this.fuel);
        this.physics.add.collider(this.fuel, this.groundLayer);

        this.fuelPool.push(this.fuel);
    }

    finishGame(){

        this.victoryText();
        this.time.delayedCall(5000, () => {
            this.goToTitle();
        }, [], this);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    victoryText(){
        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            'Victory',
            {
                fontFamily: 'Pixeled',
                fontSize: 20,
                color: 'Blue',
            }
        ).setOrigin(0.5, 0.5);
        title.setAlign('center');
    }

    loserText(){
        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            'You lost',
            {
                fontFamily: 'Pixeled',
                fontSize: 20,
                color: 'Blue',
            }
        ).setOrigin(0.5, 0.5);
        title.setAlign('center');
    }

    spawnBolas(){
        for(let i = 0; i < 5; i++){
            this.ball = new Ball(this, 130 + i*50, 160);
            this.ballPool.push(this.ball);
        }
        for(let i = 0; i < 5; i++){
            this.ball = new Ball(this, 130 + i*50, 435);
            this.ballPool.push(this.ball);
        }
    }

    checkCollision(){
        this.fuelPool.forEach(fuel => {
            const collision = this.physics.world.overlap(fuel, this.player);
            if(collision && !this.fuelRecogido){
                this.recogerFuel(fuel);
            }
        });

        const collision2 = this.physics.world.overlap(this.spaceship, this.player);
        if(collision2 && this.fuelRecogido){
            this.echarGasolina();
        }

        this.meteorPool.forEach(meteor => {
            const collision = this.physics.world.overlap(meteor, this.player);
            if(collision){
                this.loserText();
                this.time.delayedCall(3000, () => {
                    this.goToTitle();
                }, [], this);
            }
        });
    }

    echarGasolina(){
        this.fuel.destroy();
        this.fuelRecogido = false;
        this.fuelsRecogidos ++;
        this.updateHUD();
    }

    recogerFuel(fuel){
        fuel.destroy();
        this.instanciaFuel(this.player.x, this.player.y - 15);
        this.fuelRecogido = true;
    }

    goToTitle() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    updateHUD(){
        this.score.destroy();
        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            this.fuelsRecogidos + "/" + this.fuelsNecesarios,
            {
                fontFamily: 'Pixeled',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }
}
