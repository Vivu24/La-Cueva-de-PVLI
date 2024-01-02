//import Player from "./Player.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
    }

    create() {
        console.log("Level");
    }

    update() {
    }
}