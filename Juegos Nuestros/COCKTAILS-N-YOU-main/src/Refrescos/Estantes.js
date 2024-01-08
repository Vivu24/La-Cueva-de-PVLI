export default class Estantes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'estante');
        // Añadir a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // El objeto no se mueve con esta funcion
        this.setImmovable(true);

        // Manejamos escala y collider para que coincida con el sprite
        this.setScale(0.4);
        this.body.setSize(290, 75);
        this.body.setOffset(300, 550);
        
        this.x = x;
        this.y = y;
    }
}
