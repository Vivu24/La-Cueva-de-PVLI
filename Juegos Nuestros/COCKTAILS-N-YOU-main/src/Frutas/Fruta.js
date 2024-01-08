export default class Fruta extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        // Añadir a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Gravedad para que caiga
        this.setGravityY(150);

        // Manejamos escala y collider para que coincida con el sprite
        this.setScale(0.3);
        this.body.setSize(150, 150);
        this.body.setOffset(0, 0);

        
        this.x = x;
        this.y = y;
        this.type = type;
    }
    create(){
        this.frutasSound = this.sound.add('frutas',{volume: 0.50});

        this.frutasSound.play();
    }
    getType(){
        return this.type
    }
}