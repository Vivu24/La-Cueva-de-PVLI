import { currentLevel, levels } from "./GameManager.js"
import { setNumCustomers } from "./GameManager.js"

export default class LevelScene extends Phaser.Scene{
    constructor(){
        super({key: 'Levels'})
        this.accesibleLevels = []
        this.buttonScale = 0.2
        
    }
    create(){
        //Background
        this.background = this.add.image(400, 300, 'FondoLevel').setDepth(0).setAlpha(0.5)
        this.background.setScale(0.5)
        // this.background.setAlpha(0.5)

        this.createButtons()
        //Desbloquear los niveles oportunos
        for(var i = 0; i < currentLevel; i++){
            this.accesibleLevels.push(this.buttons[i])
        }
       this.buttons.forEach(button => {
        if(!this.accesibleLevels.includes(button)){
            this.add.image(button.x, button.y, 'candado').setScale(0.2)
        }
       })
    }
    createButtons(){
        this.buttons = [
            this.buttonLevel1 = this.add.image(160, 300, 'levelsButton').setInteractive().setScale(this.buttonScale),
            this.buttonLevel2 = this.add.image(320, 300, 'levelsButton').setInteractive().setScale(this.buttonScale),
            this.buttonLevel3 = this.add.image(480, 300, 'levelsButton').setInteractive().setScale(this.buttonScale),
            this.buttonLevel4 = this.add.image(640, 300, 'levelsButton').setInteractive().setScale(this.buttonScale)
        ]
       
    }
    update(){
       this.updateLv1()
       this.updateLv2()
       this.updateLv3()
       this.updateLv4()
    }
    updateLv1(){
        if(this.accesibleLevels.includes(this.buttons[0])){
            this.hover(this.buttons[0])
            //DOWN
            this.buttonLevel1.removeAllListeners("pointerdown");
            this.buttonLevel1.on('pointerdown', () => {
                setNumCustomers(levels['level1'].customerCant)
                this.scene.start('barScene')
            })
        }
    }
    updateLv2(){
        if(this.accesibleLevels.includes(this.buttons[1])){
            this.hover(this.buttons[1])
            this.buttonLevel2.removeAllListeners("pointerdown");
            this.buttonLevel2.on('pointerdown', () => {
                setNumCustomers(levels['level2'].customerCant)
                this.scene.start('barScene')
            })
        }
    }
    updateLv3(){
        if(this.accesibleLevels.includes(this.buttons[2])){
            this.hover(this.buttons[2])
            this.buttonLevel3.removeAllListeners("pointerdown");
            this.buttonLevel3.on('pointerdown', () => {
                setNumCustomers(levels['level3'].customerCant)
                this.scene.start('barScene')
            })
        }
    }
    updateLv4(){
        if(this.accesibleLevels.includes(this.buttons[3])){
            this.hover(this.buttons[3])
            this.buttonLevel4.removeAllListeners("pointerdown");
            this.buttonLevel4.on('pointerdown', () => {
                setNumCustomers(levels['level4'].customerCant)
                this.scene.start('barScene')
            })
        }
    }
    hover(button){
        button.on('pointerover', () => {
            button.setScale(this.buttonScale + 0.05)
        })
        button.on('pointerout', () => {
            button.setScale(this.buttonScale)
        })
    }
}