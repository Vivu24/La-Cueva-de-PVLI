import { currentminigame, currenttext } from "./GameManager.js";
import Button from "./button.js";
class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    create() {

        // Pausar el juego principal
        this.scene.pause(currentminigame);
        this.libro = this.add.image(400,300,'libro').setDepth(0);
        this.libro.setScale(0.5);
        if(currenttext != ""){
            this.texto = this.add.image(400,330,currenttext).setDepth(0);
            this.texto.setScale(0.7);
        }
        
       

        this.resume = new Button(this,400, 570, 0.25,()=>{
        this.scene.stop()
        this.scene.resume(currentminigame)
        this.sound.resumeAll();
         },'resumeButton');

        this.volextra = new Button(this,350, 510, 0.12,()=>{
             },'resumeButton');
        this.volemenos = new Button(this,450, 510, 0.12,()=>{
            },'resumeButton');
            
        

        
    }
    update(){
        this.resume.update();
       }
}

export default PauseMenu;
