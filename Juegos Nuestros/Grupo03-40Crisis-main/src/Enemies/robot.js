import Enemigo from'./enemigo.js'
export default class Robot extends Enemigo {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     */ 
    constructor(scene, x, y, key, player, config)
    {
        super(scene, x, y, player, config);
        this.key = key;
        this.posXCentered = config.posXCollider;
        this.posYCentered = config.posYCollider;
        this.damage = config.damage;

        scene.add.existing(this);

        this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
        this.add(this.enemy);
        this.setScale(config.scale); //cuidao que esto igual da problemas

        this.body.setSize(config.anchoCollider,config.altoCollider);
        this.cooldownDisparos = 1000;
        this.attackFlag = true;
        this.inCooldown = false;
    }

    attack() 
    {  
        this.attackFlag = false;
        this.body.setVelocity(0,0)
        // sacamos bala del grupoBalasRobot
        var bala = this.scene.grupoBalasRobot.get(this.body.x + 16, this.body.y + 32, 'balaRobot', this.damage);
        var angle = Phaser.Math.Angle.Between(this.body.x + 16, this.body.y + 32, this.player.getCenterPoint().x, this.player.getCenterPoint().y)
        if (bala)
        {
            bala.disparar(Math.cos(angle) , Math.sin(angle))
        }
    }

    // hace la animación y si se termina llamamos a attack en el super
    tryAttack()
    {
        this.attack();
        
        if (!this.inCooldown)
        {
            this.inCooldown = true;
            this.scene.time.delayedCall(this.cooldownDisparos, ()=> {
                this.attackFlag = true
                this.inCooldown = false;
            });
        }
    }

    preUpdate(){
        if (this.alive)
        {
        // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
        // y direction.x / y son las variables de direccion
        super.basicMovement(this.attackFlag);

        // si podemos atacar y seguimos en rango, intentamos atacar
        if (this.attackFlag && super.isInAttackRange())
        {
            this.attackFlag = false;
            this.tryAttack();
        } else if (!super.isInAttackRange())
        {
            this.enemy.play('walkrobot', true);
            if (!this.inCooldown)
            {
                this.inCooldown = true;
                this.scene.time.delayedCall(this.cooldownDisparos, ()=> {
                    this.attackFlag = true
                    this.inCooldown = false;
                });
                this.enemy.off('animationcomplete');
            }
            
        }
        }
    }
}
