import Spawner from "./Spawner.js";
import Fruit from "./Fruit.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.points = 0;
    }

    init(data) {
        
    }

    create() {
        this.initializeScene();
        
    }

    initializeScene(){
        this.gameCompleted = false;
        this.score = 0;
        this.HUD();

        this.currentFruitNumber = Phaser.Math.Between(1, 4)
        this.nextFruitNumber = Phaser.Math.Between(1, 4)

        const limitHeight = 200;
        
        // Creamos limit
        this.limit = this.add.image(this.cameras.main.centerX, limitHeight, "limit");

        this.spawner = new Spawner(this, this.cameras.main.centerX, limitHeight);
    }

    generateRandomFruit(){
        const fruit = new Fruit (this, this.spawner.x, this.spawner.y, this.currentFruitNumber)
    }

    update() {
        this.checkCollision();
        this.updateHUD();
    }

    checkCollision(){

    }

    goToTitle() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    HUD(){
        this.score = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 350,
            "Score: " + this.points,
            {
                fontFamily: 'suikaFont',
                fontSize: 50,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    updateHUD(){
        this.score.destroy();
        this.score = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 350,
            "Score: " + this.points,
            {
                fontFamily: 'suikaFont',
                fontSize: 50,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    victoryAnimation() {
        this.gameCompleted = true;

        this.time.delayedCall(2000, () => {

        }, [], this);

        // Agregar un retraso de 5 segundos antes de saltar al menú
        this.time.delayedCall(5000, this.goToTitle, [], this);
    }

}
