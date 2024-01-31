class MovingObjects extends DrawableObject{
    speed = 0.15;
    turnArround = false;
    speedY = 0;
    acceleration = 1.5;
    jumpAnimation = false;
    life = 100;
    hitCount = 0;
    collectedCoins = 0;
    collectedBottles = 0;

    collisionDetection(object){
        return this.x + this.width > object.x &&
               this.y + this.height > object.y &&
               this.x < object.x &&
               this.y < object.y + object.height -150;
    }

    hit(){
        this.life -= 1;
        if(this.life < 0){
            this.life = 0;
        }else{
            this.hitCount =new Date().getTime();
        }
    }

    collectCoin(){
        this.collectedCoins += 10;
    }

    collectBottle(){
        this.collectedBottles += 10;
    }

    isHurt(){
        let checkHits = new Date().getTime() - this.hitCount;
        checkHits = checkHits / 1000;
        return checkHits < 1;
    }

    isDead(){
        return this.life == 0;
    }

    moveRight(){ 
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;  
    }

    gravity(){
        setInterval(() => {
            if(this.isJumpTrue() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000 / 60);
    }

    isJumpTrue(){
        if(this instanceof Projectiles){
            return true;
        } else {
            return this.y < 120;
        }
    }

    jump(){
        this.speedY = 30;
    }
}