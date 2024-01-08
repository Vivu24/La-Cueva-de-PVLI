import playerContenedor from './Player/playerContenedor.js';


export default class Potenciador extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {sprite} sprite - sprite
    * @param {number} y - posicion y
    * @param {playerContenedor} player - referencia al player
    * @param {string} key - sprite
    */

    //Constructor del potenciador 
    constructor(scene, x, y, key, player){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sprite = scene.add.sprite(32, 32, key);
        this.add(this.sprite);
        this.setScale(0.15); 

        //Comprueba la colision del player con el potenciador
        scene.physics.add.collider(this, this.player, ()=>{
            this.player.applyEffect(this.key) //Si colisionan aplica el efecto al player
            this.scene.reespawnearPotenciador()
            this.destroy();
        })

         //Comprueba la colision de un enemigo con el potenciador
        scene.physics.add.collider(this, scene.grupoEnemigos, (pot, enemigo)=>{
            enemigo.applyEffect(this.key)  //Si colisionan aplica el efecto al enemigo
            this.scene.reespawnearPotenciador()
            this.destroy();
        })
    }
}