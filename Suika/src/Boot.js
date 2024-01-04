export default class Boot extends Phaser.Scene{

    constructor(){
        super({key: 'Boot'});
    }

    preload(){
        
        this.load.image('fruit1', './assets/sprites/fruit1.png');
        this.load.image('fruit2', './assets/sprites/fruit2.png');
        this.load.image('fruit3', './assets/sprites/fruit3.png');
        this.load.image('fruit4', './assets/sprites/fruit4.png');
        this.load.image('fruit5', './assets/sprites/fruit5.png');
        this.load.image('fruit6', './assets/sprites/fruit6.png');
        this.load.image('fruit7', './assets/sprites/fruit7.png');
        this.load.image('fruit8', './assets/sprites/fruit8.png');
        this.load.image('fruit9', './assets/sprites/fruit9.png');
        this.load.image('fruit10', './assets/sprites/fruit10.png');
        this.load.image('fruit11', './assets/sprites/fruit11.png');

        this.load.image('limit', './assets/sprites/limit.png');

        this.load.audio("music", "./assets/audio/windwood.mp3")
    }

    loadAnimations(){

    }

    create()
    {
        console.log("Boot");
        this.loadAnimations();
        this.scene.start("Title");

    }

    update(){
        
    }
}
