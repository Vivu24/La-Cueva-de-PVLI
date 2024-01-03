import Player from "./Player.js";
import Meteor from "./Meteor.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    create() {
        this.meteorsPool = [];

        this.player = new Player(this, 100, 0);

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
    }

    update() {
        this.checkToroidal();
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
            delay: 1000,
            loop: true,
            callback: createMeteor,
            callbackScope: this
        });
    }
}