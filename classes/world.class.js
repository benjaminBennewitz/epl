/**
 * Represents the game world.
 * @class
 */
class World {
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
    collectedBottles = [];
    projectile = [];
    throwedBottle = new Projectiles();
    level = level_1;

    /**
     * Creates a new instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Control} control - The control object for managing user input.
     */
    constructor(canvas, control) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.control = control;
        this.draw();
        this.setWorld();
        this.run();
        this.checkLevelEnd();
    }

    checkLevelEnd(){
        setInterval(() => {
            this.level.level_end_x = 2200;
        }, 200);
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop and performs collision checks and updates at regular intervals.
     * @returns {void}
     */
    run() {
        setInterval(() => {
            this.checkCollisionCharacter();
            this.checkCollisionCharacterBoss();
            this.checkCollisionBossBottle();
            this.checkProjectileHitBoss();
            this.checkCollisionChickenBottle();
            this.checkProjectiles();
            this.checkGetCoins();
            this.checkGetBottles();
        }, 200);

        setInterval(() => {
            this.activateEnboss();
        }, 2000);
    }

    /**
     * Activates the enboss feature.
     */
    activateEnboss() {
        if (this.character.x > 1600) {
            this.level.boss[0].animate();
            this.bossBar.x = 510;
        }
    }

    /**
     * Checks for collision between the character and enemies in the level.
     */
    checkCollisionCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.collisionDetection(enemy)) {
                if (this.character.isJumpTrue() && !this.character.isHurt()) {
                    enemy.chickenDeadImg();
                    setTimeout(() => {
                        enemy.x = -1000;
                        enemy.y = -1000;
                    }, 200);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.life);
                }
            }
        });
    }

    /**
     * Checks for collision between the character and the boss enemies.
     */
    checkCollisionCharacterBoss() {
        this.level.boss.forEach((enemy) => {
            if (this.character.collisionDetection(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.life);
                this.character.x = this.character.x - 30;
            }
        });
    }

    /**
     * Checks for collision between the boss and the projectile bottles.
     */
    checkCollisionBossBottle() {
        this.projectile.forEach((bottle) => {
            if (this.level.boss[0].collisionDetection(bottle)) {
                this.level.boss[0].hit();
                bottle.bottleBreak();
                this.bossBar.setPercentage(this.level.boss[0].life);
                bottle.x = -1000;
                bottle.y = -1000;
            }
        });
    }

    /**
     * Checks for collision between the chickens and the projectile bottles.
     */
    checkCollisionChickenBottle() {
        this.projectile.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.life > 0) {
                    if (enemy.collisionDetection(bottle)) {
                        bottle.bottleBreak();
                        enemy.chickenDeadImg();
                        bottle.x = -1000;
                        bottle.y = -1000;
                        setInterval(() => {
                            enemy.x = -1000;
                            enemy.y = -1000;
                        },100);
                    }
                }
            });
        });
    }

    /**
     * Checks for collision between the character and coins, and collects the coins if there is a collision.
     */
    checkGetCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.collisionDetection(coin)) {
                this.character.collectCoin();
                this.coinBar.setCollectedCoins(this.character.collectedCoins);
                this.checkItemsSounds(this.coin_sound);
                coin.x = -1000;
                coin.y = -1000;
            }
        });
    }

    /**
     * Checks for collision between the character and bottles, and collects the bottles if there is a collision.
     */
    checkGetBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.collisionDetection(bottle)) {
                this.character.collectBottle();
                this.collectedBottles.push(bottle);
                this.bottleBar.setCollectedBottles(this.character.collectedBottles);
                this.checkItemsSounds(this.bottle_sound);
                bottle.x = -1000;
                bottle.y = -1000;
            }
        });
    }

    /**
     * Checks if the player is throwing projectiles and performs the necessary actions.
     */
    checkProjectiles() {
        if (this.control.D) {
            let projectile = new Projectiles(this.character.x + 50, this.character.y + 100);

            if (this.projectile.length < this.character.collectedBottles && this.character.collectedBottles > 0){
                this.projectile.push(projectile);
                this.character.collectedBottles -= 10;
                this.bottleBar.setCollectedBottles(this.character.collectedBottles);
                this.checkItemsSounds(this.bottle_throw_sound);
                this.throwedBottle.throwBottleAnimations();
            }
        }
    }

    /**
     * Checks if a projectile hits the boss and triggers the throw bottle animations.
     */
    checkProjectileHitBoss() {
        this.projectile.forEach((bottle) => {
            if (this.level.boss[0].collisionDetection(bottle)) {
                this.throwedBottle.bottleBreak();
            }
        });
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.objectsLoop(this.level.backgroundObjects);
        this.objectsLoop(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);

        this.addToWorld(this.character);
        this.addObjects();

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds status bars to the world.
     */
    addStatusBars() {
        this.addToWorld(this.statusBar);
        this.addToWorld(this.bossBar);
        this.addToWorld(this.coinBar);
        this.addToWorld(this.bottleBar);
    }

    /**
     * Adds objects to the world.
     */
    addObjects() {
        this.objectsLoop(this.level.enemies);
        this.objectsLoop(this.level.boss);
        this.objectsLoop(this.projectile);
        this.objectsLoop(this.level.coins);
        this.objectsLoop(this.level.bottles);
    }

    /**
     * Loops through an array of objects and adds each object to the world.
     * @param {Array} objects - The array of objects to loop through.
     */
    objectsLoop(objects) {
        objects.forEach((object) => {
            this.addToWorld(object);
        });
    }

    /**
     * Adds an object to the world.
     * @param {Object} object - The object to be added.
     */
    addToWorld(object) {
        if (object.turnArround) {
            this.flipImage(object);
        }
        object.draw(this.ctx);
        //object.collisionBorder(this.ctx);

        if (object.turnArround) {
            this.flipImageBack(object);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {Object} object - The object to flip.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Flips the image back horizontally by negating the x-coordinate of the object.
     * @param {Object} object - The object to flip the image back for.
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * Mutes the sounds of items in the world.
     */
    muteItemSounds() {
        this.coin_sound.muted = true;
        this.bottle_sound.muted = true;
        this.bottle_throw_sound.muted = true;
    }

    /**
     * Unmutes the sounds of the items.
     */
    unmuteItemSounds() {
        this.coin_sound.muted = false;
        this.bottle_sound.muted = false;
        this.bottle_throw_sound.muted = false;
    }

    /**
     * Checks the state of the audio icon switch and performs corresponding actions.
     * @param {HTMLAudioElement} getSound - The audio element to be played when the audio icon switch is on.
     */
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