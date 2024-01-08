export default class icecube extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'icecube');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(275, 275);
        this.setScale(0.25);
    }
    
    // Supongo q tendremos q poner el update
}
