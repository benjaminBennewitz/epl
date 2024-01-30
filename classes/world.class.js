class World{
    canvas;
    ctx;
    control;
    camera_x = 0;

    character = new Character();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    coins = new Coin();
    bottles = new Bottle();
    projectile = [];
    level = level_1;

    constructor(canvas, control){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.control = control;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkProjectiles();
        }, 200);
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.collisionDetection(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.life);
                console.log('Kollision erkannt mit', enemy, 'Leben:', this.character.life);
            }
        });
    }

    checkProjectiles(){
       if(this.control.D){
            let projectile = new Projectiles(this.character.x + 100, this.character.y + 100);
            this.projectile.push(projectile);
       }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x,0);
        this.objectsLoop(this.level.backgroundObjects);
        this.objectsLoop(this.level.clouds);

        this.ctx.translate(-this.camera_x,0);
        this.addToWorld(this.statusBar);
        this.addToWorld(this.coinBar);
        this.addToWorld(this.bottleBar);
        this.ctx.translate(this.camera_x,0);

        this.addToWorld(this.character);
        this.objectsLoop(this.projectile);
        this.objectsLoop(this.level.enemies);
        this.objectsLoop(this.level.coins);
        this.objectsLoop(this.level.bottles);
        
        this.ctx.translate(-this.camera_x,0);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    objectsLoop(objects){
        objects.forEach((object) => {
            this.addToWorld(object);
        });
    }

    addToWorld(object){
        if(object.turnArround){
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.collisionBorder(this.ctx);

        if(object.turnArround){
            this.flipImageBack(object);
        }
    }

    flipImage(object){
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1,1);
        object.x = object.x * -1;
    }

    flipImageBack(object){
        object.x = object.x * -1;
        this.ctx.restore();
    }
}