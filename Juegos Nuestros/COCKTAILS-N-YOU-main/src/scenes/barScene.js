import Player from "./player.js";
import Customer from "./customer.js"
import InteractiveItem from "./interactiveItem.js";
import { intItems } from "../Cocktails.js";
import { dialogues } from "../Dialogues.js";
import { cocktails } from "../Cocktails.js";
import { fruits } from "../Cocktails.js";
import { alcoholicDrinks } from "../Cocktails.js";
import { refreshments } from "../Cocktails.js";
import { others } from "../Cocktails.js";
import { setMM, checkExitLevel, currentminigame, setAlcohol, setFruit, setMinigame, setOther, setRefreshment, unlockNextLevel, addCurrentCustomer, addMinigame, addMaxMinigames, checkCustomer, resetSceneStats, numCustomers, currentCustomers, setCustomerList, customerList, calculateCustomerStarts, resetCustomerList, setCanUnlockLevel } from "./GameManager.js";
import PauseMenu from "./PauseMenu.js";


export default class barScene extends Phaser.Scene {
    constructor() {
        console.log("constructor")
        // super(/*customersQuantity,*/ {key: "BarScene"}); --> cuando metamos varios npcs 
        super({ key: 'barScene' });
        
        this.customerSpawn = {x :600 , y: 600}
        this.customerDestiny = {x: 300, y: 325}
        this.playerSpawn = {x: 300, y: 100}

        //Cabiar cuando tenga el tile map hecho ;P
        this.cloudPos = {x: 500, y: 450}

        this.dialogueCreated = false;
        this.dialogueShown = false;
        this.itemsCreated = false;
        this.itemList = []
        this.allCreated = false;
        this.allPlayed = false;
        this.customers = []
        this.desiredCocktail = undefined
        this.fail = false;
    }
    create() {

        // Añadimos la música
        this.music = this.sound.add('CanonInD', { loop: true, volume: 0.75 });
        this.paddleHitSound = this.sound.add('boing',{volume: 0.50});
        this.borderHitSound = this.sound.add('reboundWall',{volume: 0.50});
        this.blockDestroySound = this.sound.add('destroy',{volume: 0.50});
        // Reproduce la música
        this.music.play();

        //Pausa
        this.player = new Player(this, this.playerSpawn.x, this.playerSpawn.y);
        this.player.setCollideWorldBounds(true)
        this.createTileMap()
        if(this.customers.length === 0){
            var i = 0
            while(i < numCustomers){
                this.generateRandomCustomer()
                i++
            }
            setCustomerList(this.customers)
        }
          
        
        
        console.log(currentCustomers)
        console.log(numCustomers)
        console.log(this.customers)
        console.log(customerList)
        this.customer = this.customers[currentCustomers]
        console.log(this.customer)

        this.customerType = this.customer.type
        this.dialogue = this.customer.dialogue
        
        //Pausar
        if(!this.pauseScene)
        this.pauseScene = this.scene.add('PauseMenu', PauseMenu, false);
       
        // this.input.keyboard.on('keydown-ESC', () => {
        //     // Pausar el juego y mostrar el menú de pausa
        //     this.sound.pauseAll();
        //     this.scene.pause();
        //     this.scene.launch('PauseMenu');
        // });
        // Audio customer
        this.pipipibu = this.sound.add('pipipibu', { volume:1});
//mbappe
        this.eladio = this.sound.add('eladiomusic', {    volume: 0.35 });
        this.radio = this.add.image(70,335,'radio');
        this.radio.setDepth(5);
        this.radio.setInteractive();
        this.radio.setScale(0.2);
        this.isplaying = false;
        this.radio.removeAllListeners('pointerdown')
        this.radio.on('pointerdown',  (pointer)=> {
            
            if (pointer.leftButtonDown()) {
                if (!this.isplaying) {
                    // Pausa la música actual
                    this.music.pause();
                    this.eladio.play();
                    this.isplaying = true;
                } else {
                    this.eladio.stop();
                    this.music.play();
                    this.isplaying = false;
                }
            }
            // Se ha hecho clic izquierdo en la imagen
        });
        //Se agregan fisicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        //intancia el player

        

        this.guide = this.add.image(110, 700, 'pistasButton').setDepth(5).setScale(0.2).setInteractive()
        this.interactionGuide()
        this.cocktailSelector = this.add.image(740, 700, 'cocteleraButton').setDepth(5).setScale(0.7).setInteractive().setSize(200, 400)
        this.interactionCocktailSelector()        
    }
    update() {
        if(this.desiredCocktail !== undefined){
            if(!this.allCreated ){
                if(this.desiredCocktail == this.customerType){
                    this.generateCocktail();
                    this.generateItems()
                }else this.fail = true;
                this.allCreated = true;
            }
            
            this.checkExit()
        }
        
        if(this.player){
            if(this.player.cursors.esc.isDown){
                setMinigame('barScene')
                setMM('');
                this.sound.pauseAll();
                this.scene.pause();
                this.scene.launch('PauseMenu');
            }

        }
            
       
        //Pausar el juego
       
        if(this.dialogueShown){
            
            this.dialogueCloud.on("pointerdown", () => {
                this.hideDialogue()
            });
            }
    }
    hover(button, type){
        button.removeAllListeners('pointerdown')
        button.on('pointerdown', ()=> 
            this.desiredCocktail = type
        )
        button.on('pointerover', () => {
            button.setScale(1.5 + 0.2)
        })
        button.on('pointerout', () => {
            button.setScale(1.5)
        })
    }
    
