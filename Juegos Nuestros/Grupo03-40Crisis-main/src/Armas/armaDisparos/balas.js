import EnemigoBasico from "../../Enemies/enemigoBasico.js";

export default class Bala extends Phaser.Physics.Arcade.Sprite {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    */
    constructor(scene, x, y, key, damage)
    {
        super(scene, x, y, key)
        scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(3);

        //las balas tienen una velocidad fija
        this.speed = 350;
        this.damage = damage;
        this.key = key;
        this.active = false;
        
    }

    //se le pasa la direccion a la que debe moverse la bala
    disparar(directionX, directionY)
    {
        this.setVelocity(this.speed * directionX, this.speed * directionY);
    }

    getDamage(){
        return this.damage; 
    }
}