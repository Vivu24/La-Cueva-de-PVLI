

export default class paralizador extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, key, player){

        super(scene, x, y, key);

        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);

        this.body.setSize(8, 8);


        this.player = player

        //hace un overlap con su body para que el primer enemigo que lo pise se le aplique el efecto de vivu
        this.overlapObject = this.scene.physics.add.overlap(this.scene.grupoEnemigos, this, function(enemy, zone){
            enemy.applyEffect('vivu');
            this.scene.physics.world.disable(this);
            this.destroyMyself();
        }, null, this)

    }

    destroyMyself(){
        this.destroy();
    }


}