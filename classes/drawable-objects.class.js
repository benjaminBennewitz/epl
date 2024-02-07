/**
 * Represents a drawable object.
 * @class
 */
class DrawableObject {
    x = 120;
    y = 300;
    height = 150;
    width = 100;

    img;
    images = {};
    currentImage = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path of the image to load.
     */
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads images from an array of paths and stores them in the 'images' property.
     * @param {string[]} array - An array of image paths.
     */
    loadImages(array){
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    }

    /**
     * Draws the object on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}