import Spawner from "./Spawner.js";
import Fruit from "./Fruit.js";

export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });

        this.gameCompleted = false;
        this.points = 0;
        this.limitHeight = 200;
    }

    init(data) {
        
    }

    create() {
        this.initializeScene();        
    }

    initializeScene(){
        // Paramos el audio
        this.sound.stopAll();
        // Cargamos la Música
        this.music = this.sound.add('music', { loop: true, volume: 0.5 });
        // Empezamos la Música
        this.music.play();

        this.matter.world.setBounds();
        this.gameCompleted = false;
        this.score = 0;
        this.HUD();

        this.generateData();

        this.currentFruitNumber = 1;
        this.nextFruitNumber = 2;
                
        // Creamos limit
        this.limit = this.add.image(this.cameras.main.centerX, this.limitHeight, "limit");

        let nextText = this.add.text(
            (this.cameras.main.centerX / 2) * 3 - 50,
            this.cameras.main.centerY - 350,
            'Next:',
            {
                fontFamily: 'suikaFont',
                fontSize: 50,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        this.initializeSpawner();

        this.fruitsPool = [];

        this.fruitsCollisionLogic()
        
    }
    getFruitData(key)
    {
        let data = {
            key: key,
            scale: this.fruitScale.get(key),
            radius: this.radius.get(key),
            offsetX: this.offsetX.get(key),
            offsetY: this.offsetY.get(key)
        }

        return data;
    }  

    initializeSpawner(){
        this.spawner = new Spawner(this, this.cameras.main.centerX, this.limitHeight - 50, this.currentFruitNumber);
        this.spawner.initializeTexture(this.fruitScale.get("fruit1"))
    }
    
    updateSpawner(){
        const fruitKey = 'fruit' + this.currentFruitNumber;
        const fruitData = this.getFruitData(fruitKey);
        const scale = this.fruitScale.get(fruitKey);
    
        this.spawner.changeTexture(scale);
    }
    
    generateRandomFruit() {
        const fruitKey = 'fruit' + this.currentFruitNumber;
        const fruitData = this.getFruitData(fruitKey);
        const scale = this.fruitScale.get(fruitKey);


        const fruit = new Fruit(
            this,
            this.spawner.x,
            this.spawner.y,
            this.currentFruitNumber,
            fruitData,
            scale
        );

        this.fruitsPool.push(fruit);

        this.currentFruitNumber = this.nextFruitNumber;
        this.updateSpawner();
        this.nextFruitNumber = Phaser.Math.Between(1, 4);
    }

    update() {
        this.updateHUD();
    }

    goToTitle() {
        // Saltar a la escena del Título
        this.scene.start("Title");
    }

    HUD(){
        this.score = this.add.text(
            this.cameras.main.centerX / 2,
            this.cameras.main.centerY - 350,
            "Score: " + this.points,
            {
                fontFamily: 'suikaFont',
                fontSize: 50,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        this.nextFruitImage = this.add.image((this.cameras.main.centerX / 2) * 3 + 50, this.cameras.main.centerY - 350, "fruit" + this.nextFruitNumber);
        this.nextFruitImage.setScale(0.25);
    }

    updateHUD(){
        this.score.destroy();
        this.score = this.add.text(
            this.cameras.main.centerX / 2,
            this.cameras.main.centerY - 350,
            "Score: " + this.points,
            {
                fontFamily: 'suikaFont',
                fontSize: 50,
                color: 'White',
            }
        ).setOrigin(0.5, 0.5);

        this.nextFruitImage.destroy();
        this.nextFruitImage = this.add.image((this.cameras.main.centerX / 2) * 3 + 50, this.cameras.main.centerY - 350, "fruit" + this.nextFruitNumber);
        this.nextFruitImage.setScale(0.25);
    }

    checkLimit() {
        console.log("CheckLimit");
    
        for (let i = 0; i < this.fruitsPool.length; i++) {
            const fruit = this.fruitsPool[i];
    
            // Solo realiza la comprobación si la fruta no está congelada y no está muerta
            if (!fruit.isDead && fruit && fruit.y !== undefined) {
                // Ajusta la condición para verificar si al menos la mitad del cuerpo está por encima del límite
                const halfBodyHeight = fruit.body.circleRadius * fruit.scaleY * 0.5;
                if (fruit.y + halfBodyHeight <= this.limitHeight) {
                    this.gameCompleted = true;
                    this.finishAnimation();
                    break; // Rompemos el bucle, ya que solo necesitamos activar la animación una vez
                }
            }
        }
    }
    
    

    finishAnimation() {
        this.levelConclusionText("Fail")
        // Agregar un retraso de 5 segundos antes de saltar al menú
        this.time.delayedCall(5000, this.goToTitle, [], this);
    }

    levelConclusionText(resolution) {
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            resolution,
            {
                fontFamily: 'suikaFont',
                fontSize: 100,
                color: 'White'
            }
        ).setOrigin(0.5, 0.5);
    }

    fruitsCollisionLogic() {
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
                
                // Verifica si ambos cuerpos son instancias de la clase Fruit
                if (bodyA.gameObject instanceof Fruit && bodyB.gameObject instanceof Fruit) {
                    const fruitA = bodyA.gameObject;
                    const fruitB = bodyB.gameObject;
    
                    // Verifica si tienen el mismo número y si no están muertas
                    if (fruitA.number === fruitB.number && !fruitA.isDead && !fruitB.isDead && fruitA.number != 11) {
                        // Marca las frutas originales como muertas y destrúyelas
                        const auxX = (fruitA.x + fruitB.x) / 2;
                        const auxY = (fruitA.y + fruitB.y) / 2;
                        const auxN = fruitA.number + 1;
                        const fruitKey = 'fruit' + auxN;
                        const fruitData = this.getFruitData(fruitKey);
                        const scale = this.fruitScale.get(fruitKey);

                        fruitA.isDead = true;
                        fruitB.isDead = true;
                        fruitA.destroy();
                        fruitB.destroy();

                        const mergedFruit = new Fruit(
                            this,
                            auxX,
                            auxY,
                            auxN,
                            fruitData,
                            scale
                        );
                
                        this.fruitsPool.push(mergedFruit);

                        this.points += (auxN - 1) * 10;
                    }
                }
            });
        });
    }    

    generateData()
    {
        this.fruitScale = new Map([
            ['fruit1', 0.112],['fruit2', 0.15],['fruit3', 0.2],
            ['fruit4', 0.25],['fruit5', 0.35],['fruit6', 0.43],
            ['fruit7', 0.5],['fruit8', 0.58],['fruit9', 0.75],
            ['fruit10', 0.8],['fruit11', 1]
        ])
        this.radius = new Map([
            ['fruit1', 110],['fruit2', 135],['fruit3', 135],
            ['fruit4', 125],['fruit5', 140],['fruit6', 145],
            ['fruit7', 140],['fruit8', 146],['fruit9', 125],
            ['fruit10', 141],['fruit11', 147]
        ])
        this.offsetX = new Map([
            ['fruit1', -0.02],['fruit2', 0],['fruit3', 0],
            ['fruit4', 0],['fruit5', 0],['fruit6', 0],
            ['fruit7', 0],['fruit8', -0.007],['fruit9', 0],
            ['fruit10', 0],['fruit11', 0]
        ])
        this.offsetY = new Map([
            ['fruit1', 0.11],['fruit2', 0.02],['fruit3', 0.02],
            ['fruit4', 0.05],['fruit5', 0.035],['fruit6', 0.025],
            ['fruit7', 0.027],['fruit8', -0.01],['fruit9', 0.07],
            ['fruit10', 0],['fruit11', 0]
        ])
        
        this.offsetFromBorders = new Map([
            ['fruit1', 12],['fruit2', 18],['fruit3', 25],
            ['fruit4', 30],['fruit5', 46]
        ])

        this.numberFromString = new Map([
            ['fruit1', 1],['fruit2', 2],['fruit3', 3],
            ['fruit4', 4],['fruit5', 5],['fruit6', 6],
            ['fruit7', 7],['fruit8', 8],['fruit9', 9],
            ['fruit10', 10],['fruit11', 11]
        ])
    }
}
