export default class Menu extends Phaser.Scene{

    constructor(){
        super({key: 'Menu'});
    }

    create(){
        let button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Play', 
        { fontFamily: 'arcade_classic', fontSize: 50 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);
        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Level");
        });
    }

    update(){

    }
}