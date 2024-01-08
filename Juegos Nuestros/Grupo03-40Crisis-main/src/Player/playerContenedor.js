
import armaDisparos from "../Armas/armaDisparos/armaDisparos.js";
import armaMelee from "../Armas/armaMelee.js";
import armaObjetosSpawneado from "../Armas/armaSpawneadora/armaObjetoSpawneado.js";

export default class playerContenedor extends Phaser.GameObjects.Container {

    /**
     * @param {sprite} hat -sprite del sombrero que se pone en el contenedor
     * @param {sprite} player - sprite del jugador que se coloca en el contenedor
     * @param {number} hatId
     * @param {number} personalityExp - array con la experiencia de todas las personalidades
     * @param {number} currentPersonality - personalidad que se usa actualmente
     * @param {scene} scene
     * @param {string} key
     * @param {number} life
     * @param {number} maxLife - Vida máxima del jugador
     * @param {number} speed
     * @param {number} x
     * @param {number} y
     * @param {boolean} sleep
     * @param {boolean} invencible
     * @param {Arma} arma
     * PERSONALIDAD
     */
    constructor(scene, x, y, key, hatId, hatX, hatY, life, speed){
        super(scene, x, y);

        this.key = key;

        this.life = life;
        this.maxLife = life;

        this.speed = speed;

        this.sleep = false;

        this.invencible = false;

        this.maxExp = 600;

        this.dirX = 0;
        this.dirY = 0;

        this.changePerCooldown = 0.3;

        this.changePerBlock = false;

        this.Personalities = {
            ANALISTA: 0,
            EXPLORADOR: 1,
            CENTINELA: 2,
            PACIFISTA: 3,}
    
        this.personalityExp = [0, 0, 0, 0];
    
        this.currentPersonality = this.Personalities.EXPLORADOR;

        this.currentWeapon = 0;

        this.disparosAmmo = 30;

        this.inKnockback = false;
        // para que no pueda ser golpeado 2 veces por el coche/ola
        this.canGetHitByWave = true;

        //Creacion sprites
        this.player = scene.add.sprite(16, 32, key);
        this.add(this.player);
        this.player.setDepth(3)

        if(hatId != -1){
            this.myHat = scene.add.sprite(this.player.x -4, this.player.y -10, 'hat', hatId);
            this.myHat.setScale(0.25);
            this.add(this.myHat);
        }
        else{
            this.myHat = null;
        }

        this.aKey = this.scene.input.keyboard.addKey('A');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.sKey = this.scene.input.keyboard.addKey('S');
        this.qKey = this.scene.input.keyboard.addKey('Q');
        this.eKey = this.scene.input.keyboard.addKey('E');

        this.OneKey = this.scene.input.keyboard.addKey('1');
        this.TwoKey = this.scene.input.keyboard.addKey('2');
        this.ThreeKey = this.scene.input.keyboard.addKey('3');

        //Cambiar de arma con la rueda del ratón
        this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) =>
        {

            if(deltaY > 0){
                this.changeWeaponAux(true);
            }
            else if(deltaY < 0){
                this.changeWeaponAux(false);
            }

        });


        this.lookDer = true;

        //Tema fisicas
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);  

        this.body.setSize(this.player.width/2, this.player.width);

        //Animaciones
        this.scene.anims.create({
            key: 'walk'+ key,
            frames: scene.anims.generateFrameNumbers(key, {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'iddle' + key,
            frames: scene.anims.generateFrameNumbers(key, {start: 0, end:0}),
            frameRate: 5,
            repeat: -1
        });
        
        //CD de las armas
        var tiempoCooldown = new Map([
            ['fist', 0.6], ['bate', 1], ['espada', 0.6],
            ['pistola', 0.5], ['metralleta', 0.2], ['franco', 13],
            ['muro', 5], ['mina', 12], ['c4', 15],
            ['paralizador', 4], ['empuje', 0.6], ['varita', 20]
        ]);

        //DMG de las armas
        var damageArmas = new Map([
            ['fist', 4], ['bate', 7], ['espada', 9],
            ['pistola', 5], ['metralleta', 4], ['franco', 30],
            ['empuje', 0], ['varita', 0]
        ]);

        //Knockback de las armas
        var knockBackArmas = new Map([
            ['fist', 300], ['bate', 600], ['espada', 100], ['empuje', 1000]
        ])


        //Creacion de las armas
        this.armas = new Map([
            ['fist', new armaMelee(this.scene, tiempoCooldown.get('fist'), damageArmas.get('fist'),knockBackArmas.get('fist'),'fist', this)],
            ['bate', new armaMelee(this.scene, tiempoCooldown.get('bate'), damageArmas.get('bate'),knockBackArmas.get('bate'),'bate', this)],
            ['espada', new armaMelee(this.scene, tiempoCooldown.get('espada'), damageArmas.get('espada'),knockBackArmas.get('espada'),'espada', this)],
            ['pistola', new armaDisparos(this.scene, tiempoCooldown.get('pistola'), damageArmas.get('pistola'),'pistola', this)],
            ['metralleta', new armaDisparos(this.scene, tiempoCooldown.get('metralleta'), damageArmas.get('metralleta'),'metralleta', this)],
            ['franco', new armaDisparos(this.scene, tiempoCooldown.get('franco'), damageArmas.get('franco'),'franco', this)],
            ['mina', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('mina'), 'mina', this)],
            ['muro', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('muro'), 'muro', this)],
            ['c4', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('c4'), 'c4', this)],
            ['paralizador', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('paralizador'), 'paralizador', this)],
            ['empuje', new armaMelee(this.scene, tiempoCooldown.get('empuje'), damageArmas.get('empuje'), knockBackArmas.get('empuje'), 'empuje', this)],
            ['varita', new armaDisparos(this.scene, tiempoCooldown.get('varita'), damageArmas.get('varita'), 'varita', this)]
        ])

        this.effectHeal = this.scene.sound.add('speedUpEffect', {loop: false});
        this.effectSpeed = this.scene.sound.add('speedUpEffect', {loop: false});
        this.effectVivu = this.scene.sound.add('dormirEffect', {loop: false});
        this.effectSerGolpeado = this.scene.sound.add('serGolpeadoEffect', {loop: false});

        this.arma = this.armas.get('fist');

        this.arma.activate();
    }

    //Metodos de personalidades

    unlockPerChange(){
        this.changePerBlock = false;
    }

    //Cambio de personalidad
    changePersonality(right){

        this.changePerBlock = true;

        this.scene.time.addEvent({
            delay: 1000 * this.changePerCooldown,
            callback: this.unlockPerChange,
            callbackScope: this,
            loop: false

        })

        if(right){
            this.currentPersonality = (this.currentPersonality + 1) % 4;
        }
        else{
            if(this.currentPersonality == 0){
                this.currentPersonality = 3;
            }
            else{
                this.currentPersonality--;
            }

        }

        this.scene.changeInventory(this.currentPersonality);

        this.currentWeapon = 0;
        let name = this.weaponNameByPersonality();
        this.changeWeapon(name);

    }

    //Cambio de personlaidad al pulsar E (cambio tipo de armas)
    personalityInput(){
        if(!this.changePerBlock){
            if(this.eKey.isDown){
                this.changePersonality(true);
            }
            else if(this.qKey.isDown){
                this.changePersonality(false);
            }
        }
        
    }

    getCurrentPersonality(){
        return this.currentPersonality;
    }

    getPersonalityExp(personalityID){
        return this.personalityExp[personalityID];
    }

    getMaxExp(){
        return this.maxExp;
    }

    //Gestor de exp de las personalidades
    gainPersonalityExp(exp){

        if(this.personalityExp[this.currentPersonality] < this.maxExp){
            this.personalityExp[this.currentPersonality] += exp;

            if(this.personalityExp[this.currentPersonality] > this.maxExp){
                this.personalityExp[this.currentPersonality] = this.maxExp;
            }
        }
        

    }

    //Metodos de armas
    weaponNameByPersonality(){
        let weaponName = ' '

        if(this.currentPersonality == this.Personalities.ANALISTA){
            if(this.currentWeapon == 0){
                weaponName = 'muro';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'mina';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'c4';
            }
        }
        else if(this.currentPersonality == this.Personalities.CENTINELA){
            if(this.currentWeapon  == 0){
                weaponName = 'pistola';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'metralleta';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'franco';
            }
        }
        else if(this.currentPersonality == this.Personalities.EXPLORADOR){
            if(this.currentWeapon  == 0){
                weaponName = 'fist';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'bate';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'espada';
            }
        }
        else if(this.currentPersonality == this.Personalities.PACIFISTA){
            if(this.currentWeapon  == 0){
                weaponName = 'paralizador';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'empuje';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'varita';
            }
        }

        return weaponName;
    }
    //Cambio de arma (metodo aux)
    changeWeaponAux(up){
        
        if(up){
            this.currentWeapon = (this.currentWeapon + 1) % 3;
        }
        else{
            if(this.currentWeapon == 0){
                this.currentWeapon = 2;
            }
            else{
                this.currentWeapon--;
            }

        }

        if(this.currentWeapon == 1 && this.getPersonalityExp(this.currentPersonality) < this.maxExp / 3){
            this.currentWeapon = 0;
        }

        if(this.currentWeapon == 2 && this.getPersonalityExp(this.currentPersonality) < (this.maxExp * 2) / 3){
            this.currentWeapon = 0;
        }

        this.scene.changeInvenSelection(this.currentWeapon);
        this.changeWeapon(this.weaponNameByPersonality());
    }

    //Cambio de arma
    changeWeapon(newWeaponName)
    {
        this.arma.deactivate()
        this.arma = this.armas.get(newWeaponName)
        this.arma.activate()
    }

    getWeapon(){
        return this.arma;
    }

    getCurrentWeaponName(){
        return this.weaponNameByPersonality();
    }

    reloadDisparosAmmo(){
        this.disparosAmmo += 20;
    }

    getAmmo(){
        return this.disparosAmmo;
    }

    //Knockback de las armas
    knockBack(direction)
    {
        direction.normalize();
        if (!this.inKnockBack)
        {
            let knockBackSpeed = 600
            this.inKnockBack = true;
            this.body.setVelocity(knockBackSpeed * direction.x, knockBackSpeed * direction.y)
            this.scene.time.delayedCall(300, () =>{ this.inKnockBack = false })
        }
    }

    preUpdate(t, dt)
    {
        this.movement();
        this.personalityInput();

    }

    //Movimiento (input) y fisicas
    movement()
    {
        if (!this.inKnockBack)
        {
            if(this.dirX == 0 || this.dirX == -1){

                if(this.aKey.isDown){
                    if(this.dirX == 0){
                        this.dirX = -1;
    
                        if(this.lookDer){
                            this.player.setFlip(true, false);
    
                            if(this.myHat != null){
                                this.myHat.x = this.myHat.x + this.player.x / 2;
                                this.myHat.setFlip(true, false); 
                            }
                            
                            this.lookDer = !this.lookDer;
                        }
                        
                    }
                    
                }
                else if(this.aKey.isUp){
                    this.dirX = 0;
                }
            }
            
            if(this.dirX == 0 || this.dirX == 1){
                if(this.dKey.isDown){
                    if(this.dirX == 0){
                        this.dirX = 1;
                        if(!this.lookDer){
                            this.player.setFlip(false, false);
                            
                            if(this.myHat != null){
                                this.myHat.x = this.myHat.x - this.player.x / 2;
                                this.myHat.setFlip(false, false);
                            }
                            
                            this.lookDer = !this.lookDer;
                        }
                        
                    }   
                }
                else if(this.dKey.isUp){
                    this.dirX = 0;
                }
            }
            
            if(this.dirY == 0 || this.dirY == -1){
                if(this.wKey.isDown){
                    if(this.dirY == 0){
                        this.dirY = -1;
                    }
                      
                }
                else if(this.wKey.isUp){
                    
                    this.dirY = 0;
                }
            }
    
            if(this.dirY == 0 || this.dirY == 1){
                if(this.sKey.isDown){
                    if(this.dirY == 0){
                        this.dirY = 1;
                    }
                     
                }
                else if(this.sKey.isUp){
                    this.dirY = 0;
                }
            }
    
            if(this.dirX != 0 || this.dirY != 0){
                this.player.play('walk' + this.key, true);
    
                this.body.setVelocity(this.speed * this.dirX, this.speed * this.dirY);
                this.body.velocity.normalize().scale(this.speed);
    
            }
            else{
                this.body.setVelocity(0, 0);
                this.player.play('iddle' + this.key, true);
            }
        }
    }

    //Se llama cuando el jugador es golpeado
    receiveDamage(damage){
        if(!this.invulnerable)
        {
            this.effectSerGolpeado.play();
            this.life = this.life - damage;

         
            if(this.life <= 0){
                this.scene.die();
            }
        }
    
    }

    //Aplica los efectos de los potenciadores (incluye efectos de eventos del mapa)
    applyEffect(keyPotenciador){
        switch (keyPotenciador) {
            case 'botiquin':
                this.life += this.maxLife / 2;

                this.effectHeal.play();
                
                if (this.life > this.maxLife) {
                    this.life = this.maxLife;
                }

                this.tweenPotenciador = this.scene.tweens.add({
                    targets: this.player,
                    alpha: 0,
                    duration: 340,
                    ease: 'Sine.easeInOut',
                    yoyo: true
                });
                this.player.alpha = 1;
                break;
            case 'velocidad':

                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 280;
                    this.effectSpeed.play();
                  
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.player,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });

                    this.scene.time.delayedCall(6000, () => {
                        this.speed = this.aux // Reducir la velocidad de nuevo después de 3 segundos
                        this.underSpeedEffect = false;
                        this.player.alpha = 1;
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
                  
                    this.player.play('iddle' + this.key, true);
                    this.effectVivu.play();

                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.player,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });

                    this.scene.time.delayedCall(5000, () => {
                        this.speed = this.aux;
                        this.underSpeedEffect = false;
                        this.player.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }

                break;
            case 'invencible':
                this.invulnerable = true;
                this.tweenPotenciador = this.scene.tweens.add({
                    targets: this.player,
                    alpha: 0,
                    duration: 340,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                });
                this.scene.time.delayedCall(5000, () => {
                    this.invulnerable = false;
                    this.player.alpha = 1;
                    this.scene.tweens.remove(this.tweenPotenciador)
                });
                break;
            case 'humo':
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 60
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.player,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(2000, () => {
                        this.speed = this.aux 
                        this.underSpeedEffect = false;
                        this.player.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            case 'coche':
                if (this.canGetHitByWave)
                {
                    this.canGetHitByWave = false;
                    this.receiveDamage(5)
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.player,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(300, () => {
                        this.canGetHitByWave = true;
                        this.player.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            case 'lavaRock':
                if (this.canGetHitByWave)
                {
                    this.canGetHitByWave = false;
                    this.receiveDamage(5)
                    this.tweenPotenciador = this.scene.tweens.add({
                        targets: this.player,
                        alpha: 0,
                        duration: 340,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                    this.scene.time.delayedCall(300, () => {
                        this.canGetHitByWave = true;
                        this.player.alpha = 1;
                        this.scene.tweens.remove(this.tweenPotenciador)
                    });
                }
                break;
            default:
                break;
        }
    }

    //Gets generales
    getPlayer(){
        return this.player;
    }
    
    getPosition() {
        return { x: this.x, y: this.y };
    }

    getLife(){
        return this.life;
    }

    // da el punto en el medio del player, ya que getPosition da la esquina superior izq
    getCenterPoint(){
        return {x: this.x + 16, y: this.y + 16};
    }
}