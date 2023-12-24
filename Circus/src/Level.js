export default class Level extends Phaser.Scene{

    constructor(){
        super({key: 'Level'});
    }

    create(){
        console.log("Level");

        this.background = this.add.image(0,200, "background").setOrigin(0,0);
    }

    update(){
        this.background.x = this.cameras.main.scrollX * 5; // Adjust the multiplier
    }
}