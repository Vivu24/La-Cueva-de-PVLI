import Arma from "../arma.js"
import explosive from "./explosive.js";
import muro from "./muro.js";
import remoteExplosive from "./remoteExplosive.js";
import paralizador from "./paralizador.js";

export default class armaObjetosSpawneado extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, TiempoCooldown, key, player)
    {
        super(scene, 0, 0, key, player)
        this.scene = scene;

        this.key = key;

        this.enfriamientoTime = TiempoCooldown;

        //variable la cual recoge una cantidad de xperiencia distinta ganada según el objeto que se spawne.
        this.exp = 1;

        this.enfriamientoPasado = true;

        this.elapsedTime = TiempoCooldown;

        //se comprueba que el arma esta activa(la tiene el jugador) y que se a pulsado el click izquierdo para intentar el ataque
        this.scene.input.on('pointerdown', (pointer) =>
        {
            if (this.active && pointer.leftButtonDown()){
                this.tryAttack();
            }
            
        })

        //de nuevo se calcula el elapsed time pero esta vez con un segundo
        this.event = this.scene.time.addEvent({
            delay: 1000,
            callback: this.calculateElapsedTime,
            callbackScope: this,
            loop: true
    
            });

        
        
    }

    calculateElapsedTime(){
        this.elapsedTime += 1;
    }

    tryAttack()
    {

        //se ataca si el tiempo de cooldown se a pasado
        if (this.elapsedTime >= this.enfriamientoTime)
        {

            //segun la key que se quiera instanciar se spawnea un elemento u otro
            if(this.key == 'muro'){
                
                new muro(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'muro', this.player);
                this.exp = 5;
            }
            else if(this.key == 'mina'){
                
                new explosive(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'mina', 0);
                this.exp = 1;
            }
            else if(this.key == 'c4'){
                
                new remoteExplosive(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'c4');
                this.exp = 1;
            }
            else if(this.key == 'paralizador'){
                new paralizador(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'paralizador');
                this.exp = 5;
            }

            //se suma la experiencia al jugador según el objeto que haya spawneado
            if(this.key == this.player.getCurrentWeaponName()){
                this.player.gainPersonalityExp(this.exp);           
            }

            this.elapsedTime = 0;
            
        }   
    }

    preUpdate()
    {
        super.update(true);
    }
}