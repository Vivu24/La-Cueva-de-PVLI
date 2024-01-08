import HealthBar from "./healthBar.js";
import inventoryBar from "./inventoryBar.js";
import personalityWheel from "./personalityWheel.js";

export default class UIManager extends Phaser.GameObjects.Container{


//Constructor de la clase UImanager
constructor(scene, key, player){

    super(scene, 0, 0);

    this.scene = scene;

    this.player = player;

    this.healthBar = new HealthBar(scene, 24, 16, player, 341, 32).setScrollFactor(0).setDepth(5);

    this.inventoryBar = new inventoryBar(scene, 1075, 650, player).setScrollFactor(0);

    this.personalityWheel = new personalityWheel(scene, 1100, 100, player).setScrollFactor(0);

    this.key = key;

    this.totalPoints = 0;

    scene.add.existing(this);

    this.ScoreLabel = this.scene.generateText(0, 650, 'Score: ', 32);
    this.ScoreLabel.setScrollFactor(0).setDepth(5);

    this.RoundLabel = this.scene.generateText(500, 650, 'Round: ', 32);
    this.RoundLabel.setScrollFactor(0).setDepth(5);

    this.AmmoLabel = this.scene.generateText(1000, 575, 'Ammo: ', 24);
    this.AmmoLabel.setScrollFactor(0).setDepth(5);

}

changeInventory(currentPer){
    this.inventoryBar.changeIcons(currentPer);
}

changeInventorySelect(currentWea){
    this.inventoryBar.changeSelection(currentWea);
}


//update de los puntos en la pantalla
gainPoints(points){

    this.totalPoints += points;

    this.ScoreLabel.text = 'Score: ' + this.totalPoints;

    this.scene.tweens.add({
        targets: this.ScoreLabel,
        scale: 1.5,
        duration: 500,
        ease: 'Sine.easeInOut',
        yoyo: true, // Hace que la animación se repita en sentido inverso
        repeat: 0 // Repite infinitamente
    });
}

//update del numero de la ronda 
updateRounds(currentRound) {
    
    this.RoundLabel.text = 'Round: ' +  currentRound;
    currentRound++;
    this.scene.tweens.add({
        targets: this.RoundLabel,
        scale: 1.5,
        duration: 500,
        ease: 'Sine.easeInOut',
        yoyo: true, // Hace que la animación se repita en sentido inverso
        repeat: 0 // Repite infinitamente
    });

}

preUpdate(t, dt){

    this.healthBar.preUpdate(t, dt);

    this.inventoryBar.preUpdate(t, dt);

    if(this.AmmoLabel.visible){
        this.AmmoLabel.text = 'Ammo X ' + this.player.getAmmo();
    }
    

    if(this.player.getCurrentPersonality() == this.player.Personalities.CENTINELA){
        this.AmmoLabel.visible = true;
    }
    else{
        this.AmmoLabel.visible = false;
    }


}


}