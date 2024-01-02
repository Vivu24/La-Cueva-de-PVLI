import Player from "./Player.js";

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
}