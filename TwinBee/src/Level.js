import Player from "./Player.js"

export default class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'Level' });
    }

    create() {
        this.player1 = new Player(this, 150, 150);
        console.log("level")
    }

    update() {

    }
}
