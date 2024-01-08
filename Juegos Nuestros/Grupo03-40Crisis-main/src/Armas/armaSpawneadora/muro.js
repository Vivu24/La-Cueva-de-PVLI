

export default class muro extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, key, player){

        super(scene, x, y, key);

        this.scene.add.existing(this);

        //indica si el muro a muerto
        this.death = false;

        //vida que tiene el muro
        this.life = 30;

        //area en la cual atrae enemigos para que lo golpen
        this.atractionArea = 75;

        this.player = player

        //zona de atraccion
        this.zone = this.scene.add.zone(this.x, this.y, this.atractionArea, this.atractionArea);
        this.scene.physics.world.enable(this.zone);
        this.zone.body.setCircle(this.atractionArea / 2);

        this.overlapObject = this.scene.physics.add.overlap(this.scene.grupoEnemigos, this.zone, function(enemy, zone){
            enemy.changeObjetive(this);
        }, null, this)

    }

    //recibe el daño para restarselo a la vida
    receiveDamage(damage){
        if(!this.death){
            this.life -= damage;
    
            if(this.life <= 0){
                this.die();
            }
        }
        
    }

    //da su punto central para que los enemigos sepan donde atacar
    getCenterPoint(){
        return {x: this.x + 16, y: this.y + 16};
    }

    //a todos los enemigos que esten en su zona les vuelve a poner el jugador como objetivo a atacar
    die(){
        this.death = true;

        this.overlapObject.destroy();

        //overlap para cambiar a los enemigos de objetivo
        this.scene.physics.add.overlap(this.scene.grupoEnemigos, this.zone, function(enemy, zone){
            enemy.changeObjetive(this.player);
        }, null, this)

        //da un tiempo para que se aplique a todos los enemigos dicho cambio
        this.scene.time.addEvent({
            delay: 500,
            callback: this.destroyMyself,
            callbackScope: this,
            loop: false
        })

    }

    destroyMyself(){
        this.zone.destroy();
        this.destroy();
    }

}