

export default class HealthBar extends Phaser.GameObjects.Graphics{

constructor( scene, x, y, player, width, heigth){

    super(scene);

    this.x = x;
    this.y = y;

    this.w = width;
    this.h = heigth;

    this.Heart = this.scene.add.sprite(24, 48, 'heart').setScrollFactor(0);

    this.Heart.setDepth(5);

    this.player = player;

    this.value = this.player.getLife();

    this.maxValue = this.value;

    this.draw();

    scene.add.existing(this);

    this.scene.anims.create({
        key: 'heartBeat',
        frames: this.scene.anims.generateFrameNumbers('heart', {start:0, end:7}),
        frameRate: 5,
        repeat: -1

    });

}

//Dibuja la barra de vida
draw(){
    //Primero se borra lo anterior
    this.clear();

    //Se pone un borde negro que sirva como margen algo más grande que la barra normal
    this.fillStyle(0x000000);

    this.fillRect(this.x - 2, this.y - 2, this.w + 4, this.h + 4);

    //se pone una barra blanca por encima que sirve para marcar la vida perdida
    this.fillStyle(0xFFFFFF);

    this.fillRect(this.x, this.y, this.w, this.h);

    //Se pone una barra roja encima de la blanca con el mismo tamaño
    this.fillStyle(0xff0000);

    //Su ancho dependera de su valor actual respecto al maximo, siguiendo una regla de tres, de esta froma si disminuye la vida se deja ver
    //la barra blanca
    let currentHealth = (this.value * this.w) / this.maxValue;

    this.fillRect(this.x, this.y, currentHealth, this.h);
}

preUpdate(t, dt){

    //accede a la vida del jugador en todo momento para actualizarla
    this.value = this.player.getLife();

    this.draw();

    this.Heart.preUpdate(t, dt);

    this.Heart.play('heartBeat', true);

}



}