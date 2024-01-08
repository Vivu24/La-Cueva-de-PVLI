/**
 * Clase que representa a un personaje en pantalla.
 * @extends Container
 */
export default class Character extends Phaser.GameObjects.Container {
	/**
	 * Contructor del personaje
	 * @param {Scene} scene, escena en la que aparece
     * @param {number} x - posición X
	 * @param {number} y - posicion Y
	 * @param {String} nombre - nombre del personaje
	 * @param {int} num - indice del personaje en el diccionario
     * @param {Sprite} sprite - identificador del sprite que se usará
     * @param {bool} focus - si estan hablando en el instante actual
	 */
    constructor(scene, x, y, sprite, nombre, num) {
        super (scene, x, y);
        this.add(sprite);
        this.scene = scene;
        this.sprite = sprite;
        this.nombre = nombre;
        this.index = num;
        this.sprite.setBlendMode(Phaser.BlendModes.DARKEN);
        this.onUnfocus(); // por defecto siempre aparecen oscuros
        scene.add.existing(this);
    }

    /**
     * el personaje habla (añade al script de la escena el mensaje correspondiente al final del array)
     * @param {String} mensaje -  pues lo que dice, no te voy a mentir.
     */
    say(mensaje) { 
        this.scene.script.push(this.nombre + ":\n" + mensaje); // blabla
    }

    /**
     * ilumina al personaje
     */
    onFocus() { 
        this.focus = true;
        this.sprite.clearTint(); // sin filtro
    }

    /**
     * oscurece al personaje
     */
    onUnfocus() { 
        this.focus = false;
        this.sprite.setTint(0xbababa); // filtro oscuro
    }

    /**
	 * ilumina a todo el mundo
	 * @param {Character[]} personajes - array de personajes sobre el que cicla para acceder y oscurecerlos.
	 */
    static focusEveryone(personajes) {
        for (let p of Object.values(personajes)) { 
            p.onFocus();
        }
    }
    
    /**
	 * oscurece a todos excepto a quien está hablando
	 * @param {Character[]} personajes - array de personajes sobre el que cicla para acceder y oscurecerlos.
	 */
    unfocusEveryoneElse(personajes) {
        for (let p of Object.values(personajes)) { 
            if (p !== this) { // si es distinto a este
                p.onUnfocus();
            }
        }
    }

    /**
	 * oscurece a todo el mundo, hablante inclusive
	 * @param {Character[]} personajes - array de personajes sobre el que cicla para acceder y oscurecerlos.
	 */
    static unfocusEveryone(personajes){ 
        for (let p of Object.values(personajes)) { 
            p.onUnfocus();
        }
    }


    /////////////////////////////////////
    ////// ENTRADA/SALIDA DE PJS  ///////
    /////////////////////////////////////
    onEnter(personajes) {
        this.setVisible(true);
        this.move(personajes);
    }

    onExit(personajes) {
        this.setVisible(false);
        this.move(personajes);
    }

    static onEnterEveryone(personajes) {
        for (let p of Object.values(personajes)) { 
            p.setVisible(true);
        }
        for (let p of Object.values(personajes)) { 
            if (p.visible)
                p.move(personajes);
        }
    }

    static onExitEveryone(personajes) {
        for (let p of Object.values(personajes)) { 
            p.onExit(personajes);
        }
    }

    move(personajes) {
        let i = 1;
        for (let p of Object.values(personajes)) { 
            if (p.visible) {
                p.setX(p.scene.width * i / (Character.getVisibles(personajes) + 1));
                i++;
            }
        }
    }

    /**
     *  método para saber que personajes hay visibles ahora mismo
     * @param {*} personajes - diccionario de personajes
     * @returns la cantidad de personajes que hay vibiles ahora mismo
     */
    static getVisibles(personajes) {
        let i = 0;
        for (let p of Object.values(personajes)) { 
            if (p.visible) 
                ++i;
        }
        return i;
    }
}
