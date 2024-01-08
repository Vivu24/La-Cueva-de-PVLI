
export default class cepo extends Phaser.GameObjects.Sprite {

constructor(scene, x, y, key, player){

    super(scene, x, y, key);

    this.player = player;

    //tiempo que tarda en eliminarse el cepo de pantalla
    this.paraliceTime = 5;

    //sprite del cepo
    this.cepo = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);

    this.setScale(0.2, 0.2);

    this.key = key;

    this.scene.add.existing(this);

    this.scene.physics.add.existing(this);

    this.body.setSize(32, 32);

    //la colision le aplica el efecto de vivu al jugador
    this.scene.physics.add.collider(this.player, this, (player, cepo)=>{

        player.applyEffect("vivu");
        this.scene.physics.world.disable(this);
        cepo.destroyAfterTime();

    })


}

destroyAfterTime(){

    this.scene.time.addEvent({

        delay: this.paraliceTime * 1000,
        loop: true,
        callback: this.destroyMyself,
        callbackScope: this
    })

}

destroyMyself(){
    this.destroy();
}




}