    interactionCocktailSelector(){
        this.cocktailSelector.removeAllListeners("pointerdown");
        this.cocktailSelector.on('pointerdown', ()=> {
            var selectorBackground = this.add.image(400, 300, 'pistasButton').setScale(0.5).setInteractive().setDepth(7)
            var text = this.add.text(155, 10, '¿QUE COCTEL QUIERES HACER?', {
                fontFamily: 'Comic Sans MS', 
                fontSize: 30, 
                color: '#000022',
                fontWeight: 'bold'
                 }).setDepth(8);
            var blueLagoon = this.add.image(290, 170, 'blue_lagoon').setInteractive().setDepth(8).setScale(1.5)
            this.hover(blueLagoon, 'azul')
            var margarita = this.add.image(510, 170, 'margarita').setInteractive().setDepth(8).setScale(1.5)
            this.hover(margarita, 'amarillo')
            var purpleSky = this.add.image(290, 380, 'purple_sky').setInteractive().setDepth(8).setScale(1.5)
            this.hover(purpleSky, 'morado')
            var mojito = this.add.image(510, 380, 'mojito').setInteractive().setDepth(8).setScale(1.5)
            this.hover(mojito, 'verde')
            selectorBackground.on('pointerdown', () => {
                selectorBackground.destroy()
                blueLagoon.destroy()
                margarita.destroy()
                purpleSky.destroy()
                mojito.destroy()
                text.destroy()
            })
        })
        this.cocktailSelector.on('pointerover', ()=> {
            this.cocktailSelector.y = 650
        })
        this.cocktailSelector.on('pointerout', ()=> {
            this.cocktailSelector.y = 700
        })
    }
    interactionGuide(){
        this.guide.removeAllListeners("pointerdown");
        this.guide.on('pointerdown', ()=> {
            var guide = this.add.image(400, 300, 'pistas').setScale(0.5).setInteractive().setDepth(7)
            guide.on('pointerdown', () => {
                guide.destroy()
            })
        })
        this.guide.on('pointerover', ()=> {
            this.guide.y = 650
        })
        this.guide.on('pointerout', ()=> {
            this.guide.y = 700
        })
    }
    generateCocktail(){
        const possibleCocktails = Object.keys(cocktails);
        switch(this.customerType){
            case "morado":
                this.cocktail = cocktails[possibleCocktails[0]];
                break;
            case "verde":
                this.cocktail = cocktails[possibleCocktails[1]];
                break;
            case "azul":
                this.cocktail =cocktails[possibleCocktails[2]];
                break
            case "amarillo":
                this.cocktail = cocktails[possibleCocktails[3]];
                break
        }
    }
    generateItems(){
        //modificar mas tarde, queda crear un archivo de entrada para cada cocktail, que llevara a ciertos minijuegos ...
        Object.entries(intItems).forEach(([id, itemInfo]) => {
            const { key, x, y, rectX, rectY} = itemInfo;
            let activate = true;
            
            if(key == "breakout_item") {
                if(this.cocktail.others == -1) activate = false;
            }
            else if( key == "ices_item"){
                if(this.cocktail.ice == 0) activate = false;
            }
            if(activate) addMaxMinigames()
            this.itemList.push(new InteractiveItem(this, x, y, rectX, rectY , activate, key).setDepth(6));
        });
    }
    generateRandomCustomer() {
        const availableTypes = Object.keys(dialogues);
        var customerType = Phaser.Math.RND.pick(availableTypes);

        const possibleDialogues = dialogues[customerType];
        var dialogue = Phaser.Math.RND.pick(possibleDialogues);

        //Para que no aparezcan skins iguales tan de seguido
        var lastSkin = -1;
        var customerSkin = Phaser.Math.Between(0,2)
        while(customerSkin == lastSkin) {customerSkin = Phaser.Math.Between(0,2)}
        lastSkin = customerSkin
        this.customers.push(new Customer(this, this.customerSpawn.x, this.customerSpawn.y, customerType, dialogue, this.customerDestiny.y, customerSkin))
        
        this.customerCreated = true;
    }
    
