export default class Button extends Phaser.GameObjects.Image{
    constructor(scene, x, y, scale, fun ,key){
        super(scene, x , y, key)
        this.scene.add.existing(this)
        this.name = key
        this.setScale(scale)
        this.setInteractive();
        this.fun = fun
        this.once = false;
    }
    create(){
        this.setTexture(this.name)
        
    }
    update(){
        //Funcion que realiza
            this.removeAllListeners("pointerdown");
            this.on("pointerdown", () => {
               this.fun()
            })

        

        //Funcion hover
        this.on("pointerover", ()=>{
            this.setTexture(this.name + '_hover')
        })
        this.on("pointerout", ()=> {
            this.setTexture(this.name)
        })
    }
}