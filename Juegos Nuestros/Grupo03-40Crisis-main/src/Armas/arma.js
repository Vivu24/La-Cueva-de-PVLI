export default class Arma extends Phaser.GameObjects.Sprite {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, x, y, key, player)
    {
        super(scene, x, y, key);
        this.scene.add.existing(this);
        this.player = player;
        this.setScale(1.5);

        this.radio = 0;
        this.cursorX = 0
        this.cursorY = 0
        // tenemos que usar estas dos coordenadas que son del centro de la pantalla (donde esta mike)
        // porque el playerPosX y playerPosY usan coordenadas de la pantalla, no de la escena 
        this.centroPlayerEnPantallaX = 615
        this.centroPlayerEnPantallaY = 420
        this.scene.input.on('pointermove', (pointer) =>
        {
            this.cursorX = pointer.x
            this.cursorY = pointer.y
        })
        
        this.deactivate()
    }

    activate() { 
        this.setActive(true);
        this.setVisible(true); }

    deactivate() { 
        this.setActive(false);
        this.setVisible(false); }

    /**
     * 
     * @param {boolean} canMoveCursor - true si podemos mover el arma con cursor, false si no (por ejemplo durante un ataque melee
     */
    update(canMoveCursor)
    {
        if (canMoveCursor)
            this.followCursor(this.cursorX, this.cursorY);
    }
    
    // funcion que maneja todo el movimiento del arma hacia el cursor
    followCursor(pointerX, pointerY) {
        let playerPos = this.player.getCenterPoint();
        let distanciaCursorPlayer = Phaser.Math.Distance.Between(this.centroPlayerEnPantallaX,this.centroPlayerEnPantallaY,pointerX, pointerY)

        // tenemos el radio mas un valor en función de la distancia para separar un poco el arma del player
        this.radio = 30 + this.mapearValor(distanciaCursorPlayer, 1, 615, 1, 30)
        
        let angle = Phaser.Math.Angle.Between(this.centroPlayerEnPantallaX, this.centroPlayerEnPantallaY, pointerX, pointerY); 
        let newX = playerPos.x + this.radio * Math.cos(angle);
        let newY = playerPos.y + 10 + this.radio * Math.sin(angle);

        // Actualizar la posicion del sprite y su rotacioon
        this.setPosition(newX, newY)
        this.setRotation(angle)
        this.setFlipY(newX < playerPos.x)
    }

    //funcion auxiliar para calcular valores mapeados
    mapearValor(valor, rangoEntradaMin, rangoEntradaMax, rangoSalidaMin, rangoSalidaMax) {
        // Asegurarse de que el valor esté dentro del rango de entrada
        valor = Phaser.Math.Clamp(valor, rangoEntradaMin, rangoEntradaMax);
    
        // Calcular la proporción del valor en el rango de entrada
        let proporcion = (valor - rangoEntradaMin) / (rangoEntradaMax - rangoEntradaMin);
    
        // Mapear la proporción al rango de salida
        let valorSalida = rangoSalidaMin + proporcion * (rangoSalidaMax - rangoSalidaMin);
    
        return valorSalida;
    }

    getRadio() { return this.radio }

    getAngle() { return Phaser.Math.Angle.Between(this.centroPlayerEnPantallaX, this.centroPlayerEnPantallaY, this.cursorX, this.cursorY)}

    getCooldownTime(){
        return this.enfriamientoTime;
    }

    getCurrentCooldown(){
        return this.enfriamientoTime - this.elapsedTime;
    }
}