    showDialogue(){
        this.pipipibu.play();
        if(!this.dialogueCreated){
            this.printDialogue();
            this.dialogueCreated = true;
        }
        else{
            if(!this.dialogueShown){
                
                this.dialogueCloud.setInteractive();
                this.dialogueCloud.setVisible(true)
                this.dialogueRect.setVisible(true)
                this.dialogueText.visible = true;
            }
        }
        this.dialogueShown = true;
    }
    printDialogue(){
        //Poner
        this.dialogueCloud = this.add.image(this.cloudPos.x, this.cloudPos.y, 'dialogueCloude').setInteractive().setFlipY(true);
        this.dialogueCloud.setScale(1.5)
        this.dialogueRect = this.add.rectangle(this.dialogueCloud.x + 5, this.dialogueCloud.y + (this.dialogueCloud.height/6),
                                                this.dialogueCloud.width/1.05, this.dialogueCloud.height/1.3)
        this.dialogueText = this.add.text(this.dialogueRect.x, this.dialogueRect.y, this.dialogue, { 
            fontFamily: 'Comic Sans MS', 
            fontSize: 20, 
            color: '#000022' });

        // Centrar el texto
        this.dialogueText.setOrigin(0.5, 0.5);
    
        // Ajustar el ancho del texto para que quepa en el rectángulo
        this.dialogueText.setWordWrapWidth(this.dialogueRect.width);
        
    }

    hideDialogue(){
        if (this.audio) {
        this.pipipibu.stop(); 
    }
        this.dialogueCloud.disableInteractive();
        this.dialogueCloud.setVisible(false)
        this.dialogueRect.setVisible(false)
        this.dialogueText.visible = false;
        this.dialogueShown = false;
    }
    createInteractionRect(){
        this.interactionRect = this.add.rectangle(this.customer.x, this.customer.y- 100, 60, 60, 0xffffff) //para mostrar poner 0xffffff al final de los parametros
    }

