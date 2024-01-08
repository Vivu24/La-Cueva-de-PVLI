import Button from "./button.js";
class MainMenu extends Phaser.Scene{
    constructor(){
        super({key: "MainMenu"});
    }
    create() {
        // Crea el fondo
        let background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, "mainMenuBackground");
        // Reducimos el tamaño del fondo
        background.setScale(0.8);

        this.levelsButton = new Button(this,this.sys.game.config.width/2, this.sys.game.config.height/2, 1, () => this.changeLevelsScene(), 'playButton')

    }
    update(){
       
        this.levelsButton.update()
    }
   
    changeLevelsScene(){
        this.levelsButton.disableInteractive()
        this.scene.start('Levels')
    }

}

export default MainMenu;