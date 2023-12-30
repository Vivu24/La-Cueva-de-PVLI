export default class Menu extends Phaser.Scene{

    constructor(){
        super({key: 'Menu'});
    }

    create(){
        // Paramos el audio
        this.sound.stopAll();
        
        // Cargamos la Música
        this.music = this.sound.add('menuMusic', {loop: true, volume: 0.5});
        // Empezamos la Música
        this.music.play();


        // Texto del Título
        let title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'CIRCUS', 
        { fontFamily: 'arcade_classic', fontSize: 50 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);


        // Botones
        let buttonEasy = this.add.text(this.cameras.main.centerX, 50 + this.cameras.main.centerY, 'Easy', 
        { fontFamily: 'arcade_classic', fontSize: 25 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);
        buttonEasy.setInteractive();
        buttonEasy.on("pointerdown", () => {
            this.scene.start("Level", { score: 5000 });
        });

        let buttonNormal = this.add.text(this.cameras.main.centerX, 50 + this.cameras.main.centerY + 50, 'Normal', 
        { fontFamily: 'arcade_classic', fontSize: 25 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);
        buttonNormal.setInteractive();
        buttonNormal.on("pointerdown", () => {
            this.scene.start("Level", { score: 10000 });
        });

        let buttonHard = this.add.text(this.cameras.main.centerX, 50 +this.cameras.main.centerY + 100, 'Hard', 
        { fontFamily: 'arcade_classic', fontSize: 25 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);
        buttonHard.setInteractive();
        buttonHard.on("pointerdown", () => {
            this.scene.start("Level", { score: 20000 });
        });

        let buttonSuperEasy = this.add.text(this.cameras.main.centerX, 50 +this.cameras.main.centerY + 150, 'SuperEasy', 
        { fontFamily: 'arcade_classic', fontSize: 25 /*Tamaño*/, color: 'White' }).setOrigin(0.5,0.5);
        buttonSuperEasy.setInteractive();
        buttonSuperEasy.on("pointerdown", () => {
            this.scene.start("Level", { score: 800 });
        });

        

        // Decoración del título
        this.stars = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 150, "stars").setOrigin(0.5,0.5);
        this.stars.setScale(4);
    }

    update(){

    }
}