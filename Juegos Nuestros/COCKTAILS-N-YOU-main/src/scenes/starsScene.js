import { calculateLevelStars, finalStars, unlockNextLevel } from "./GameManager.js"
import Button from "./button.js"

export default class Stars extends Phaser.Scene{
    constructor(){
        super({key: 'Stars'})
        this.pos1 = {x: 200, y: 100}
        this.offsetX = 200  
    }
    create(){
        calculateLevelStars()
        this.numStars = this.normalizeStars()
        this.loadStars()
        this.homeButton = new Button(this, 400, 450, 0.5, () => {
            this.scene.start('Levels')
            unlockNextLevel();
    }, 'homeButton')
    }
    update(){
        this.homeButton.update()
    }
    loadStars(){
        for( var i = 0; i < 3; i++){
            if(i < this.numStars)
            this.add.image(i*this.offsetX + this.offsetX, this.pos1.y, 'star').setScale(0.1)
        else this.add.image(i*this.offsetX + this.offsetX, this.pos1.y, 'star_empty').setScale(0.1)
        }
        switch(this.numStars){
            case 0: 
            this.add.image(400, 270, 'fail').setScale(0.3) 
            break
            case 1:
                this.add.image(400, 270, 'nice')
                break
            case 2:
                this.add.image(400, 300, 'cool').setScale(0.5)
                break
            case 3:
                this.add.image(400, 250, 'excellent')
        }
        
    }
    normalizeStars(){
        if(finalStars >= 2.75 && finalStars <= 3) return 3
        else if(finalStars >= 1.75 && finalStars < 2.75) return 2
        else if(finalStars >= 0.75 && finalStars < 1.75) return 1
        else return 0
    }
}