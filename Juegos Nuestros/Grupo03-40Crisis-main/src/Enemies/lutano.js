import EnemigoBasico from "./enemigoBasico.js";
import cepo from "./cepo.js";

export default class lutano extends EnemigoBasico{

constructor(scene, x, y, key, player, config){

    super(scene, x, y, key, player, config)

    this.spawnTime = 30;

    this.elapsedTime = 0;

    //timer event que spawnea un cepo cada x segundos determinado
    this.spawnCepoEvent = this.scene.time.addEvent({ // Guardar el evento en una variable
        delay: this.spawnTime * 1000,
        loop: true,
        callback: this.spawnCepo,
        callbackScope: this
    });
    
}

//crea un cepo en la posicion que esta el lutano
spawnCepo(){

    if (this.alive) { // Verificar si el lutano está vivo antes de spawnear un cepo
            this.cepo = new cepo(this.scene, this.x, this.y, "cepo", this.player);
            this.scene.add.existing(this.cepo);
    }

}


update(){

    super.update();

}

}