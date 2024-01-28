class MovingObjects extends DrawableObject{
    speed = 0.15;
    turnArround = false;
    speedY = 0;
    acceleration = 1.5;
    jumpAnimation = false;
    life = 100;
    hitCount = 0;

    collisionDetection(object){
        return this.x + this.width > object.x &&
               this.y + this.height > object.y &&
               this.x < object.x &&
               this.y < object.y + object.height;
    }

    hit(){
        this.life -= 1;
        if(this.life < 0){
            this.life = 0;
        }else{
            this.hitCount =new Date().getTime();
        }
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

    checkAudio(soundOn) {
        const audioIconSwitch = document.getElementById('audioIconSwitch');
    
        switch (true) {
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')):
                this.pauseSounds();
                break;

            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')):
                this.soundOn;
                break;
    
            default:
                break;
        }
    }
    
    pauseSounds() {
        this.walking_sound.pause();
        this.hurt_sound.pause();
        this.sleeping_sound.pause();
    }
}