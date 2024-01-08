import Arma from "../arma.js"
import Bala from "./balas.js"
import BalaMagica from "./balasMagicas.js";
export default class armaDisparos extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} tiempoCooldown - tiempo para volver a atacar
    * @param {number} damageArma - daño del arma
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, tiempoCooldown, damageArma, key, player)
    {
        super(scene,0,0,key,player)
        this.key = key;

        this.scene = scene

        this.enfriamientoTime = tiempoCooldown;
        this.damageArma = damageArma;

        this.elapsedTime = tiempoCooldown;

        //detecta si tienes el boton pulsado para hacer varias rafagas de ataque
        this.clickDown = false;

        this.scene.input.on('pointerdown', (pointer) =>
        {
            this.clickDown = true;
        })
        
        this.scene.input.on('pointerup', (pointer) =>
        {
            this.clickDown = false;
        })

        //timer que permite calcular el elapsed time que ha pasado al sumarle el tiempo de delay a una variable
        this.event = this.scene.time.addEvent({
            delay: 100,
            callback: this.calculateElapsedTime,
            callbackScope: this,
            loop: true
    
        });

        this.effectShoot = this.scene.sound.add('disparoEffect', {loop: false});
        
    }

    //suma el tiempo de delay a la variable
    calculateElapsedTime(){
        this.elapsedTime += 0.1;
    }

    //Intenta hacer un ataque
    tryAttack()
    {

        //Para realizar el ataque se debe cumplir que el tiempo de coolsown sea mayor y tener municion
        if (this.elapsedTime >= this.enfriamientoTime && this.player.disparosAmmo > 0)
        {

            //Si el arma es la varita las balas spawneadas son magicas, al no tener más arams de ese estilo no hemos hecho ninguna clase
            if(this.key == 'varita'){

                var balaMag = new BalaMagica(this.scene, this.x, this.y, 'balaMagica', this.damageArma);

                balaMag.disparar(Math.cos(super.getAngle()) , Math.sin(super.getAngle()), this.rotation);

            }
            else{

                this.effectShoot.play();

                //se crea una bala dentro del grupo de balas y se le aplica la velocidad y angulo
                var bala = this.scene.grupoBalas.get(this.x, this.y, 'bala', this.damageArma);
                if (bala)
                {
                    bala.disparar(Math.cos(super.getAngle()) , Math.sin(super.getAngle()))
                }
                this.player.disparosAmmo--;
                
            }

            this.elapsedTime = 0;
    
            if(this.key == this.player.getCurrentWeaponName()){
                this.player.gainPersonalityExp(1);
            }
            
        }   
    }

    preUpdate()
    {
        super.update(true);
        if (this.active && this.clickDown)
        {
            this.tryAttack()
        }
    }
}