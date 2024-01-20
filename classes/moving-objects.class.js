class MovingObjects {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;
    images = {};
    currentImage = 0;
    speed = 0.15;
    turnArround = false;
    speedY = 0;
    acceleration = 1.5;

    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array){
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    }

    moveRight(){ 
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;  
    }

    gravity(){
        setInterval(() => {
            if(this.isJumpTrue() || this.speedY > 0){
                this.speedY -= this.acceleration;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000 / 60);
    }

    isJumpTrue(){
        return this.y < 120;
    }

    jump(){
        this.speedY = 30;
    }
}