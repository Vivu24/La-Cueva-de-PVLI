
export default class explosive extends Phaser.GameObjects.Sprite{


    constructor(scene, x, y, key, nTipo){

        super(scene, x, y, key);

        //Añadidos a la escena

        this.scene.add.existing(this);

        this.scene.addExplosiveToGroup(this);

        this.setScale(1.5, 1.5);

        //Fisicas

        this.scene.physics.add.existing(this);

        this.body.setSize(5, 5);

        //Inicializacion de variables
  
        //duracion del overlap de la explosion
        this.explotionDuration = 2;

        //booleano que detecta si ya has implosionado una vez para destruirse pasado el elapsed
        //evitando asi que se destruya antes de entrar en contacto
        this.exploting = false;

        this.damage = 20;

        //area del overlap que genera la explosion
        this.explosiveArea = 100;

        this.elapsedTime = 0;

        //de nuevo timer para calcular delta time

        this.event = this.scene.time.addEvent({
        delay: 1000,
        callback: this.calculateElapsedTime,
        callbackScope: this,
        loop: true

        })

        this.effectExplotion = this.scene.sound.add('explosionEffect', {loop: false, volume: 0.3});

        //colision entyre los enemigos y la mina para que se detone
        this.scene.physics.add.collider(this, this.scene.grupoEnemigos, function(explosive, enemy){

            this.effectExplotion.play();
            explosive.detonar();

        }, null, this);

    }

    destroyMyself(){

        this.zone.destroy();
        this.destroy();

    }

    calculateElapsedTime(){

        this.elapsedTime += 1;

    }

    //metodo que detona el explosivo creando una zona que le hace un daño especifico a los enemigos
    //esta implementado para que todas las explosiones hagan el mismo daño
    detonar(){
        this.body.destroy();

        this.exploting = true;

        this.play('explosionAnimation');

        //creacion de la zona
        this.zone = this.scene.add.zone(this.x, this.y, this.explosiveArea, this.explosiveArea);
        this.scene.physics.world.enable(this.zone);
        this.zone.body.setCircle(this.explosiveArea / 2);

        //añadir collider a la zona
        this.scene.physics.add.overlap(this.zone, this.scene.grupoEnemigos, function(zone, enemy){

            enemy.receiveDamage(10);
            enemy.gainExplosiveState(this.explotionDuration);

        }, null, this);

        this.elapsedTime = 0;
    }

    update(){

        if(this.elapsedTime >= this.explotionDuration && this.exploting == true){
            this.destroyMyself();
        }

    }


}