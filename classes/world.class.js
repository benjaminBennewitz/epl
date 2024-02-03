class World{
    canvas;
    ctx;
    control;
    camera_x = 0;

    character = new Character();
    statusBar = new StatusBar();
    bossBar = new StatusBossBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    bottle_throw_sound = new Audio('audio/throw.mp3');
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
            this.checkCollisionCharacter();
            this.checkProjectiles();
            this.checkGetCoins();
            this.checkGetBottles();
        }, 200);

        setInterval(() => {
            this.activateEnboss();
        }, 4000);
    }

    activateEnboss(){
        if(this.character.x > 1600){
            this.level.enemies[0].animate();
        }
    }

    checkCollisionCharacter(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.collisionDetection(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.life);
            }
        });
    }

    checkGetCoins(){
        this.level.coins.forEach((coin) => {
            if(this.character.collisionDetection(coin)){
                this.character.collectCoin();
                this.coinBar.setCollectedCoins(this.character.collectedCoins);
                this.checkItemsSounds(this.coin_sound);
                coin.x = -1000;
                coin.y = -1000;
            }
        });
    }

    checkGetBottles(){
        this.level.bottles.forEach((bottle) => {
            if(this.character.collisionDetection(bottle)){
                this.character.collectBottle();
                this.bottleBar.setCollectedBottles(this.character.collectedBottles);
                this.checkItemsSounds(this.bottle_sound);
                bottle.x = -1000;
                bottle.y = -1000;
            }
        });
    }

    checkProjectiles(){
       if(this.control.D){
            let projectile = new Projectiles(this.character.x + 100, this.character.y + 100);
            this.projectile.push(projectile);
            this.checkItemsSounds(this.bottle_throw_sound);
       }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x,0);
        this.objectsLoop(this.level.backgroundObjects);
        this.objectsLoop(this.level.clouds);

        this.ctx.translate(-this.camera_x,0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x,0);

        this.addToWorld(this.character);
        this.addObjects();
        
        this.ctx.translate(-this.camera_x,0);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addStatusBars(){
        this.addToWorld(this.statusBar);
        this.addToWorld(this.bossBar);
        this.addToWorld(this.coinBar);
        this.addToWorld(this.bottleBar);
    }

    addObjects(){
        this.objectsLoop(this.projectile);
        this.objectsLoop(this.level.enemies);
        this.objectsLoop(this.level.coins);
        this.objectsLoop(this.level.bottles);
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

    muteItemSounds(){
        this.coin_sound.muted = true;
        this.bottle_sound.muted = true;
        this.bottle_throw_sound.muted = true;
    }
    
    unmuteItemSounds(){
        this.coin_sound.muted = false;
        this.bottle_sound.muted = false;
        this.bottle_throw_sound.muted = false;
    }

    checkItemsSounds(getSound) {
        const audioIconSwitch = document.getElementById('audioIconSwitch');
    
        switch (true) {
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')):
                this.muteItemSounds();
                break;
    
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')):
                this.unmuteItemSounds()
                getSound.play();
                break;
    
            default:
                break;
        }
    }
}