/**
 * Represents a moving object in the game.
 * @class
 * @extends DrawableObject
 */
class MovingObjects extends DrawableObject{
    speed = 0.15;
    turnArround = false;
    speedY = 0;
    acceleration = 1.5;
    life = 1000;
    hitCount = 0;
    collectedCoins = 0;
    collectedBottles = 0;

    /**
     * Checks if the current object collides with another object.
     * @param {Object} object - The object to check collision with.
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
    collisionDetection(object) {
        return this.x + this.width - this.offset.right > object.x + object.offset.left &&
            this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
            this.x + this.offset.left < object.x + object.width - object.offset.right &&
            this.y + this.offset.top < object.y + object.height - object.offset.bottom;
    }

    /**
     * Reduces the life of the object by 10. If the life becomes less than 0, it sets the life to 0. 
     * Otherwise, it updates the hitCount with the current timestamp.
     */
    hit(){
        this.life -= 10;
        if(this.life < 0){
            this.life = 0;
        }else{
            this.hitCount =new Date().getTime();
        }
    }

    /**
     * special hit points from boss on character
     */
     bossHit(){
        this.life -= 175;
        if(this.life < 0){
            this.life = 0;
        }else{
            this.hitCount =new Date().getTime();
        }
    }

    /**
     * Increases the number of collected coins by 10.
     */
    collectCoin(){
        this.collectedCoins += 10;
    }

    /**
     * Increases the number of collected bottles by 1.
     */
    collectBottle(){
        this.collectedBottles += 10;
    }

    /**
     * Increases the number of collected bottles by 1.
     */
    removeBottle(){
        this.collectedBottles -= 10;
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt(){
        let checkHits = new Date().getTime() - this.hitCount;
        checkHits = checkHits / 300;
        return checkHits < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead(){
        gameLost();
        return this.life == 0;
    }

    /**
     * Checks if the object is defeated.
     * @returns {boolean} True if the object is defeated, false otherwise.
     */
    isDefeated(){
        gameWon();
        return this.life == 0;
    }

    /**
     * Moves the object to the right.
     */
     moveRight(){ 
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Plays the animation by updating the current image of the object.
     * @param {string[]} images - An array of image paths.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;  
    }

    /**
     * Applies gravity to the object by updating its vertical position and speed.
     * @returns {void}
     */
    gravity(){
        setInterval(() => {
            if(this.isJumpTrue() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000 / 40);
    }

    /**
     * Checks if the object is currently in a jumping state.
     * @returns {boolean} True if the object is jumping, false otherwise.
     */
    isJumpTrue(){
        if(this instanceof Projectiles){
            return true;
        } else {
            return this.y <= 120;
        }
    }

    /**
     * Makes the object jump by setting its speedY to 30.
     */
    jump(){
        this.speedY = 30;
    }
}