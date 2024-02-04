class DrawableObject {
    x = 120;
    y = 300;
    height = 150;
    width = 100;

    img;
    images = {};
    currentImage = 0;

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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    collisionBorder(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss || this instanceof MiniChicken ){
            const topOffset = (this instanceof Character) ? 135 : 0;

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y + topOffset, this.width, this.height - topOffset);
            ctx.stroke();
        }
    }
}