import EnemigoSpawner from "./enemySpawner.js";

export default class RoundManager extends Phaser.GameObjects.Container {
       /**
    * @param {scene} scene - escena a colocar
    * @param {EnemigoSpawner} spawners - referencia a los spawners
    * @param {number} enemiesPerRound - enemigos por ronda (cada spawner)
    */

    //Constructor del round manager 

    constructor(scene, spawners, initialEnemiesPerRound) {
        super(scene);
        this.spawners = spawners;
        this.enemiesPerRound = initialEnemiesPerRound;
        this.currentRound = 0;
        this.enemiesDefeated = 0;
        this.increasePerRound = 2; // Ajusta según la dificultad deseada
        this.totalEnemiesLeft = (this.enemiesPerRound + this.increasePerRound * this.currentRound) * 4;

    }

    //Metodo que se ejecuta cada vez que se inicia una ronda /cambia de ronda
    startRound() {

        this.enemiesDefeated = 0;

        // Llama a los spawners para que generen la cantidad de enemigos de esta ronda

        if ( this.currentRound == 10) //En la ronda 10 aparece el caracol
        {
            this.scene.enemySpawners(this.enemiesPerRound + this.increasePerRound * this.currentRound);
            this.scene.enemySpawner1.spawnCaracol();
            this.scene.enemySpawner1.spawnMono();
        }
        else if (this.currentRound > 4 && this.currentRound % 5 == 0) //Cada 5 rondas aparece un mono
        {
            this.scene.enemySpawners(this.enemiesPerRound + this.increasePerRound * this.currentRound);
            this.scene.enemySpawner1.spawnMono();
        }
        else 
        {
            this.scene.enemySpawners(this.enemiesPerRound + this.increasePerRound * this.currentRound);
        }

        // Aumenta la ronda actual
        this.currentRound++;
    
        // Actualiza el número de ronda en UIManager
        this.scene.myUI.updateRounds(this.currentRound);
    
       
    }
}