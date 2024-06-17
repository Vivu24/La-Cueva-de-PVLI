import Player from "./Player.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });


    }

    init(data) {
        this.diff = data.difficulty || 0;

        if(this.diff == 1){
            this.recorrido = 50;
        }
        else if(this.diff == 2){
            this.recorrido = 100;
        }
        else{
            this.recorrido = 200;
        }
    }

    create() {
        this.background = this.add.sprite(0, 0, "background").setOrigin(0,-0.2);
        this.player = new Player(this, 50, 150);
        this.player.setScale(3);

        this.floor = this.createZone(0, 600, 5000, 50);
        this.physics.add.collider(this.player, this.floor);
    }

    update() {
        //this.checkCollision();


    }

    createZone(x, y, w, h){
        this.zone = this.add.zone(x, y, w, h);
        this.physics.world.enable(this.zone);
        this.zone.body.setAllowGravity(false);
        this.zone.body.setImmovable(true); // Cambiado a true para hacerlo inmóvil
        this.zone.setOrigin(0,0);

        return this.zone;
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

    checkCollision(){
        this.fuelPool.forEach(fuel => {
            const collision = this.physics.world.overlap(fuel, this.player);
            if(collision && !this.fuelRecogido){
                this.recogerFuel(fuel);
            }
        });

        const collision2 = this.physics.world.collision(this.player, this.floor);
        if(collision2 && this.fuelRecogido){
            this.echarGasolina();
        }

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
