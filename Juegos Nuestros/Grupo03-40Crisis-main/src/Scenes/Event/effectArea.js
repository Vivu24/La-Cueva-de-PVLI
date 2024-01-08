export default class effectArea extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key, tiempoActivo, scale){
        super(scene, x, y, key)
        this.key = key;

        this.setDepth(0)
        scene.add.existing(this)
        this.scene.physics.add.existing(this);

        
        this.setScale(scale)

        scene.physics.add.overlap(this, this.scene.mike, ()=>{
            this.scene.mike.applyEffect(this.key)
        })

        scene.physics.add.overlap(this, this.scene.grupoEnemigos,(effArea, enemigo)=>{
            enemigo.applyEffect(this.key)
        })

        scene.time.delayedCall(tiempoActivo, ()=>{
            this.setScale(2) 
            this.play('enemydeath', true);
            this.body.destroy()
            this.on('animationcomplete', this.destroyMyself )
        });
    }

    destroyMyself()
    {
        this.off('animationcomplete')
        this.destroy()
    }
}