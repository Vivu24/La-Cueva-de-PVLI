export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
    }

    init(data) {
        
    }

    create() {
        this.gameCompleted = false;
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
            this.spaceship.x,
            this.spaceship.y - 40,
            "Score",
            {
                fontFamily: 'suikaFont',
                fontSize: 10,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);
    }

    updateHUD(){
        this.score.destroy();
        this.score = this.add.text(
            this.spaceship.x,
            this.spaceship.y - 40,
            "Score",
            {
                fontFamily: 'suikaFont',
                fontSize: 10,
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
