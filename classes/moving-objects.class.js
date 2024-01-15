class MovingObjects {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;

    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){ 
        console.log('moving right');
    }

    moveLeft(){ 
        console.log('moving left');
    }
}