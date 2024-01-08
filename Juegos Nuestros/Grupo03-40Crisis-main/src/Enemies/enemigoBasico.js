import Enemigo from "./enemigo.js";
import municionBalas from "../Armas/armaDisparos/municionBalas.js";

export default class EnemigoBasico extends Enemigo{
/**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     * @param {config} config - configuración de cada tipo de enemigo
     */ 
constructor(scene, x, y, key, player, config)
{
    super(scene, x, y, player, config);
    this.key = key;
    this.scene = scene;

    this.posXCentered = config.posXCollider;
    this.posYCentered = config.posYCollider;
    
    this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
    this.add(this.enemy);
    this.enemy.setDepth(3)
    this.setScale(config.scale);
    this.attackFlag = true;
    this.alive = true;
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.body.setSize(config.anchoCollider,config.altoCollider);
}

// comprobamos si estamos en rango de ataque y atacamos
// el this.key caracol es para que si se hace el ataque del caracol
// que es una gran explosion que mueras 100%
attack() { if (super.isInAttackRange() || this.key == 'caracol') {super.attack()} }

// hace la animación y si se termina llamamos a attack en el super
tryAttack()
{
    this.body.setVelocity(0, 0);
    this.body.velocity.normalize().scale(this.speed);

    this.enemy.play('attack' + this.key, true);
    this.enemy.on('animationcomplete', function(){
        this.attackFlag = true;
        this.attack();
        this.enemy.off('animationcomplete');
    }, this)
}



preUpdate(){
    // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
    // y direction.x / y son las variables de direccion
    if(this.alive){
        super.basicMovement(this.attackFlag);

        // si podemos atacar y seguimos en rango, intentamos atacar
        if (this.attackFlag)
        {
            if (super.isInAttackRange())
            {
                this.attackFlag = false;
                this.enemy.off('animationcomplete');
                this.tryAttack();
            }
            else
            {
                this.enemy.play('walk' + this.key, true);
            }
        }
        

    }
    
}

}