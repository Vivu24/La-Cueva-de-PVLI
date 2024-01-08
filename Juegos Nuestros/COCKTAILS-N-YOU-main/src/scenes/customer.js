


// Definir la clase
export default class Costumer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, type,dialogue, destinoY, skin) {
        super(scene, x, y, {key:'customer'}); 
        this.type = type;
        this.dialogue = dialogue
        this.destinoY = destinoY
        this.skin = skin

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        //ver si queremos crearlos siempre en el mismo sitio-> no hace falta pasarle la posicion y se crea aqui
        // this.x = x; esto es por si queremos instancialos en distintos lugares
        // this.y = y;
        
        this.type = type;
        this.showDialogueOnce = true;
        // this.setScale(2);
        
        
    }
    
    preUpdate(t,dt){
        super.preUpdate(t,dt)
        //comporbar que el juego esta completado para que se vaya el customer
        if(this.y > this.destinoY) {
            this.setVelocityY(-200)
            this.anims.play('customer_walkBackWards_' + this.skin, true);
        }
        else{
            this.setVelocityY(0)
            this.anims.play('customer_idle_' + this.skin, true);
            
            if(this.showDialogueOnce){
                this.scene.showDialogue()
                this.scene.createInteractionRect();
                this.showDialogueOnce = false;
                
            }
        }    
        
    }    
    arrived(){
        return this.y <= this.destinoY
    }
}

// Crear una instancia de la clase
// var miInstancia = new MiObjeto(scene, x, y, color, numero, informacion, destinoX, destinoY);
