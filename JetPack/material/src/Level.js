import Player from "./Player.js";
import Meteor from "./Meteor.js";
import Fuel from "./Fuel.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.currentFuel = 0;
        this.movingFuel = false;
        this.gameCompleted = false;
    }

    init(data) {
        this.maxFuel = data.maxFuel;
        this.meteorCooldown = data.meteorCooldown;
    }

    create() {
        this.gameCompleted = false;
        this.currentFuel = 0;
        this.meteorsPool = [];
        this.fuelsPool = [];

        this.player = new Player(this, 100, 0);
        this.spaceship = this.add.sprite(160, 160, "spaceship");
        this.physics.world.enable(this.spaceship);
        this.spaceship.body.setAllowGravity(false);

        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("ground_ts","tileset");

        this.groundLayer = map.createLayer('ground', tileset);

        this.groundLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, this.groundLayer);

        this.spawnMeteor();
        this.generateFuel();
        this.HUD();
    }

    update() {
        this.checkToroidal();
        this.checkCollision();
        if (this.movingFuel){
            this.updateAuxFuel();
        }
        this.updateHUD();
        if (this.currentFuel >= this.maxFuel){
            this.victoryAnimation();
        }
    }

    checkToroidal(){
        if (this.player.x > this.cameras.main.width){
            this.player.x = 0;
        }
        else if (this.player.x < 0){
            this.player.x = this.cameras.main.width;
        }

        this.meteorsPool.forEach(meteor => {
            if (meteor.x > this.cameras.main.width){
                meteor.x = 0;
            }
            else if (meteor.x < 0){
                meteor.x = this.cameras.main.width;
            }
        });
    }

    spawnMeteor() {
        const createMeteor = () => {
            if(!this.gameCompleted){
                const meteor = new Meteor(this, Phaser.Math.Between(0, this.cameras.main.width), -20, Phaser.Math.Between(-50, 50));
                this.physics.add.collider(meteor, this.groundLayer);

                this.meteorsPool.push(meteor);     
            }
        };

        this.time.addEvent({
            delay: (this.meteorCooldown * 1000),
            loop: true,
            callback: createMeteor,
            callbackScope: this
        });
    }

    generateFuel() {
        for(let i = 0; i < this.maxFuel; i++){
            const fuel = new Fuel (this, Phaser.Math.Between(0, this.cameras.main.width), Phaser.Math.Between(0, this.cameras.main.height));
            this.physics.add.collider(fuel, this.groundLayer);

            this.fuelsPool.push(fuel);     
        }
    }

    checkCollision(){
        this.meteorsPool.forEach(meteor => {
            meteor.checkCollisionWithPlayer(this.player);
        });
        this.fuelsPool.forEach(fuel => {
            fuel.checkCollisionWithPlayer(this.player);
        });

        this.checkSpaceshipCollision();
        
    }

    checkSpaceshipCollision(){
        if (this.physics.world.overlap(this.player, this.spaceship) && this.movingFuel) {
            this.currentFuel++;                               
            this.movingFuel = false;
            this.auxFuel.destroy();
        }
    }

    goToTitle() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    createAuxFuel(){
        this.auxFuel = this.add.sprite(this.player.x, this.player.y - 10, "fuel");
    }

    updateAuxFuel(){
        this.auxFuel.x = this.player.x;
        this.auxFuel.y = this.player.y - 10
    }

    HUD(){
        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            this.currentFuel + " / " + this.maxFuel,
            {
                fontFamily: 'Pixeled',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    updateHUD(){
        this.score.destroy();
        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            this.currentFuel + " / " + this.maxFuel,
            {
                fontFamily: 'Pixeled',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    victoryAnimation() {
        this.gameCompleted = true;
        this.player.destroy();

        this.time.delayedCall(2000, () => {
            this.spaceship.body.setVelocityY(-2);
        }, [], this);

        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(500, () => {
                this.spaceship.body.setVelocityY(this.spaceship.body.velocity.y - 1);
            }, [], this);
        }

        // Agregar un retraso de 5 segundos antes de saltar al menú
        this.time.delayedCall(5000, this.goToTitle, [], this);
    }

}