    //Comprobacion de overlap entre un objeto(x,y) y un rect
    onTriggerEnter(x,y, rect){
        
            if((x > (rect.x - rect.width/2) && x < (rect.x + rect.width/2)) && (y > (rect.y - rect.height/2) && y < (rect.y + rect.height/2))){
                return true;
            }else return false;
        
    }
    checkInteractions(x, y){
        //Checkear con customer
        if(this.customer.arrived()){
            if(this.onTriggerEnter(x, y, this.interactionRect)) this.showDialogue();
        }
        //ForEach de lista de items 
        this.itemList.forEach(item => {
            if(item.canInteract){
                if(this.onTriggerEnter(x, y, item.rect)) {
                    this.scene.pause()
                    this.pipipibu.stop();
                    switch (item.key){
                        case "breakout_item": 
                            setOther(others[this.cocktail.others]);
                            item.unsetInteractive();
                            setMinigame('Breakout');
                            setMM('Mb');
                            this.scene.launch('Breakout')
                            break
                        case "ices_item":
                            item.unsetInteractive();
                            setMinigame('Hielos');
                            setMM('Mh');
                            this.scene.launch("Hielos")    
                            break
                        case "platforms_item":
                            setRefreshment(refreshments[this.cocktail.refreshment])
                            item.unsetInteractive();
                            setMM('Mr');
                            setMinigame('refrescos');
                            this.scene.launch('refrescos')    
                            break
                        case "tree_item":
                            setFruit(fruits[this.cocktail.fruit])
                            item.unsetInteractive()
                            setMinigame('frutas');
                            setMM('Mf');
                            this.scene.launch('frutas')    
                        break
                        case "shoot_item":
                            setAlcohol(alcoholicDrinks[this.cocktail.alcohol])
                            item.unsetInteractive();
                            setMM('Md');
                            setMinigame('Aim');
                            this.scene.launch('Aim')    
                        break
                    }
                }
            }
            
        })

    }
    createTileMap(){

        this.createObstacle(400, 300, 'obstacle1', 800, 100, 0);  
        this.createObstacle(105, 0, 'obstacle2', 160, 150, 0);  
        this.createObstacle(360, 0, 'obstacle3', 160, 150, 0);
        this.createObstacle(775, 0, 'obstacle4', 160, 115, 0);  


        this.obstacles = [this.obstacle1, this.obstacle2, this.obstacle3,  this.obstacle4];
        this.physics.add.collider(this.player, this.obstacles);


        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        // Tilemap
        let map = this.make.tilemap({ 
            key: "barTiled",
            tileWidth: 32,
            tileHeight: 32
        });

        let floor = map.addTilesetImage("floorTiles", "floor");
        let barObjects = map.addTilesetImage("tilesetBar", "barObjects", 32, 32);

        // Capas del mapa
        let groundLayer = map.createLayer("Suelo", floor);
        let objectsLayer = map.createLayer("Objetos", barObjects);
        let wallLayer = map.createLayer("Pared", barObjects);
        let woodLayer = map.createLayer("Muebles", barObjects);

        //this.objectsLayer.setCollisionByExclusion([-1], true);
        //this.wallLayer.setCollisionByExclusion([-1], true);

        // Profundidad de las capas
        groundLayer.setDepth(0);
        woodLayer.setDepth(1)
        wallLayer.setDepth(4);
        objectsLayer.setDepth(5);

        // Colisiones del Player con la escena
        //this.physics.add.collider(this.player, wallLayer);
        //this.physics.add.collider(this.player, objectsLayer);

        this.player.setDepth(3); // Ajusta la profundidad del jugador según sea necesario

        
    
    }

    createObstacle(x, y, key, width, height, rotation) {
        const obstacle = this.add.sprite(x, y, key);
        this.physics.world.enable([obstacle]);
        obstacle.body.setAllowGravity(false);
        obstacle.body.setImmovable(true);
        obstacle.body.setSize(width, height);
        obstacle.setRotation(Phaser.Math.DegToRad(rotation));
        this.physics.add.collider(this.player, obstacle)
    
        this[key] = obstacle;
    }

    checkExit(){
        if(checkCustomer() || this.fail){
        this.customerCompleted()}
    }
    customerCompleted(){
            addCurrentCustomer()
            calculateCustomerStarts()
            if(checkExitLevel()) {
                this.exitScene()
            }
            else {
                resetSceneStats()
                this.restartScene()
            }
    }
    exitScene(){
        if(!this.fail) setCanUnlockLevel(true)
        this.resetStats()
        this.scene.stop()
        this.scene.start('Stars')
    }
    restartScene() {
        // Detener sonidos si están reproduciéndose
        this.pipipibu.stop();
        this.eladio.stop();

        this.resetStats()
        this.scene.restart()
    }
    resetStats(){
        this.customers = []
        resetCustomerList()
        this.fail = false;
        this.itemList = []
        this.obstacles = []
        this.dialogueCreated = false;
        this.dialogueShown = false;
        this.itemsCreated = false;
        this.allCreated = false;
        this.allPlayed = false;
        this.desiredCocktail = undefined
        if(this.guide){
            this.guide.destroy()
        }
        if(this.interactionGuide){
            this.cocktailSelector.destroy()
        }
        if (this.dialogueCloud) {
            this.dialogueCloud.destroy();
        }
    }
}
