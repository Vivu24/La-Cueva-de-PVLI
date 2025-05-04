import Ball from './Ball.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, number, { key: 'player' });
        this.number = number;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.playerOffsetRight = { x: 5, y: 5 };
        this.playerOffsetLeft = { x: 0, y: 0 };
        this.isDead = false;
        this.inputEnable = true;
        this.lastShotTime = 0;  // Tiempo del último disparo
        this.shootCooldown = 1000;  // Cooldown en milisegundos
        this.shootingLevel = 1;
        this.isBalling = false;
        this.isBalling2 = false;
        this.carryingBall = null;
        this.canShoot = false;

        this.stunned = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        this.body.setSize(32, 32) //Tamaño del collider
        

        if (this.number == 1) {
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                // left: Phaser.Input.Keyboard.KeyCodes.A,
                // right: Phaser.Input.Keyboard.KeyCodes.D,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE
            });
            this.body.setOffset(this.playerOffsetRight.x, this.playerOffsetRight.y) //mover el collider con respecto al sprite
        } else {
            this.cursors = scene.input.keyboard.addKeys({
               // up: Phaser.Input.Keyboard.KeyCodes.UP,
                //down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER
            });
            this.body.setOffset(this.playerOffsetLeft.x, this.playerOffsetLeft.y) //mover el collider con respecto al sprite
        }

        // Velocidad del jugador
        this.speed = 40;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.move(t);
        
    }

    move(t) {

        if (this.stunned) {
            this.setVelocityX(0);
            this.setAnimation();
            return;
        }
        
        if (this.inputEnable){
            // Establecer la velocidad basada en las teclas presionadas
            this.setVelocity(0);
    
            if (this.cursors.up.isDown && this.y > 190) {
                this.setVelocityY(-this.speed);
            } else if (this.cursors.down.isDown && this.y < 420) {
                this.setVelocityY(this.speed);
            }
    
            // if (this.cursors.left.isDown && this.x > 100) {
            //     this.moveHorizontal(-this.speed);
            // } else if (this.cursors.right.isDown && this.x < 300) {
            //     this.moveHorizontal(this.speed);
            // }
    
            // Disparar solo si ha pasado el tiempo de cooldown
            if (this.cursors.shoot.isDown && t - this.lastShotTime > this.shootCooldown ) {
              // this.shoot(t, this.shootingLevel)

             
                if (this.canShoot) {
                    this.shoot();
                    //this.canShoot = false;
                } else {
                    console.log("1");
                    this.pickBall();
                    
                }
                this.lastShotTime = t;
        
            //    if(this.number == 1 && this.isBalling1){
            //     this.isBalling1 = false;
            //     this.scene.auxBall1.destroy();
            //     this.shoot();
            //   }
            //   else if(this.number == 2 && this.isBalling2){
            //     this.isBalling2 = false;
            //     this.scene.auxBall2.destroy();
            //     this.shoot();
            //   }
              
              
            }
    
            // Ajusta la animación de acuerdo con la velocidad
            this.setAnimation();
            if(this.isBalling1) {
                this.scene.updateAuxBall(1)
            }
            else if(this.isBalling2){
                this.scene.updateAuxBall(2)
                
            }
        }
        else {
            this.setVelocityX(0);
            this.canShoot = false;
        }
    }


    stun() {
        this.stunned = true;
        this.inputEnable = false;
        this.scene.time.delayedCall(2000, () => {
            this.stunned = false;
            this.inputEnable = true;
        })
    }
    
  


    // shoot(t, level) {
    //     if (level == 1) {
    //         this.createBullet(t, 0);
    //     } else if (level == 2) {
    //         this.createBullet(t, -10);
    //         this.createBullet(t, 10);
    //     } else {
    //         this.createBullet(t, -30);
    //         this.createBullet(t, -10);
    //         this.createBullet(t, 10);
    //         this.createBullet(t, 30);
    //     }
    // }

  
    desactivateInput(){
        this.inputEnable = false;
    }

    moveHorizontal(velocity) {
        this.setVelocityX(velocity);
    }

    pickBall() {
      
        console.log("pickball");
        this.scene.ballsPool.forEach(ball => {
            ball.checkCollisionWithPlayer(this.scene, this);
        });
     
    }



    shoot() {
        // if(this.number == 1){
        //     const ball = new Ball(this.scene, this.x, this.y);
        //     this.scene.ballsPool2.push(ball);
        //     ball.setVelocityY(-150);
        //     //this.lastShotTime = t;  // Actualiza el tiempo del último disparo
        // }
        // else if(this.number == 2) {
        //     const ball = new Ball(this.scene, this.x, this.y);
        //     this.scene.ballsPool1.push(ball);
        //     ball.setVelocityY(150);

        // }

       // if (this.carryingBall) {
            if (this.number == 1) {
                const ball = new Ball(this.scene, this.x + 30, this.y);
                this.scene.ballsPool.push(ball);
                ball.move(100, 0);
                ball.isShooted = true;
            } else if (this.number == 2) {
                const ball = new Ball(this.scene, this.x + 30, this.y);
                this.scene.ballsPool.push(ball);
                ball.move(100, 0);
                ball.isShooted = true;
            }

            this.canShoot = false;

            if (this.number == 1) {
                this.isBalling1 = false;
                this.scene.auxBall1.destroy();
            } else {
                this.isBalling2 = false;
                this.scene.auxBall2.destroy();
            }
       // }
    }

    setAnimation() {

        if (this.number == 1){

            if(!this.stunned){
                if (this.body.velocity.x < 0) {
                    if(!this.isBalling1)
                    {
                        this.anims.play('penguinMove', true);
                    }
                    else
                    {
                        this.anims.play('penguinMoveBall', true);
                    }
                } 
                else if (this.body.velocity.x > 0){
                    if(!this.isBalling1)
                    {
                        this.anims.play('penguinMove', true);
                    }
                    else
                    {
                        this.anims.play('penguinMoveBall', true);
                    }
                }
                else {
                    if(!this.isBalling1)
                    {
                        this.anims.play('penguinIdle', true);
                    }
                    else
                    {
                        this.anims.play('penguinIdleBall', true);
                    }
                    
                }
            }
            else {
                this.anims.play('penguinStun', true);
            }
            

        }

        else {
            if(!this.stunned){
                if (this.body.velocity.x < 0) {
               
                    if(!this.isBalling2)
                    {
                        this.anims.play('ratMove', true);
                    }
                    else
                    {
                        this.anims.play('ratMoveBall', true);
                    }
                } 
                else if (this.body.velocity.x > 0){
                    if(!this.isBalling2)
                    {
                        this.anims.play('ratMove', true);
                    }
                    else
                    {
                        this.anims.play('ratMoveBall', true);
                    }
                }
                else {
                    
                    if(!this.isBalling2)
                    {
                        this.anims.play('ratIdle', true);
                    }
                    else
                    {
                        this.anims.play('ratIdleBall', true);
                    }
                }
            }
            else {
                this.anims.play('ratStun', true);
            }
            
        }
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    upgradeShootingLevel(){
        this.shootingLevel++;
    }
}
