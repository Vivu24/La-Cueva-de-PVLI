export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
    }

    init(data) {
        this.amountOfPlayers = data.nPlayers || 0;
    }

    create() {
        this.gameCompleted = false;
        //this.HUD();
        this.background = this.add.image(0, this.cameras.main.height, "background").setOrigin(0, 1);
        this.table = this.add.image(80, this.cameras.main.height - 30, "table").setOrigin(0, 1);
        this.numbers = this.add.image(350, this.cameras.main.height/2 + 50, "score").setOrigin(0, 1);

    }

    update() {
        this.checkCollision();
        //this.updateHUD();
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
