import playerContenedor from '../Player/playerContenedor.js';
import municionBalas from '../Armas/armaDisparos/municionBalas.js';
export default class enemigo extends Phaser.GameObjects.Container {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {playerContenedor} player - referencia al player
     * @param {config} config - config de los parametros de los enemigos
     */

    constructor(scene, x, y, player, config){
        super(scene, x, y);

        this.player = player;
        this.speed = config.speed;
        this.damage = config.damage;
        this.life = config.vida;
        this.attackDistance = config.attackDistance;
        this.points = config.puntos;
        this.maxDropProbability = config.ammoDrop;

        this.direction = new Phaser.Math.Vector2();
        this.objetive = player;

        this.isAttacking = false;
        this.canDamage = true;
        this.inKnockBack = false;
        this.alive = true;
        this.invulnerable = false;

        this.explosiveState = false;
        this.objetiveState = false;

        // para que no pueda ser golpeado 2 veces por el coche/ola
        this.canGetHitByWave = true;

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);  
    }
    
    //devuelve si el jugador esta en su rango de ataque
    isInAttackRange(){
        return this.isAttacking;
    }
    getPlayer(){
        return this.player;
    }
    getDirection() {
        return { x: this.direction.x, y: this.direction.y };
    }

    //cambia el objetivo de los enemigos para que ataquen a otras cosas
    changeObjetive(objetive){
        this.objetive = objetive;
    }

    //gana el estado de objetivo, lo que genera un overlap a su alrededor que al ser tocado por un enemigo
    //cambia el objetivo de este para ser el propio enemigo
    gainObjetiveState(){

        this.objetiveState = true;
    
        this.zone = this.scene.add.zone(this.x, this.y, 100, 100);
            this.scene.physics.world.enable(this.zone);
            this.zone.body.setCircle(100 / 2);
    
            this.overlapObject = this.scene.physics.add.overlap(this.scene.grupoEnemigos, this.zone, function(enemy, zone){
                if(enemy != this){
                    this.attacker = enemy;
                    enemy.changeObjetive(this);
                    this.zone.destroy();
                }
                
            }, null, this)
    
    }

    //gana el estado de explosion lo que provoca que los enemigos con este estado ganen una leve invencibilidad para que la explosion
    //solo le afecte en una ocasion
    gainExplosiveState(explosionTime){
    
        this.explosiveState = true;
    
        this.event = this.scene.time.addEvent({
            delay: 1000 * explosionTime,
            callback: this.lostExplosiveState,
            callbackScope: this,
            loop: false
    
            })
    
    }
    
    //le quita el estado de explosion
    lostExplosiveState(){
        this.explosiveState = false;
    }

    //se le aplica un daño especifico al enemigo
    receiveDamage(damage){

        //siempre y cuando no sea invencible, este vivo (no en la animacion de muerte), en estado de explosion o sufriendo un knockback
        if(!this.invulnerable && this.alive && !(this.inKnockBack && this.canGetHitByWave) && !this.explosiveState){
          
            this.life -= damage;

            if(this.life <= 0){

                //se cambia el objetivo del enemigo que nos estaba atacando al player si tenemos el estado de objetivo
                if(this.objetiveState){

                    this.attacker.changeObjetive(this.player);

                }

                this.alive = false;
                this.body.setVelocity(0, 0);
                this.scene.sendPoints(this.points);
                
                //se añade personalidad exp al jugador al matar al enemigo
                this.player.gainPersonalityExp(2);
        
                //se hace el calculo para soltar municion
                var dropMunition = Phaser.Math.Between(1, 100);
    
                // el max drop probability es un stat de los enemigos
                if(dropMunition < this.maxDropProbability){
                    this.spawnMunition();
                }

                //se adapta el humo del robot para que salga como el del resto
                this.enemy.setOrigin(this.key == 'robot' ? 1.8 : 0.5, this.key == 'robot' ? 2.8 : 0.5)
                this.setScale(2)

                this.enemy.play('enemydeath', true);
                this.body.destroy();
                this.enemy.on('animationcomplete', this.destroyMyself )

                  // Asegúrate de contabilizar la eliminación solo una vez
                if (!this.isDestroyed) {
                    this.scene.increaseEnemiesDefeated();
                    this.isDestroyed = true;
                }
            }
        }
    }   

    //misma logica que el damage pero sin sumar puntos al jugador ya que es una muerte por evento
    recieveDamageNotGetPoints(damage)
    {
        if(!this.invulnerable && this.alive && !(this.inKnockBack && this.canGetHitByWave)){
          
            this.life -= damage;
            if(this.life <= 0){

                if(this.objetiveState){

                    this.attacker.changeObjetive(this.player);
                }

                this.alive = false;
                this.body.setVelocity(0, 0);
    
                
                this.setScale(2)
                this.enemy.play('enemydeath', true);
                this.body.destroy();
                this.enemy.on('animationcomplete', this.destroyMyself )

                  // Asegúrate de contabilizar la eliminación solo una vez
                if (!this.isDestroyed) {
                this.scene.increaseEnemiesDefeated();
                this.isDestroyed = true;
             
                }
            }
        }
    }

    //se envia el daño del stat del enemigo al objetivo
    attack()
    {
        this.objetive.receiveDamage(this.damage);
    }

    //se mueve al enemigo por fisicas en direcion al player
    basicMovement(canMove)
    {
        //solo se mueve si no es un objetivo
        if(!this.objetiveState){
            //aunque se llame player position es la posicion del objetivo que puede ser player/muro/enemigo
            var playerPosition = this.objetive.getCenterPoint();
        
            this.direction = new Phaser.Math.Vector2(
                playerPosition.x - this.x,
                playerPosition.y - this.y
            );
            this.direction.normalize();
            
            // calcular la distancia entre enemigo y player, si está debajo del mínimo de distancia
            // de ataque, dejar de acercarse y atacar
            if (Math.abs(this.x - playerPosition.x) < this.attackDistance &&
                Math.abs(this.y - playerPosition.y) < this.attackDistance)
            {
                this.isAttacking = true;
            }
            else
            {
                this.isAttacking = false;
                
                if (canMove && !this.inKnockBack)
                {
                    this.body.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y);
                    this.body.velocity.normalize().scale(this.speed);
                }
            }
        }
        else{
            this.body.setVelocity(0, 0);
        }
        
        
        //zona que tiene si es un objetivo
        if(this.zone != undefined){
            this.zone.x = this.body.x + 16;
            this.zone.y = this.body.y + 16;
        }
        
    }

    destroyMyself(){
        this.destroy();
    }

    // empuja modificando la velocidad y prohibiendo moverse para hacer knockback
    // tienes que pasarle un Phaser.Math.Vector2D normalizado
    knockBack(direction, knockBackSpeed)
    {
        direction.normalize();
        if (!this.inKnockBack)
        {
            this.inKnockBack = true;
            this.body.setVelocity(knockBackSpeed * direction.x, knockBackSpeed * direction.y)
            this.scene.time.delayedCall(300, () =>{ this.inKnockBack = false })
        }
    }
    
    // spawnea munición
    spawnMunition(){
    
        this.ammo = new municionBalas(this.scene, this.body.x + this.posXCentered, this.body.y + this.posYCentered, 'bulletAmmo');
        this.scene.addAmmoToGroup(this.ammo);
        this.scene.add.existing(this.ammo);
    }
    
    // aplicar efecto de potenciador y tween de parpadeo
    applyEffect(keyPotenciador){
        switch (keyPotenciador) {
            case 'botiquin':
                this.life += this.maxLife / 2;
                if (this.life > this.maxLife) {
                    this.life = this.maxLife;
                }
                break;
            case 'velocidad':
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 280;
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.enemy,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(6000, () => {
                        this.speed = this.aux // Reducir la velocidad de nuevo después de 3 segundos
                        this.underSpeedEffect = false;
                        this.enemy.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            case 'vivu':
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 0;
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.enemy,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(5000, () => {
                        this.speed = this.aux;
                        this.underSpeedEffect = false;
                        this.enemy.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            case 'invencible':
                this.invulnerable = true;
                this.tweenPotenciador = this.scene.tweens.add({
                    targets: this.enemy,
                    alpha: 0,
                    duration: 340,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                });
                this.scene.time.delayedCall(5000, () => {
                    this.invulnerable = false;
                    this.enemy.alpha = 1;
                    this.scene.tweens.remove(this.tweenPotenciador)
                });
                break;
            case 'humo':
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 40
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.enemy,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(2000, () => {
                        this.speed = this.aux 
                        this.underSpeedEffect = false;
                        this.enemy.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            case 'coche':
                if (this.canGetHitByWave)
                {
                    this.canGetHitByWave = false;
                    this.recieveDamageNotGetPoints(5)
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.enemy,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(300, () => {
                        this.canGetHitByWave = true;
                        this.enemy.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            case 'lavaRock':
                if (this.canGetHitByWave)
                {
                    this.canGetHitByWave = false;
                    this.recieveDamageNotGetPoints(1)
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.enemy,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(300, () => {
                        this.canGetHitByWave = true;
                        this.enemy.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            default:
                break;
        }
    }

    getCenterPoint(){
        return {x: this.x + 16, y: this.y + 16};
    }

    update()
    {
        this.enemy.setFlip(this.x > this.objetive.x, false)
    }
}