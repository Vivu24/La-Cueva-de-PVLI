

export default class button extends Phaser.GameObjects.Container{

/**
 * 
 * @param {*} scene 
 * @param {*} x 
 * @param {*} y 
 * @param {*} key 
 * @param {*} xReduction //cuanto debe ir a la derecha la zona de interaccion del boton
 * @param {*} yReduction //cuanto debe bajar la zona de interaccion del boton
 * @param {*} width //el ancho de la zona interactiva
 * @param {*} height //el alto de la zona interactiva
 */

    constructor(scene, x, y, key, xReduction, yReduction, width, height){

        super(scene, x, y);

        this.buttonSprite = scene.add.sprite(x - xReduction, y - yReduction, key); 
        
        this.setSize(width, height);

        this.flipX = false;

        this.flipY = false;

        this.buttonSprite.setFlip(this.flipX, this.flipY);

        this.setInteractive();

        this.scene.add.existing(this);

    }

    //flipea el sprite que componga el boton segun lo que establezca el jugador(funciona como el de phaser)
    setFlip(flipX, flipY){

        this.flipX = flipX;

        this.flipY = flipY;

        this.buttonSprite.setFlip(this.flipX, this.flipY);

    }


}