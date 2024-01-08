

export default class municionBalas extends Phaser.GameObjects.Sprite{

constructor(scene, x, y, key){

    super(scene, x, y, key);

    this.key = key;

    this.ammoDuration = 30

    this.setScale(1.5, 1.5);

    this.scene.physics.add.existing(this);

    //se hace un timer para que la municion se destruya si no se coge en un tiempo específico
    scene.time.addEvent({
        delay: this.ammoDuration * 1000,
        callback: this.destroyMyself,
        callbackScope: this,
    })

}

destroyMyself(){
    this.destroy();
}

}