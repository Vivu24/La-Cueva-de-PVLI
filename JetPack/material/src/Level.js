import Player from "./Player.js";
import Meteor from "./Meteor.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    create() {

        this.player = new Player(this, 100, 0,);

        const map = this.make.tilemap({
            key: "tilemap",
            tileWidth: 8,
            tileHeight: 8
        })

        const tileset = map.addTilesetImage("ground_ts","tileset");

        const groundLayer = map.createLayer('ground', tileset);

        groundLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, groundLayer);

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
    }

    spawnMeteor() {
        const createMeteor = () => {
            if(!this.gameCompleted){
                this.meteor = new Meteor(this, Phaser.Math.Between(0, this.cameras.main.width), -0);
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