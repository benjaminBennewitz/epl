class MovingObjects {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;
    images = {};
    currentImage = 0;
    speed = 0.15;

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
        console.log('moving right');
    }

    moveLeft(){
        setInterval (() => {
            this.x -= this.speed;
        },1000 / 60);
    }
}