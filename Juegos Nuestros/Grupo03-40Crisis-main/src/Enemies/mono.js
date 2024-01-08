import enemigo from "./enemigo.js";

export default class Mono extends enemigo{
/**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     * @param {config} config - enemy config
     */ 
constructor(scene, x, y, key, player, config){
    super(scene, x, y, player, config);
    this.key = key;

    this.setScale(config.scale);
    this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
    this.scene.add.existing(this);
    scene.physics.add.existing(this);
    this.add(this.enemy)
    this.body.setSize(config.anchoCollider, config.altoCollider);
    this.body.setOffset(config.posXCollider, config.posYCollider);

    // evento que llama a cambiar la dirección cada 1.5 seg
    this.scene.time.addEvent({
        delay: 1500,
        loop: true,
        callback: this.changeDirection,
        callbackScope: this
    });

    //pone un velocity random al ser creado por primera vez
    Phaser.Math.RandomXY(this.body.velocity, this.speed);
    this.enemy.play('walk' + this.key, true);
}

// cambiamos la dirección, si hay spawner vamos a por el, sino dirección random
changeDirection(){

    //si detecta que un potenciador se ha spawneado se dirige a por el, en caso contrario se mueve a otra direccion random
    if(this.scene.potenciadorSpawneado)
    {
        let direction = new Phaser.Math.Vector2(this.scene.potenciador.x - this.x, this.scene.potenciador.y - this.y)
        direction.normalize()

        this.body.setVelocity(direction.x * this.speed, direction.y * this.speed)
    }
    else
    {
        Phaser.Math.RandomXY(this.body.velocity, this.speed);
    }
}
}