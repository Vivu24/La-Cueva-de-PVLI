export default class inventoryBar extends Phaser.GameObjects.Container{

    constructor( scene, x, y, player){
    
        super(scene, x, y);
        this.x = x
        this.y = y

        //creacion de la barra de slots
        this.Bar = this.scene.add.sprite(x, y, 'inventoryYellow').setScrollFactor(0).setDepth(5);

        //slot amarillo que marca lo seleccionado
        this.slotSel = this.scene.add.sprite(x - 54, y, 'slot').setScrollFactor(0).setDepth(5);

        //iconos de los slots
        this.Icon1 = this.scene.add.sprite(x - 64, y, 'fist').setScrollFactor(0).setAngle(-45).setDepth(5);

        this.Icon2 = this.scene.add.sprite(x, y, 'bate').setScrollFactor(0).setAngle(-45).setDepth(5);

        this.Icon3 = this.scene.add.sprite(x + 64, y, 'espada').setScrollFactor(0).setAngle(-45).setDepth(5);

        this.Bar.setScale(3.5, 3.5);

        this.slotSel.setScale(3.5, 3.5);
    
        this.player = player;

        this.currentSelection = this.Icon1;
    
        scene.add.existing(this.Bar);
    
    }

    changeIcons(currentPersonality){
        
        //dada una personalidad cambia los iconos y el color de la barra de slots
        if(currentPersonality == 0){
            this.Bar.setTexture('inventoryPurple');
            this.Icon1.setTexture('muro');
            this.Icon2.setTexture('mina');
            this.Icon3.setTexture('c4');
        }
        else if(currentPersonality == 2){
            this.Bar.setTexture('inventoryBlue');
            this.Icon1.setTexture('pistola');
            this.Icon2.setTexture('metralleta');
            this.Icon3.setTexture('franco');
        }
        else if(currentPersonality == 1){
            this.Bar.setTexture('inventoryYellow');
            this.Icon1.setTexture('fist');
            this.Icon2.setTexture('bate');
            this.Icon3.setTexture('espada');
        }
        else if(currentPersonality == 3){
            this.Bar.setTexture('inventoryGreen');
            this.Icon1.setTexture('paralizador');
            this.Icon2.setTexture('empuje');
            this.Icon3.setTexture('varita');
        }

    }

    //cambia el slot amarillo de sitio segun la arma escogida
    changeSelection(currentWeapon){

        if(currentWeapon == 0){
            this.slotSel.x = this.x - 54;
        }
        else if(currentWeapon == 1){
            this.slotSel.x = this.x + 4;
        }
        else if(currentWeapon == 2){
            this.slotSel.x = this.x + 64;
        }

    }

    //Pilla el cooldown actual y lo compara con el total para cambiar la transparencia del slot seleccionado
    preUpdate(t, dt){

        this.slotSel.alpha = 1 - (this.player.getWeapon().getCurrentCooldown() * 1) / this.player.getWeapon().getCooldownTime();

    }
    
    
    
    
}